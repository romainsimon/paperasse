#!/usr/bin/env node
/**
 * Catégorise les transactions Qonto (PCG) et génère le journal banque (BQ).
 *
 * Usage:
 *   node scripts/qonto-to-journal.js
 *   node scripts/qonto-to-journal.js --input data/transactions/qonto-xxx.json
 *   node scripts/qonto-to-journal.js --dry-run
 *
 * Règles libellés optionnelles : config/qonto-label-rules.local.json (voir .example)
 */

const fs = require('fs');
const path = require('path');
const { loadEnv, PROJECT_ROOT } = require('../integrations/core/load-env');
const { loadCompany } = require('../integrations/core/provider');

loadEnv();

const TVA_RATE_DEFAULT = 0.2;

/** @type {Record<string, { account: string, label: string, vat?: 'full'|'half'|'none' }>} */
const QONTO_CATEGORY_MAP = {
  restaurant_and_bar: { account: '6257', label: 'Repas et réceptions', vat: 'half' },
  food_and_grocery: { account: '6257', label: 'Repas / courses', vat: 'half' },
  gas_station: { account: '6061', label: 'Carburant', vat: 'full' },
  transport: { account: '6251', label: 'Déplacements', vat: 'full' },
  it_and_electronics: { account: '6063', label: 'Fournitures informatiques', vat: 'full' },
  hardware_and_equipment: { account: '6063', label: 'Matériel', vat: 'full' },
  online_service: { account: '6222', label: 'Abonnements logiciels', vat: 'full' },
  marketing: { account: '623', label: 'Publicité', vat: 'full' },
  other_service: { account: '6226', label: 'Prestations externes', vat: 'full' },
  fees: { account: '627', label: 'Frais bancaires', vat: 'none' },
  tax: { account: '444', label: 'Impôts et taxes', vat: 'none' },
  other_expense: { account: '6180', label: 'Autres charges externes', vat: 'full' },
  other_income: { account: '706', label: 'Prestations de services', vat: 'full' },
  salary: { account: '641', label: 'Rémunérations', vat: 'none' },
};

/** Règles génériques (aucun nom de client / société). */
const LABEL_RULES = [
  { pattern: /dividend/i, account: '457', label: 'Dividendes', vat: 'none' },
  { pattern: /^DGFIP$/i, account: '444', label: 'DGFIP', vat: 'none' },
  { pattern: /URSSAF/i, account: '431', label: 'URSSAF', vat: 'none' },
  { pattern: /Qonto/i, account: '627', label: 'Frais Qonto', vat: 'none' },
  {
    pattern: /GITHUB|GITLAB|AWS|HETZNER|OVH|VERCEL|OPENAI|ANTHROPIC|CURSOR/i,
    account: '6222',
    label: 'Outils / SaaS',
    vat: 'full',
  },
  { pattern: /GOOGLE|META|LINKEDIN|FACEBOOK/i, account: '623', label: 'Publicité', vat: 'full' },
];

function loadOptionalLabelRules() {
  const localPath = path.join(PROJECT_ROOT, 'config', 'qonto-label-rules.local.json');
  if (!fs.existsSync(localPath)) {
    return [];
  }
  const raw = JSON.parse(fs.readFileSync(localPath, 'utf-8'));
  const rules = raw.label_rules || raw.rules || [];
  return rules.map((r) => ({
    pattern: new RegExp(r.pattern, r.flags || 'i'),
    account: r.account,
    label: r.label,
    vat: r.vat || 'full',
  }));
}

function findQontoTransactionFiles(explicitInput) {
  if (explicitInput) {
    return [path.resolve(explicitInput)];
  }
  const dir = path.join(PROJECT_ROOT, 'data', 'transactions');
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((f) => f.startsWith('qonto-') && f.endsWith('.json'))
    .sort()
    .map((f) => path.join(dir, f));
}

function parseArgs(argv) {
  const options = { inputs: [], dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--input' && argv[i + 1]) {
      options.inputs.push(path.resolve(argv[++i]));
    } else if (argv[i] === '--dry-run') {
      options.dryRun = true;
    }
  }
  return options;
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function splitTtc(ttc, rate, mode) {
  const ttcR = round2(Math.abs(ttc));
  if (mode === 'none' || ttcR === 0) {
    return { ht: ttcR, tva: 0 };
  }
  let ht = round2(ttcR / (1 + rate));
  let tva = round2(ttcR - ht);
  if (mode === 'half') {
    tva = round2(tva * 0.5);
    ht = round2(ttcR - tva);
  }
  return { ht, tva };
}

function resolveMapping(tx, extraRules) {
  const label = tx.label || '';
  const ref = tx.reference || tx.raw?.reference || tx.raw?.note || '';
  const allRules = [...extraRules, ...LABEL_RULES];

  for (const rule of allRules) {
    if (rule.pattern.test(label) || rule.pattern.test(ref)) {
      return {
        account: rule.account,
        label: rule.label,
        vat: rule.vat || 'none',
        rule: rule.pattern.toString(),
      };
    }
  }

  const cat = tx.category || 'other_expense';
  const base = QONTO_CATEGORY_MAP[cat] || QONTO_CATEGORY_MAP.other_expense;

  if (cat === 'salary' && /dividend/i.test(`${label} ${ref}`)) {
    return { account: '457', label: 'Dividendes', vat: 'none', rule: 'salary→dividendes' };
  }

  return { ...base, rule: `qonto:${cat}` };
}

function txDate(tx) {
  return (tx.date || '').slice(0, 10);
}

function shortRef(tx) {
  const id = tx.id || '';
  const tail = id.split('-').pop() || id;
  return `QTO-${tail.slice(0, 12)}`;
}

function buildLines(tx, mapping, bankAccount, company) {
  const rate = company.tax?.tva_rate ?? TVA_RATE_DEFAULT;
  const amount = tx.amount;
  const abs = round2(Math.abs(amount));
  const isIncome = amount > 0;
  const vatMode = mapping.vat || 'none';
  const { ht, tva } = splitTtc(abs, rate, vatMode);
  const lines = [];

  if (isIncome) {
    if (tva > 0 && company.tax?.regime_tva === 'reel_normal') {
      lines.push(
        { account: bankAccount, debit: abs, credit: 0 },
        { account: mapping.account, debit: 0, credit: ht },
        { account: '44571', debit: 0, credit: tva },
      );
    } else {
      lines.push(
        { account: bankAccount, debit: abs, credit: 0 },
        { account: mapping.account, debit: 0, credit: abs },
      );
    }
    return lines;
  }

  if (tva > 0 && company.tax?.regime_tva === 'reel_normal') {
    lines.push(
      { account: mapping.account, debit: ht, credit: 0 },
      { account: '44566', debit: tva, credit: 0 },
      { account: bankAccount, debit: 0, credit: abs },
    );
  } else {
    lines.push(
      { account: mapping.account, debit: abs, credit: 0 },
      { account: bankAccount, debit: 0, credit: abs },
    );
  }
  return lines;
}

function needsReview(tx, mapping) {
  if (tx.category === 'food_and_grocery' && tx.amount < 0) {
    return 'Course / alimentation — vérifier caractère professionnel et TVA (50 % sur repas)';
  }
  if (mapping.account === '457') {
    return 'Versement associé / dividendes — confirmer traitement fiscal';
  }
  if (mapping.account === '444' && Math.abs(tx.amount) > 5000) {
    return 'Paiement DGFIP important — rapprocher avec avis d’imposition';
  }
  if (tx.raw?.attachment_required && !tx.raw?.attachment_ids?.length) {
    return 'Justificatif manquant sur Qonto';
  }
  return null;
}

function processFile(inputPath, company, bankAccount, extraRules, state) {
  const transactions = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const tx of transactions) {
    const mapping = resolveMapping(tx, extraRules);
    tx.our_category = mapping.account;
    tx.mapping_rule = mapping.rule;

    const warning = needsReview(tx, mapping);
    if (warning) {
      state.review.push({
        id: tx.id,
        date: txDate(tx),
        label: tx.label,
        amount: tx.amount,
        warning,
        file: path.basename(inputPath),
      });
    }

    state.journal.push({
      num: state.num++,
      date: txDate(tx),
      journal: 'BQ',
      ref: shortRef(tx),
      label: `${tx.label}`.slice(0, 80),
      source: 'qonto',
      source_id: tx.id,
      pcg_account: mapping.account,
      lines: buildLines(tx, mapping, bankAccount, company),
    });

    if (tx.amount > 0) {
      state.totalCredit += tx.amount;
    } else {
      state.totalDebit += tx.amount;
    }
    state.byAccount[mapping.account] = (state.byAccount[mapping.account] || 0) + 1;
    state.transactionCount += 1;
  }

  if (!state.dryRun) {
    fs.writeFileSync(inputPath, JSON.stringify(transactions, null, 2) + '\n');
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const company = loadCompany();
  if (!company) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }

  const inputFiles =
    options.inputs.length > 0 ? options.inputs : findQontoTransactionFiles();
  if (!inputFiles.length) {
    console.error(
      'Aucun fichier Qonto dans data/transactions/. Lancez d’abord : npm run fetch:qonto',
    );
    process.exit(1);
  }

  const bankAccount =
    (company.banks || []).find((b) => b.provider === 'qonto' || b.id === 'qonto')?.account ||
    '5121';

  const extraRules = loadOptionalLabelRules();
  const state = {
    dryRun: options.dryRun,
    num: 1,
    journal: [],
    review: [],
    transactionCount: 0,
    totalCredit: 0,
    totalDebit: 0,
    byAccount: {},
    inputFiles: inputFiles.map((p) => path.relative(PROJECT_ROOT, p)),
  };

  for (const file of inputFiles) {
    if (!fs.existsSync(file)) {
      console.error('Fichier introuvable :', file);
      process.exit(1);
    }
    processFile(file, company, bankAccount, extraRules, state);
  }

  if (!options.dryRun) {
    const journalPath = path.join(PROJECT_ROOT, 'data', 'journal-entries.json');
    const backupPath = path.join(PROJECT_ROOT, 'data', 'journal-entries.demo-backup.json');
    if (fs.existsSync(journalPath) && !fs.existsSync(backupPath)) {
      fs.copyFileSync(journalPath, backupPath);
      console.log('Ancien journal démo sauvegardé → data/journal-entries.demo-backup.json');
    }

    fs.writeFileSync(journalPath, JSON.stringify(state.journal, null, 2) + '\n');

    const summaryPath = path.join(PROJECT_ROOT, 'output', 'qonto-categorization-summary.json');
    fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
    fs.writeFileSync(
      summaryPath,
      JSON.stringify(
        {
          summary: {
            generated_at: new Date().toISOString(),
            company: company.name,
            inputs: state.inputFiles,
            transaction_count: state.transactionCount,
            journal_entries: state.journal.length,
            total_credit: round2(state.totalCredit),
            total_debit: round2(state.totalDebit),
            by_account: state.byAccount,
          },
          review: state.review,
        },
        null,
        2,
      ) + '\n',
    );
  }

  console.log(`Catégorisation Qonto — ${company.name || 'société'}`);
  console.log('================================');
  console.log(`Fichiers : ${state.inputFiles.join(', ')}`);
  console.log(`Transactions : ${state.transactionCount}`);
  console.log(`Écritures BQ : ${state.journal.length}`);
  console.log(`Encaissements : ${round2(state.totalCredit).toFixed(2)} EUR`);
  console.log(`Décaissements : ${round2(state.totalDebit).toFixed(2)} EUR`);
  console.log(`À revoir : ${state.review.length}`);
  if (extraRules.length) {
    console.log(`Règles libellés locales : ${extraRules.length}`);
  }
  console.log('\nRépartition PCG (nombre d\'écritures) :');
  for (const [acc, count] of Object.entries(state.byAccount).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${acc}: ${count}`);
  }
  if (!options.dryRun) {
    console.log('\nFichiers :');
    console.log('  data/transactions/… (our_category renseigné)');
    console.log('  data/journal-entries.json (BQ seul — lancer npm run journal:an pour AN + AG)');
    console.log('  output/qonto-categorization-summary.json');
  } else {
    console.log('\n[dry-run] Aucun fichier écrit.');
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
