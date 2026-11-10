#!/usr/bin/env node

/**
 * Validation de factures contre les mentions obligatoires
 *
 * Verifie qu'une facture (JSON) contient toutes les mentions requises
 * par le CGI, le Code de commerce, et la reforme 2026.
 *
 * Usage:
 *   node scripts/validate-facture.js --invoice data/invoices/F-2026-001.json
 *   node scripts/validate-facture.js --invoice data/invoices/F-2026-001.json --strict
 *   node scripts/validate-facture.js --all data/invoices/
 *
 * Options:
 *   --strict    Traiter les avertissements 2026 comme des erreurs
 *   --all       Valider toutes les factures d'un dossier
 *   --json      Sortie en JSON (pour integration CI/agent)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Chargement
// ---------------------------------------------------------------------------

function loadCompany() {
  const candidates = [
    path.join(process.cwd(), 'company.json'),
    path.join(ROOT, 'company.json'),
  ];
  const companyPath = candidates.find(p => fs.existsSync(p));
  if (!companyPath) {
    console.error('Erreur : company.json introuvable.');
    console.error('Cherche dans : ' + candidates.join(', '));
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(companyPath, 'utf8'));
}

function loadMentions() {
  // mentions-obligatoires.json est toujours dans le repo paperasse (data du skill)
  const mentionsPath = path.join(ROOT, 'data', 'facturation', 'mentions-obligatoires.json');
  if (!fs.existsSync(mentionsPath)) {
    console.error('Erreur : mentions-obligatoires.json introuvable a ' + mentionsPath);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(mentionsPath, 'utf8'));
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateInvoice(company, invoice, mentions, strict) {
  const errors = [];   // Mentions manquantes (bloquant)
  const warnings = []; // Mentions 2026 manquantes (avertissement, ou erreur si --strict)
  const ok = [];       // Mentions presentes

  const today = new Date().toISOString().slice(0, 10);
  const is2026Active = today >= '2026-09-01';

  // --- Emetteur ---
  const checkEmetteur = (field, jsonPath, getValue) => {
    const val = getValue();
    if (val) {
      ok.push({ id: field.id, label: field.label, value: String(val).substring(0, 50) });
    } else if (field.depuis === 'existant') {
      errors.push({ id: field.id, label: field.label, base_legale: field.base_legale });
    } else if (is2026Active || strict) {
      errors.push({ id: field.id, label: field.label, base_legale: field.base_legale, depuis: field.depuis });
    } else {
      warnings.push({ id: field.id, label: field.label, depuis: field.depuis });
    }
  };

  const emetteurMap = {
    nom: () => company.name,
    adresse: () => company.address,
    siren: () => company.siren || company.siret,
    rcs: () => company.rcs,
    forme_juridique: () => company.legal_form,
    tva_intracom: () => {
      if (company.tax && company.tax.regime_tva === 'franchise') return 'franchise';
      return company.tva_intracom;
    },
  };

  (mentions.mentions.emetteur || []).forEach(field => {
    const getter = emetteurMap[field.id];
    if (getter) checkEmetteur(field, field.id, getter);
  });

  // --- Client ---
  const clientMap = {
    nom_client: () => invoice.client && invoice.client.name,
    adresse_client: () => invoice.client && invoice.client.address,
    siren_client: () => invoice.client && invoice.client.siren,
    tva_intracom_client: () => invoice.client && invoice.client.tva_intracom,
  };

  (mentions.mentions.client || []).forEach(field => {
    const getter = clientMap[field.id];
    if (!getter) return;
    const val = getter();

    if (field.condition && !shouldApplyCondition(field.condition, company, invoice)) {
      return; // Condition non applicable
    }

    if (val) {
      ok.push({ id: field.id, label: field.label, value: String(val).substring(0, 50) });
    } else if (field.depuis !== 'existant' && !is2026Active && !strict) {
      warnings.push({ id: field.id, label: field.label, depuis: field.depuis });
    } else {
      errors.push({ id: field.id, label: field.label, base_legale: field.base_legale });
    }
  });

  // --- Facture ---
  const factureMap = {
    numero: () => invoice.number,
    date_emission: () => invoice.date,
    date_livraison: () => invoice.delivery_date || invoice.date,
    categorie_operation: () => invoice.category,
    adresse_livraison: () => invoice.delivery_address,
    option_debits: () => {
      if (company.tax && company.tax.option_debits) return 'oui';
      return null; // Only required if opted in
    },
  };

  (mentions.mentions.facture || []).forEach(field => {
    const getter = factureMap[field.id];
    if (!getter) return;

    if (field.condition && !shouldApplyCondition(field.condition, company, invoice)) {
      return;
    }

    const val = getter();
    if (val) {
      ok.push({ id: field.id, label: field.label, value: String(val).substring(0, 50) });
    } else if (field.depuis !== 'existant' && !is2026Active && !strict) {
      warnings.push({ id: field.id, label: field.label, depuis: field.depuis });
    } else if (field.obligatoire) {
      errors.push({ id: field.id, label: field.label, base_legale: field.base_legale });
    }
  });

  // --- Lignes ---
  if (!invoice.lines || invoice.lines.length === 0) {
    errors.push({ id: 'lines', label: 'Aucune ligne de facture', base_legale: 'Art. 242 nonies A CGI' });
  } else {
    invoice.lines.forEach((line, i) => {
      if (!line.description) errors.push({ id: `line_${i}_desc`, label: `Ligne ${i + 1} : designation manquante` });
      if (line.quantity === undefined) errors.push({ id: `line_${i}_qty`, label: `Ligne ${i + 1} : quantite manquante` });
      if (line.unit_price === undefined) errors.push({ id: `line_${i}_pu`, label: `Ligne ${i + 1} : prix unitaire manquant` });
    });
    if (errors.filter(e => e.id.startsWith('line_')).length === 0) {
      ok.push({ id: 'lines', label: 'Lignes de facture', value: `${invoice.lines.length} ligne(s)` });
    }
  }

  // --- Montants ---
  ok.push({ id: 'montants', label: 'Montants HT/TVA/TTC', value: 'calcules depuis les lignes' });

  // --- Paiement ---
  if (!invoice.due_date && !(invoice.payment && invoice.payment.terms)) {
    errors.push({ id: 'date_echeance', label: 'Date d\'echeance ou conditions de paiement', base_legale: 'Art. L441-9 C.com' });
  } else {
    ok.push({ id: 'paiement', label: 'Conditions de paiement', value: invoice.payment && invoice.payment.terms || invoice.due_date });
  }

  // --- Penalites ---
  const hasPenalty = (company.payment && company.payment.late_penalty_rate !== undefined) ||
                     (invoice.payment && invoice.payment.late_penalty_rate !== undefined);
  if (!hasPenalty) {
    warnings.push({ id: 'penalites', label: 'Taux de penalites de retard non specifie (defaut : taux legal)', base_legale: 'Art. L441-10 C.com' });
  }

  // --- Mention speciale franchise TVA ---
  if (company.tax && company.tax.regime_tva === 'franchise') {
    ok.push({ id: 'mention_franchise', label: 'Mention franchise TVA', value: 'art. 293 B du CGI' });
  }

  // --- Mention escompte (obligatoire art. L441-9 C.com) ---
  const hasEscompte = (company.payment && company.payment.escompte_label) ||
                      (invoice.payment && invoice.payment.escompte_label);
  if (!hasEscompte) {
    warnings.push({ id: 'escompte', label: 'Conditions d\'escompte non specifiees ("Pas d\'escompte..." si non applicable)', base_legale: 'Art. L441-9 C.com' });
  } else {
    ok.push({ id: 'escompte', label: 'Mention escompte', value: 'presente' });
  }

  return { errors, warnings, ok };
}

const EU_COUNTRIES = ['BE','BG','CZ','DK','DE','EE','IE','GR','ES','FR','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'];

function shouldApplyCondition(condition, company, invoice) {
  const c = condition.toLowerCase();
  const client = invoice.client || {};
  const country = (client.country || 'FR').toUpperCase();
  const isFR = country === 'FR';
  const isEU = EU_COUNTRIES.includes(country);
  const isIntraUE = isEU && !isFR;

  // Detection B2B : presence d'un SIREN ou nom contenant une forme juridique
  const looksLikeBusiness = client.name && /\b(SAS|SASU|SARL|EURL|SA|SCI|GmbH|Ltd|LLC|Inc|Corp|BV|AB|AG|SpA)\b/i.test(client.name);
  const isB2B = !!client.siren || looksLikeBusiness;

  if (c.includes('intra-ue') || c.includes('intracommunautaire')) {
    return isIntraUE && isB2B;
  }
  if (c.includes('b2b domestique')) {
    return isFR && isB2B;
  }
  if (c.includes('b2b')) {
    return isB2B;
  }
  if (c.includes('differente') || c.includes('différente')) {
    return invoice.delivery_address && invoice.delivery_address !== client.address;
  }
  if (c.includes('debits') || c.includes('débits')) {
    return company.tax && company.tax.option_debits;
  }
  if (c.includes('societe') || c.includes('société')) {
    return company.legal_form && ['SASU', 'SAS', 'SARL', 'EURL', 'SA', 'SCI'].includes(company.legal_form);
  }
  return true; // Par defaut, appliquer
}

// ---------------------------------------------------------------------------
// Sortie
// ---------------------------------------------------------------------------

function printResults(invoiceName, results, jsonOutput) {
  if (jsonOutput) {
    console.log(JSON.stringify({ invoice: invoiceName, ...results }, null, 2));
    return;
  }

  console.log(`\n━━━ Validation : ${invoiceName} ━━━\n`);

  if (results.ok.length > 0) {
    console.log(`✅ Mentions presentes (${results.ok.length}) :`);
    results.ok.forEach(m => console.log(`   ✓ ${m.label}${m.value ? ' : ' + m.value : ''}`));
  }

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  Avertissements (${results.warnings.length}) :`);
    results.warnings.forEach(w => {
      const since = w.depuis ? ` (obligatoire a partir du ${w.depuis})` : '';
      console.log(`   🟡 ${w.label}${since}`);
    });
  }

  if (results.errors.length > 0) {
    console.log(`\n❌ Mentions manquantes (${results.errors.length}) :`);
    results.errors.forEach(e => {
      const ref = e.base_legale ? ` [${e.base_legale}]` : '';
      console.log(`   🔴 ${e.label}${ref}`);
    });
  }

  const status = results.errors.length === 0
    ? (results.warnings.length === 0 ? '✅ CONFORME' : '⚠️  CONFORME AVEC AVERTISSEMENTS')
    : '❌ NON CONFORME';

  console.log(`\n${status}\n`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const invoiceIdx = args.indexOf('--invoice');
  const allIdx = args.indexOf('--all');
  const strict = args.includes('--strict');
  const jsonOutput = args.includes('--json');

  if (invoiceIdx === -1 && allIdx === -1) {
    console.error('Usage:');
    console.error('  node scripts/validate-facture.js --invoice <facture.json>');
    console.error('  node scripts/validate-facture.js --all <dossier/>');
    console.error('Options: --strict (2026 = erreurs), --json (sortie JSON)');
    process.exit(1);
  }

  const company = loadCompany();
  const mentions = loadMentions();

  if (allIdx !== -1) {
    const dir = args[allIdx + 1];
    if (!fs.existsSync(dir)) {
      console.error(`Dossier introuvable : ${dir}`);
      process.exit(1);
    }
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    let totalErrors = 0;
    files.forEach(f => {
      const invoice = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      const results = validateInvoice(company, invoice, mentions, strict);
      printResults(f, results, jsonOutput);
      totalErrors += results.errors.length;
    });
    process.exit(totalErrors > 0 ? 1 : 0);
  }

  const invoicePath = args[invoiceIdx + 1];
  const invoice = JSON.parse(fs.readFileSync(invoicePath, 'utf8'));
  const results = validateInvoice(company, invoice, mentions, strict);
  printResults(path.basename(invoicePath), results, jsonOutput);
  process.exit(results.errors.length > 0 ? 1 : 0);
}

main();
