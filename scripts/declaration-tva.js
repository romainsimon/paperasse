#!/usr/bin/env node
/**
 * Déclaration de TVA CA3 (régime réel normal) — reconstitution semi-automatique depuis la banque.
 *
 * Calcule, pour une ou plusieurs périodes mensuelles :
 *   - la TVA COLLECTÉE (base encaissements par défaut pour les services, ou débits) à partir des
 *     factures clients Qonto ;
 *   - la TVA DÉDUCTIBLE, ancrée sur les décaissements (1 TVA par transaction), rapprochée des
 *     factures fournisseurs analysées par Qonto, complétée par les postes hors factures
 *     (carburant, frais bancaires) et une liste « à justifier » ;
 *   - l'autoliquidation des services intra-UE reçus (net 0, ligne A3 ; pas de DES côté preneur) ;
 *   - les cases CA3 (01, A3, 08, 16, 19, 20, 22, 23, 28) et un net à payer par mois.
 *
 * LECTURE SEULE. Ne télédéclare rien, n'écrit rien chez un tiers. La sortie est un BROUILLON à
 * faire valider par un humain (ou son expert-comptable) avant dépôt sur impots.gouv.fr.
 *
 * Config : lit `company.json` (bloc `vat` + `tax.tva_rate` + `tax.regime_tva`). Voir
 * `company.example.json` et `comptable/references/declaration-tva.md`.
 *
 * Usage :
 *   node scripts/declaration-tva.js --from 2026-05 --to 2026-06
 *   node scripts/declaration-tva.js --from 2026-05 --to 2026-06 --offline data/transactions
 *   npm run declaration:tva -- --from 2026-05 --to 2026-06
 */
'use strict';

const fs = require('fs');
const path = require('path');

// ----------------------------- utilitaires argent (centimes entiers) -----------------------------
function cents(x) {
  if (x === null || x === undefined) return 0;
  if (typeof x === 'object') x = x.value; // {value, currency}
  return Math.round(parseFloat(x) * 100);
}
function eur(c) { return (c / 100).toFixed(2); }
function round0(c) { return Math.round(c / 100); } // arrondi fiscal à l'euro
function monthOf(d) { return d ? String(d).slice(0, 7) : null; }
function dateOnly(d) { return d ? String(d).slice(0, 10) : null; }
function daysBetween(a, b) {
  return Math.abs((new Date(a) - new Date(b)) / 86400000);
}

// ----------------------------- config -----------------------------
function loadCompany(configPath) {
  const p = configPath
    ? path.resolve(configPath)
    : path.join(__dirname, '..', 'company.json');
  if (!fs.existsSync(p)) {
    throw new Error(
      `company.json introuvable (${p}). Copiez company.example.json et renseignez le bloc "vat".`
    );
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function compileRules(list) {
  return (list || []).map(r => ({ re: new RegExp(r.pattern, 'i'), reason: r.reason || '' }));
}

// ----------------------------- moteur -----------------------------
class VatEngine {
  constructor(company) {
    const vat = company.vat || {};
    const tax = company.tax || {};
    this.rate = tax.tva_rate != null ? Number(tax.tva_rate) : 0.20;
    this.base = vat.base_exigibilite || 'encaissements'; // encaissements | debits
    const c = vat.classification || {};
    this.exclude = compileRules(c.exclude);
    this.intragroup = compileRules(c.intragroup);
    this.intracom = compileRules(c.intracom_services);
    this.fuelCats = new Set(c.fuel_categories || ['gas_station']);
    this.fuelPatterns = (c.fuel_patterns || ['TOTAL']).map(p => new RegExp(p, 'i'));
    this.fuelPct = c.fuel_deductible_pct != null ? Number(c.fuel_deductible_pct) : 1.0;
    this.feeOps = new Set(c.fee_operation_types || ['qonto_fee']);
    this.feePatterns = (c.fee_patterns || ['^Qonto$']).map(p => new RegExp(p, 'i'));
    this.estimateCats = new Set(
      c.estimate_categories || ['hardware_and_equipment', 'other_service', 'food_and_grocery', 'other_expense']
    );
  }

  // VAT (centimes) d'un TTC pour un taux donné : TTC - TTC/(1+taux)
  vatFromTtc(ttcCents, rate) {
    return Math.round(ttcCents - ttcCents / (1 + rate));
  }

  // Facture fournisseur analysée rapprochée d'un décaissement (id natif puis montant+date)
  matchSupplier(tx, supplierInvoices) {
    const amt = cents(tx.amount);
    const sdate = tx.settled_at;
    let best = null;
    for (const s of supplierInvoices) {
      if ((s.matched_transactions_ids || []).includes(tx.id)) {
        if (!best || cents(s.total_tax_amount) > cents(best.total_tax_amount)) best = s;
      }
    }
    if (best) return best;
    for (const s of supplierInvoices) {
      if (Math.abs(cents(s.total_amount) - amt) > 2) continue;
      const pd = s.payment_date || s.issue_date;
      if (pd && sdate && daysBetween(pd, sdate) > 7) continue;
      if (!best || cents(s.total_tax_amount) > cents(best.total_tax_amount)) best = s;
    }
    return best;
  }

  // Classe une dépense → { vat (centimes), reason, status: certain|a_justifier|auto|exclu }
  classifyExpense(tx, supplierInvoices) {
    const label = tx.label || '';
    const cat = tx.category;
    const op = tx.operation_type;
    const amt = cents(tx.amount);
    for (const r of this.intracom) if (r.re.test(label)) return { vat: 0, reason: r.reason, status: 'auto' };
    for (const r of this.intragroup) {
      if (r.re.test(label)) {
        const s = this.matchSupplier(tx, supplierInvoices);
        if (s && cents(s.total_tax_amount) > 0) {
          return { vat: cents(s.total_tax_amount), reason: 'facture intra-groupe (TVA analysée)', status: 'certain' };
        }
        return { vat: 0, reason: r.reason + ' (0 TVA)', status: 'exclu' };
      }
    }
    for (const r of this.exclude) if (r.re.test(label)) return { vat: 0, reason: r.reason, status: 'exclu' };
    if (cat === 'tax') return { vat: 0, reason: 'taxe (hors champ TVA)', status: 'exclu' };
    const s = this.matchSupplier(tx, supplierInvoices);
    if (s) {
      return {
        vat: cents(s.total_tax_amount),
        reason: `facture fourn. ${(s.supplier_name || '').slice(0, 22)}`,
        status: 'certain'
      };
    }
    if (this.fuelCats.has(cat) || this.fuelPatterns.some(p => p.test(label))) {
      return {
        vat: Math.round(this.vatFromTtc(amt, this.rate) * this.fuelPct),
        reason: `carburant (${Math.round(this.fuelPct * 100)}% déd.)`,
        status: 'certain'
      };
    }
    if (this.feeOps.has(op) || this.feePatterns.some(p => p.test(label))) {
      return { vat: this.vatFromTtc(amt, this.rate), reason: 'frais bancaires', status: 'certain' };
    }
    if (amt > 0 && this.estimateCats.has(cat)) {
      return {
        vat: this.vatFromTtc(amt, this.rate),
        reason: `carte/autre ${cat} — TVA estimée ${Math.round(this.rate * 100)}% (JUSTIFICATIF À FOURNIR)`,
        status: 'a_justifier'
      };
    }
    return { vat: 0, reason: `non classé (${cat})`, status: 'exclu' };
  }

  collectedForMonth(clientInvoices, month) {
    let ttc = 0, vat = 0;
    const lines = [];
    for (const c of clientInvoices) {
      if (c.status === 'draft') continue;
      const key = this.base === 'encaissements'
        ? monthOf(c.paid_at)
        : monthOf(c.finalized_at || c.issue_date);
      if (key !== month) continue;
      ttc += cents(c.total_amount);
      vat += cents(c.vat_amount);
      lines.push(c);
    }
    return { htCents: ttc - vat, vatCents: vat, ttcCents: ttc, lines };
  }

  run(months, transactions, clientInvoices, supplierInvoices) {
    const tx = transactions.filter(t => t.status === 'completed');
    const out = {};
    for (const month of months) {
      const coll = this.collectedForMonth(clientInvoices, month);
      let certain = 0, aJustifier = 0, autoHt = 0;
      const linesC = [], linesA = [];
      const debits = tx
        .filter(t => t.side === 'debit' && monthOf(t.settled_at) === month)
        .sort((a, b) => String(a.settled_at).localeCompare(String(b.settled_at)));
      for (const t of debits) {
        const r = this.classifyExpense(t, supplierInvoices);
        if (r.status === 'auto') autoHt += cents(t.amount);
        else if (r.status === 'certain' && r.vat > 0) { certain += r.vat; linesC.push({ t, vat: r.vat, reason: r.reason }); }
        else if (r.status === 'a_justifier') { aJustifier += r.vat; linesA.push({ t, vat: r.vat, reason: r.reason }); }
      }
      const autoVat = Math.round(autoHt * this.rate);
      out[month] = {
        htCents: coll.htCents, vatCents: coll.vatCents, ttcCents: coll.ttcCents,
        certainCents: certain, aJustifierCents: aJustifier,
        autoHtCents: autoHt, autoVatCents: autoVat,
        netCents: coll.vatCents - certain,
        linesC, linesA, invoices: coll.lines
      };
    }
    return out;
  }
}

// ----------------------------- rendu CA3 -----------------------------
function ca3Boxes(R) {
  const base08 = R.htCents + R.autoHtCents;
  const tvaBrute = R.vatCents + R.autoVatCents;
  const ded = R.certainCents + R.autoVatCents;
  return {
    '01_base_ht_ventes_prestations': round0(R.htCents),
    'A3_base_ht_services_intra_ue': round0(R.autoHtCents),
    '08_base_taux_normal': round0(base08),
    '08_tva_due': round0(tvaBrute),
    '16_tva_brute_due': round0(tvaBrute),
    '19_deductible_immobilisations': 0,
    '20_deductible_abs': round0(ded),
    '22_report_credit_precedent': 0,
    '23_deductible_total': round0(ded),
    '28_tva_nette_due': round0(tvaBrute - ded),
    '32_total_a_payer': round0(tvaBrute - ded)
  };
}

function renderText(company, months, results, engine) {
  const L = [];
  L.push(`DÉCLARATION DE TVA — ${company.name || '—'} — régime ${((company.tax || {}).regime_tva) || 'réel normal'} / base ${engine.base}`);
  L.push(`taux normal ${Math.round(engine.rate * 100)}%  ·  SIREN ${company.siren || '—'}`);
  L.push(`⚠️  BROUILLON — à valider par un humain avant dépôt. Rien n'est télédéclaré.`);
  for (const month of months) {
    const R = results[month];
    const c = ca3Boxes(R);
    L.push(`\n${'='.repeat(64)}\n  ${month}\n${'='.repeat(64)}`);
    L.push(`  COLLECTÉE (base ${engine.base}): HT ${eur(R.htCents)} | TVA ${eur(R.vatCents)} | TTC ${eur(R.ttcCents)}`);
    L.push(`  DÉDUCTIBLE CERTAINE: ${eur(R.certainCents)}`);
    for (const x of R.linesC) {
      L.push(`      · ${dateOnly(x.t.settled_at)}  TVA ${eur(x.vat).padStart(8)}  ${(x.t.label || '').slice(0, 20).padEnd(20)} ${x.reason}`);
    }
    if (R.linesA.length) {
      L.push(`  DÉDUCTIBLE À JUSTIFIER (récupérer le justificatif): ${eur(R.aJustifierCents)}`);
      for (const x of R.linesA) {
        L.push(`      ? ${dateOnly(x.t.settled_at)}  TVA~${eur(x.vat).padStart(7)}  ${(x.t.label || '').slice(0, 20).padEnd(20)} (TTC ${eur(cents(x.t.amount))})`);
      }
    }
    if (R.autoHtCents > 0) {
      L.push(`  AUTOLIQ. services intra-UE reçus: base A3 ${eur(R.autoHtCents)} → TVA ${eur(R.autoVatCents)} (collectée+déductible, net 0). Pas de DES (obligation du prestataire, pas du preneur).`);
    }
    L.push(`  ── CASES CA3 (arrondies €) ──`);
    L.push(`     01 ${String(c['01_base_ht_ventes_prestations']).padStart(7)}  | A3 ${String(c['A3_base_ht_services_intra_ue']).padStart(6)}`);
    L.push(`     08 base ${String(c['08_base_taux_normal']).padStart(7)}  → TVA due ${String(c['08_tva_due']).padStart(6)}   16 ${String(c['16_tva_brute_due']).padStart(6)}`);
    L.push(`     19 ${String(c['19_deductible_immobilisations']).padStart(4)}  20 ${String(c['20_deductible_abs']).padStart(6)}  22 ${String(c['22_report_credit_precedent']).padStart(4)}  23 ${String(c['23_deductible_total']).padStart(6)}`);
    L.push(`     >>> 28/32 TVA NETTE À PAYER : ${c['28_tva_nette_due']} €`);
    if (R.aJustifierCents > 0) {
      L.push(`         (si tous justificatifs validés : ~ ${round0(R.netCents - R.aJustifierCents)} €)`);
    }
  }
  return L.join('\n');
}

// ----------------------------- périodes -----------------------------
function monthsBetween(from, to) {
  let [y, m] = [parseInt(from.slice(0, 4), 10), parseInt(from.slice(5, 7), 10)];
  const [ye, me] = [parseInt(to.slice(0, 4), 10), parseInt(to.slice(5, 7), 10)];
  const out = [];
  while (y < ye || (y === ye && m <= me)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    m++; if (m > 12) { m = 1; y++; }
  }
  return out;
}

// ----------------------------- CLI -----------------------------
function parseArgs(argv) {
  const a = { from: null, to: null, offline: null, config: null, json: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--from') a.from = argv[++i];
    else if (argv[i] === '--to') a.to = argv[++i];
    else if (argv[i] === '--offline') a.offline = argv[++i];
    else if (argv[i] === '--config') a.config = argv[++i];
    else if (argv[i] === '--json') a.json = true;
  }
  return a;
}

async function loadData(company, months, offline) {
  if (offline) {
    const d = path.resolve(offline);
    const read = f => JSON.parse(fs.readFileSync(path.join(d, f), 'utf-8'));
    return {
      transactions: read('transactions.json'),
      clientInvoices: read('client_invoices.json'),
      supplierInvoices: read('supplier_invoices.json')
    };
  }
  const qonto = require(path.join(__dirname, '..', 'integrations', 'qonto', 'fetch.js'));
  const org = (await qonto.getOrganization()).organization;
  const iban = (company.vat && company.vat.qonto_iban) || org.bank_accounts[0].iban;
  const from = `${months[0]}-01T00:00:00.000Z`;
  let [y, m] = [parseInt(months[months.length - 1].slice(0, 4), 10), parseInt(months[months.length - 1].slice(5, 7), 10)];
  m++; if (m > 12) { m = 1; y++; }
  const to = `${y}-${String(m).padStart(2, '0')}-01T00:00:00.000Z`;
  const transactions = await qonto.getAllTransactions(iban, { settled_at_from: from, settled_at_to: to });
  const clientInvoices = await qonto.getAllClientInvoices();
  const supplierInvoices = await qonto.getAllSupplierInvoices();
  return { transactions, clientInvoices, supplierInvoices };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.from || !args.to) {
    console.error('Usage : node scripts/declaration-tva.js --from YYYY-MM --to YYYY-MM [--offline <dir>] [--config <company.json>] [--json]');
    process.exit(1);
  }
  const company = loadCompany(args.config);
  const months = monthsBetween(args.from, args.to);
  const { transactions, clientInvoices, supplierInvoices } = await loadData(company, months, args.offline);
  const engine = new VatEngine(company);
  const results = engine.run(months, transactions, clientInvoices, supplierInvoices);

  console.log(renderText(company, months, results, engine));

  const payload = {
    entity: company.name, base: engine.base,
    months: Object.fromEntries(months.map(mo => [mo, ca3Boxes(results[mo])]))
  };
  if (args.json) console.log('\n--- CA3 JSON ---\n' + JSON.stringify(payload, null, 2));

  const outDir = path.join(__dirname, '..', 'data', 'declarations-tva');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `ca3-${args.from}_${args.to}.json`), JSON.stringify(payload, null, 2));
  console.log(`\n[écrit] data/declarations-tva/ca3-${args.from}_${args.to}.json`);
}

module.exports = { VatEngine, ca3Boxes, monthsBetween, cents };

if (require.main === module) {
  main().catch(err => { console.error('Erreur :', err.message); process.exit(1); });
}
