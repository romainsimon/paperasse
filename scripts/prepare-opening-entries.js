#!/usr/bin/env node
/**
 * Prépare les à-nouveaux (bilan N-1) + affectation du résultat (AG)
 * et consolide le journal BQ de l'exercice en cours.
 *
 * Prérequis :
 *   - data/bilan-closing.json ou data/bilan-closing-YYYY.json (export Dougs / liasse)
 *   - data/journal-entries.json (écritures BQ, ex. npm run journal:qonto)
 *   - company.json : fiscal_affectation_* si affectation AG déjà décidée
 */

const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('../integrations/core/load-env');
const { loadCompany } = require('../integrations/core/provider');

const JOURNAL_PATH = path.join(PROJECT_ROOT, 'data', 'journal-entries.json');

function resolveBilanPath() {
  const candidates = [
    path.join(PROJECT_ROOT, 'data', 'bilan-closing.json'),
    path.join(PROJECT_ROOT, 'data', 'bilan-closing-2025.json'),
  ];
  const hit = candidates.find((p) => fs.existsSync(p));
  if (hit) {
    return hit;
  }
  const dataDir = path.join(PROJECT_ROOT, 'data');
  if (fs.existsSync(dataDir)) {
    const extra = fs
      .readdirSync(dataDir)
      .filter((f) => /^bilan-closing-\d{4}\.json$/.test(f))
      .sort()
      .reverse()
      .map((f) => path.join(dataDir, f));
    if (extra[0]) {
      return extra[0];
    }
  }
  throw new Error(
    'Bilan de clôture introuvable (data/bilan-closing.json ou bilan-closing-YYYY.json).',
  );
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function buildOpeningEntry(bilan, company, bilanFile) {
  const fiscalStart = company.fiscal_year.start;
  const lines = bilan.accounts.map((row) => ({
    account: row.account,
    debit: round2(row.debit || 0),
    credit: round2(row.credit || 0),
    account_name: row.label,
  }));

  const totalDebit = lines.reduce((s, l) => s + l.debit, 0);
  const totalCredit = lines.reduce((s, l) => s + l.credit, 0);

  if (Math.abs(totalDebit - totalCredit) > 0.02) {
    throw new Error(
      `Bilan déséquilibré : D=${totalDebit.toFixed(2)} C=${totalCredit.toFixed(2)}`,
    );
  }

  return {
    num: 1,
    date: fiscalStart,
    journal: 'AN',
    ref: `AN-${fiscalStart.slice(0, 4)}-001`,
    label: `A-nouveaux - Bilan au ${bilan.as_of}`,
    source: path.basename(bilanFile),
    lines,
  };
}

function buildAffectationEntry(aff) {
  const result = round2(aff.result_amount);
  const dividends = round2(aff.dividends);
  const reserve = round2(aff.legal_reserve_dotation || 0);
  const report = round2(aff.retained_report);

  if (Math.abs(result - (dividends + reserve + report)) > 0.02) {
    throw new Error('Affectation incohérente : résultat ≠ dividendes + réserve + report');
  }

  const lines = [
    {
      account: '129',
      debit: result,
      credit: 0,
      account_name: 'Résultat exercice (à affecter)',
    },
  ];

  if (reserve > 0) {
    lines.push({
      account: '1061',
      debit: 0,
      credit: reserve,
      account_name: 'Dotation réserve légale',
    });
  }

  lines.push(
    {
      account: '457',
      debit: 0,
      credit: dividends,
      account_name: 'Dividendes à payer',
    },
    {
      account: '120',
      debit: 0,
      credit: report,
      account_name: 'Report à nouveau',
    },
  );

  const totalDebit = lines.reduce((s, l) => s + l.debit, 0);
  const totalCredit = lines.reduce((s, l) => s + l.credit, 0);
  if (Math.abs(totalDebit - totalCredit) > 0.02) {
    throw new Error(`Affectation déséquilibrée : D=${totalDebit} C=${totalCredit}`);
  }

  return {
    num: 2,
    date: aff.ag_date,
    journal: 'OD',
    ref: 'AFF-2025-001',
    label: `Affectation du résultat — dividendes ${dividends.toLocaleString('fr-FR')} EUR`,
    source: 'ag-affectation',
    lines,
  };
}

function loadBqEntries(fiscalStart) {
  if (!fs.existsSync(JOURNAL_PATH)) {
    return [];
  }
  const journal = JSON.parse(fs.readFileSync(JOURNAL_PATH, 'utf-8'));
  return journal
    .filter((e) => e.date >= fiscalStart && e.journal === 'BQ')
    .sort((a, b) => a.date.localeCompare(b.date) || a.num - b.num);
}

function balance512(entries, bankAccount) {
  let b = 0;
  for (const e of entries) {
    for (const l of e.lines || []) {
      if (l.account === bankAccount || String(l.account).startsWith('512')) {
        b += (l.debit || 0) - (l.credit || 0);
      }
    }
  }
  return round2(b);
}

function saveCompany(company, bilan, aff, fiscalStart) {
  const companyPath =
    [path.join(process.cwd(), 'company.json'), path.join(PROJECT_ROOT, 'company.json')].find((p) =>
      fs.existsSync(p),
    ) || path.join(PROJECT_ROOT, 'company.json');

  const bankRow = bilan.accounts.find((a) => String(a.account).startsWith('512'));
  company.opening_balances = {
    ...(company.opening_balances || {}),
    as_of: fiscalStart,
    computed_at: new Date().toISOString(),
    source: bilan.source,
    bilan_date: bilan.as_of,
    bank_opening: bankRow?.debit || company.opening_balances?.bank_opening,
    result_2025_pending: aff.result_amount,
    dividends_ag_2025: aff.dividends,
    report_after_affectation: aff.retained_report,
  };
  company.fiscal_affectation_2025 = aff;

  fs.writeFileSync(companyPath, JSON.stringify(company, null, 2) + '\n');
}

function main() {
  const company = loadCompany();
  if (!company) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }

  const bilanPath = resolveBilanPath();
  const bilan = JSON.parse(fs.readFileSync(bilanPath, 'utf-8'));
  const fiscalStart = company.fiscal_year?.start;
  if (!fiscalStart) {
    console.error('company.json : fiscal_year.start manquant.');
    process.exit(1);
  }

  const bankAccount =
    (company.banks || []).find((b) => b.provider === 'qonto' || b.id === 'qonto')?.account ||
    '5121';

  const resultLine = bilan.accounts.find((a) => a.account === '129');
  const defaultResult = resultLine?.credit || company.opening_balances?.result_2025_pending;

  const aff = company.fiscal_affectation_2025;
  if (!aff?.ag_date || aff.dividends == null || aff.retained_report == null) {
    console.error(
      'company.json : renseigner fiscal_affectation_2025 (ag_date, result_amount, dividends, retained_report).',
    );
    process.exit(1);
  }
  if (aff.result_amount == null && defaultResult != null) {
    aff.result_amount = defaultResult;
  }
  if (aff.result_amount == null) {
    console.error('Montant de résultat à affecter introuvable (bilan 129 ou company.json).');
    process.exit(1);
  }

  const anEntry = buildOpeningEntry(bilan, company, bilanPath);
  const affectationEntry = buildAffectationEntry(aff);
  const bqEntries = loadBqEntries(fiscalStart);

  const merged = [
    anEntry,
    affectationEntry,
    ...bqEntries.map((e, i) => ({ ...e, num: i + 3 })),
  ];

  fs.writeFileSync(JOURNAL_PATH, JSON.stringify(merged, null, 2) + '\n');
  saveCompany(company, bilan, aff, fiscalStart);

  const b512 = balance512(merged, bankAccount);

  console.log('Journal mis à jour (AN + affectation AG + banque)');
  console.log('==============================================');
  console.log(`Bilan : ${path.relative(PROJECT_ROOT, bilanPath)} (${bilan.as_of})`);
  console.log(`AN au ${fiscalStart}`);
  console.log(`Affectation AG au ${aff.ag_date} :`);
  console.log(`  Résultat : ${aff.result_amount.toLocaleString('fr-FR')} EUR`);
  console.log(`  Dividendes (457) : ${aff.dividends.toLocaleString('fr-FR')} EUR`);
  console.log(`  Report à nouveau (120) : ${aff.retained_report.toLocaleString('fr-FR')} EUR`);
  console.log(`Écritures BQ ${fiscalStart.slice(0, 4)} : ${bqEntries.length}`);
  console.log(`Journal total : ${merged.length} écritures`);
  console.log(`Solde ${bankAccount} : ${b512.toLocaleString('fr-FR')} EUR`);
  console.log('\nSuite : npm run fec  |  npm run reminders:preview');
}

main();
