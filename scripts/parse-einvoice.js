#!/usr/bin/env node

/**
 * Lecture de factures électroniques au format CII (Factur-X / EN 16931)
 *
 * Extrait les données structurées d'une facture reçue au format CII
 * et les retourne dans le même format JSON qu'attend generate-facturx.js,
 * avec en plus le détail de la ventilation TVA (tax_breakdown).
 *
 * Usage :
 *   node scripts/parse-einvoice.js --invoice output/F-2026-001.xml
 *   node scripts/parse-einvoice.js --invoice output/F-2026-001.xml --json
 *
 * Formats supportés :
 *   - XML CII (Cross-Industry Invoice, EN 16931 / Factur-X)
 *
 * Format UBL (réseau Peppol) : non encore supporté.
 *
 * Pour extraire le XML embarqué d'un Factur-X PDF, utilisez pdfdetach
 * (fourni par le paquet poppler-utils) :
 *   pdfdetach -savefile factur-x.xml votre-facture.pdf
 *   node scripts/parse-einvoice.js --invoice factur-x.xml
 *
 * Hypothèses du parseur :
 *   - Les noms d'éléments CII ne sont pas auto-imbriqués (ex : pas de
 *     <ram:SellerTradeParty> dans un <ram:SellerTradeParty>).
 *   - Le séparateur décimal est le point (.) — requis par la norme EN 16931.
 *   - Pour un usage en production sur des CII arbitraires, préférer un
 *     parseur XML dédié (ex : fast-xml-parser).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Helpers d'extraction XML
// Ciblés sur le schéma CII EN 16931 — pas un parseur XML générique.
// ---------------------------------------------------------------------------

// Contenu texte de la première occurrence d'un tag (avec ou sans attributs).
function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}[^>]*>([^<]*)<\\/${name}>`));
  return m ? unescapeXml(m[1].trim()) : null;
}

// Contenu texte d'un tag portant un attribut précis (ex: schemeID="0002").
// Gère les guillemets simples et doubles.
function tagAttr(xml, name, attr, value) {
  const re = new RegExp(`<${name}[^>]*${attr}=["']${value}["'][^>]*>([^<]*)<\\/${name}>`);
  const m = xml.match(re);
  return m ? unescapeXml(m[1].trim()) : null;
}

// Premier sous-bloc délimité par un tag (avec attributs éventuels).
// Suppose que le tag n'est pas auto-imbriqué (voir en-tête).
function block(xml, name) {
  const re = new RegExp(`<${name}[\\s>][\\s\\S]*?<\\/${name}>`);
  const m = xml ? xml.match(re) : null;
  return m ? m[0] : null;
}

// Toutes les occurrences non-chevauchantes d'un bloc délimité par un tag.
function allBlocks(xml, name) {
  const blocks = [];
  const re = new RegExp(`<${name}[\\s>][\\s\\S]*?<\\/${name}>`, 'g');
  let m;
  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);
  return blocks;
}

// Convertit une date au format CII 102 (YYYYMMDD) en ISO (YYYY-MM-DD).
function parseDate102(raw) {
  if (!raw || raw.length !== 8) return raw || null;
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

// Parse un montant en virgule fixe. Retourne null si la valeur est absente
// ou non numérique (EN 16931 impose le point comme séparateur décimal).
function parseAmount(raw) {
  if (!raw) return null;
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : null;
}

function unescapeXml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

// ---------------------------------------------------------------------------
// Détection du format à partir de l'espace de noms XML
// ---------------------------------------------------------------------------

function detectFormat(xml) {
  if (xml.includes('CrossIndustryInvoice')) return 'cii';
  if (xml.includes('urn:oasis:names:specification:ubl:schema:xsd:Invoice')) return 'ubl';
  return null;
}

// ---------------------------------------------------------------------------
// Parsing CII — Cross-Industry Invoice (EN 16931 / Factur-X)
//
// Structure de référence :
//   rsm:CrossIndustryInvoice
//     rsm:ExchangedDocumentContext   → profil (EN 16931)
//     rsm:ExchangedDocument          → numéro, type, date, notes
//     rsm:SupplyChainTradeTransaction
//       ram:ApplicableHeaderTradeAgreement
//         ram:SellerTradeParty       → vendeur
//         ram:BuyerTradeParty        → acheteur
//       ram:ApplicableHeaderTradeDelivery
//       ram:ApplicableHeaderTradeSettlement
//         ram:InvoiceCurrencyCode
//         ram:ApplicableTradeTax     → ventilation TVA (N blocs, un par taux)
//         ram:SpecifiedTradePaymentTerms → échéance, conditions
//         ram:SpecifiedTradeSettlementHeaderMonetarySummation → totaux
//       ram:IncludedSupplyChainTradeLineItem (N lignes)
// ---------------------------------------------------------------------------

function parseCII(xml) {
  // --- Document ---
  const exchangedDoc = block(xml, 'rsm:ExchangedDocument') || '';
  const number = tag(exchangedDoc, 'ram:ID');
  const typeCode = tag(exchangedDoc, 'ram:TypeCode');
  const type = typeCode === '381' ? 'credit_note' : 'invoice';
  const rawDate = tag(exchangedDoc, 'udt:DateTimeString');
  const date = parseDate102(rawDate);

  // La catégorie d'opération (biens/services/mixte) est stockée dans une note
  // identifiée par SubjectCode AAK — obligation 2026, art. 242 nonies A CGI.
  let category = null;
  for (const noteXml of allBlocks(exchangedDoc, 'ram:IncludedNote')) {
    if (noteXml.includes('AAK')) {
      const content = tag(noteXml, 'ram:Content');
      if (content === 'Livraison de biens') category = 'goods';
      else if (content === 'Prestation de services') category = 'services';
      else if (content === 'Mixte') category = 'mixed';
    }
  }

  // --- Transaction ---
  const tradeTransaction = block(xml, 'rsm:SupplyChainTradeTransaction') || '';
  const agreement = block(tradeTransaction, 'ram:ApplicableHeaderTradeAgreement') || '';
  const settlement = block(tradeTransaction, 'ram:ApplicableHeaderTradeSettlement') || '';

  // --- Vendeur (SellerTradeParty) ---
  const sellerBlock = block(agreement, 'ram:SellerTradeParty') || '';
  const sellerName = tag(sellerBlock, 'ram:Name');
  // Le SIRET (ICD 0002, ISO 6523) est porté par SpecifiedLegalOrganization.
  const sellerLegalOrg = block(sellerBlock, 'ram:SpecifiedLegalOrganization') || '';
  const sellerSiret = tagAttr(sellerLegalOrg, 'ram:ID', 'schemeID', '0002');
  const sellerAddressBlock = block(sellerBlock, 'ram:PostalTradeAddress') || '';
  const sellerAddress = tag(sellerAddressBlock, 'ram:LineOne');
  const sellerPostcode = tag(sellerAddressBlock, 'ram:PostcodeCode');
  const sellerCity = tag(sellerAddressBlock, 'ram:CityName');
  // N° TVA intracommunautaire : SpecifiedTaxRegistration/ID[@schemeID="VA"]
  const sellerTaxReg = block(sellerBlock, 'ram:SpecifiedTaxRegistration') || '';
  const sellerTva = tagAttr(sellerTaxReg, 'ram:ID', 'schemeID', 'VA');

  // --- Acheteur (BuyerTradeParty) ---
  const buyerBlock = block(agreement, 'ram:BuyerTradeParty') || '';
  const buyerName = tag(buyerBlock, 'ram:Name');
  const buyerLegalOrg = block(buyerBlock, 'ram:SpecifiedLegalOrganization') || '';
  const buyerIdRaw = tagAttr(buyerLegalOrg, 'ram:ID', 'schemeID', '0002');
  // ICD 0002 = SIRET (14 chiffres). Le SIREN est les 9 premiers chiffres.
  const buyerSiret = buyerIdRaw && buyerIdRaw.length === 14 ? buyerIdRaw : null;
  const buyerSiren = buyerIdRaw && buyerIdRaw.length >= 9 ? buyerIdRaw.slice(0, 9) : null;
  const buyerAddressBlock = block(buyerBlock, 'ram:PostalTradeAddress') || '';
  const buyerAddress = tag(buyerAddressBlock, 'ram:LineOne');
  const buyerTaxReg = block(buyerBlock, 'ram:SpecifiedTaxRegistration') || '';
  const buyerTva = tagAttr(buyerTaxReg, 'ram:ID', 'schemeID', 'VA');

  // --- Règlement ---
  const currency = tag(settlement, 'ram:InvoiceCurrencyCode') || 'EUR';
  const paymentTermsBlock = block(settlement, 'ram:SpecifiedTradePaymentTerms') || '';
  const paymentTermsDesc = tag(paymentTermsBlock, 'ram:Description');
  const rawDueDate = tag(paymentTermsBlock, 'udt:DateTimeString');
  const dueDate = parseDate102(rawDueDate);

  // --- Ventilation TVA (N blocs, un par taux ou par catégorie) ---
  // Les codes catégorie sont définis dans UNCL5305 (UN/EDIFACT).
  // Exemples courants : S = standard, E = exonéré, K = intracom, Z = taux zéro.
  const taxBlocks = allBlocks(settlement, 'ram:ApplicableTradeTax');
  const taxBreakdown = taxBlocks.map(tb => {
    const rateRaw = tag(tb, 'ram:RateApplicablePercent');
    const rate = rateRaw !== null ? (parseAmount(rateRaw) ?? 0) / 100 : null;
    const entry = {
      category_code: tag(tb, 'ram:CategoryCode'),
      rate,
      basis_amount: parseAmount(tag(tb, 'ram:BasisAmount')),
      tax_amount: parseAmount(tag(tb, 'ram:CalculatedAmount')),
    };
    const reasonCode = tag(tb, 'ram:ExemptionReasonCode');
    const reason = tag(tb, 'ram:ExemptionReason');
    if (reasonCode) entry.exemption_reason_code = reasonCode;
    if (reason) entry.exemption_reason = reason;
    return entry;
  });

  // Taux unique : renseigné seulement si toutes les lignes imposables (S)
  // partagent le même taux — sinon null (voir tax_breakdown).
  const standardRows = taxBreakdown.filter(r => r.category_code === 'S');
  const uniqueRates = [...new Set(standardRows.map(r => r.rate))];
  const tvaRate = uniqueRates.length === 1 ? uniqueRates[0] : null;

  // Présence d'une exonération (catégories autres que S).
  // Ne pas confondre avec la franchise en base art. 293 B CGI, qui utilise
  // ExemptionReasonCode = "VATEX-FR-FRANCHISE" — vérifier tax_breakdown.
  const tvaExempt = taxBreakdown.some(r => r.category_code !== 'S');

  // --- Totaux ---
  const summation = block(settlement, 'ram:SpecifiedTradeSettlementHeaderMonetarySummation') || '';
  const totalHT = parseAmount(tag(summation, 'ram:TaxBasisTotalAmount')) ?? 0;
  const totalTVA = parseAmount(tag(summation, 'ram:TaxTotalAmount')) ?? 0;
  const totalTTC = parseAmount(tag(summation, 'ram:GrandTotalAmount')) ?? 0;

  // --- Lignes ---
  const lineBlocks = allBlocks(tradeTransaction, 'ram:IncludedSupplyChainTradeLineItem');
  const lines = lineBlocks.map(lineXml => {
    const description = tag(lineXml, 'ram:Name');
    const quantity = parseAmount(tag(lineXml, 'ram:BilledQuantity')) ?? 0;

    // L'unité est dans l'attribut unitCode de BilledQuantity.
    // C62 = "pièce" (unité générique UN/ECE Rec 20) — omis dans la sortie.
    const unitMatch = lineXml.match(/ram:BilledQuantity[^>]*unitCode="([^"]+)"/);
    const unitCode = unitMatch ? unitMatch[1] : null;

    const unitPrice = parseAmount(tag(lineXml, 'ram:ChargeAmount')) ?? 0;
    const lineTotal = parseAmount(tag(lineXml, 'ram:LineTotalAmount')) ?? 0;

    return {
      description,
      quantity,
      ...(unitCode && unitCode !== 'C62' ? { unit: unitCode } : {}),
      unit_price: unitPrice,
      total: lineTotal,
    };
  });

  // --- Résultat ---
  // Format identique à l'entrée de generate-facturx.js, avec en plus :
  //   seller    → émetteur de la facture reçue
  //   tax_breakdown → ventilation TVA détaillée (multi-taux)
  return {
    number,
    date,
    due_date: dueDate,
    type,
    ...(category ? { category } : {}),
    seller: {
      name: sellerName,
      ...(sellerSiret ? { siret: sellerSiret } : {}),
      ...(sellerAddress ? { address: sellerAddress } : {}),
      ...(sellerPostcode ? { postcode: sellerPostcode } : {}),
      ...(sellerCity ? { city: sellerCity } : {}),
      ...(sellerTva ? { tva_intracom: sellerTva } : {}),
    },
    client: {
      name: buyerName,
      ...(buyerSiren ? { siren: buyerSiren } : {}),
      ...(buyerSiret ? { siret: buyerSiret } : {}),
      ...(buyerAddress ? { address: buyerAddress } : {}),
      ...(buyerTva ? { tva_intracom: buyerTva } : {}),
    },
    currency,
    totals: {
      ht: totalHT,
      tva: totalTVA,
      ttc: totalTTC,
      ...(tvaRate !== null ? { tva_rate: tvaRate } : {}),
      tva_exempt: tvaExempt,
    },
    tax_breakdown: taxBreakdown,
    lines,
    ...(paymentTermsDesc ? { payment: { terms: paymentTermsDesc } } : {}),
    _format: 'cii-en16931',
  };
}

// ---------------------------------------------------------------------------
// Affichage humain
// ---------------------------------------------------------------------------

// Formate un taux TVA en pourcentage sans zéro inutile (ex : 0.021 → "2.1%").
function formatRate(rate) {
  const pct = rate * 100;
  return `${parseFloat(pct.toFixed(4))}%`;
}

function printHuman(invoice) {
  const eur = (n) => (n !== null && n !== undefined ? n.toFixed(2) + ' EUR' : '-');
  const categoryLabels = { goods: 'Livraison de biens', services: 'Prestation de services', mixed: 'Mixte' };

  console.log('\n━━━ Facture parsée ━━━\n');
  console.log(`  Numéro      : ${invoice.number}`);
  console.log(`  Type        : ${invoice.type === 'credit_note' ? 'Avoir (TypeCode 381)' : 'Facture (TypeCode 380)'}`);
  console.log(`  Date        : ${invoice.date}`);
  console.log(`  Échéance    : ${invoice.due_date || '-'}`);
  if (invoice.category) console.log(`  Catégorie   : ${categoryLabels[invoice.category] || invoice.category}`);
  console.log(`  Format      : ${invoice._format}`);

  console.log('\n  Vendeur');
  console.log(`    Nom       : ${invoice.seller.name || '-'}`);
  console.log(`    SIRET     : ${invoice.seller.siret || '-'}`);
  if (invoice.seller.address) console.log(`    Adresse   : ${invoice.seller.address}`);
  if (invoice.seller.tva_intracom) console.log(`    N° TVA    : ${invoice.seller.tva_intracom}`);

  console.log('\n  Acheteur');
  console.log(`    Nom       : ${invoice.client.name || '-'}`);
  console.log(`    SIREN     : ${invoice.client.siren || '-'}`);
  if (invoice.client.address) console.log(`    Adresse   : ${invoice.client.address}`);
  if (invoice.client.tva_intracom) console.log(`    N° TVA    : ${invoice.client.tva_intracom}`);

  console.log('\n  Montants');
  console.log(`    Total HT  : ${eur(invoice.totals.ht)}`);
  if (invoice.tax_breakdown.length > 0) {
    invoice.tax_breakdown.forEach(tb => {
      const label = tb.category_code === 'S'
        ? `TVA ${formatRate(tb.rate)}`
        : `TVA (${tb.category_code}${tb.exemption_reason ? ' — ' + tb.exemption_reason : ''})`;
      console.log(`    ${label.padEnd(18)}: base ${eur(tb.basis_amount)}, TVA ${eur(tb.tax_amount)}`);
    });
  }
  console.log(`    Total TTC : ${eur(invoice.totals.ttc)}`);

  if (invoice.lines && invoice.lines.length > 0) {
    console.log(`\n  Lignes (${invoice.lines.length})`);
    invoice.lines.forEach((l, i) => {
      const unit = l.unit ? ` ${l.unit}` : '';
      console.log(`    ${i + 1}. ${l.description} — ${l.quantity}${unit} × ${l.unit_price.toFixed(2)} EUR = ${l.total.toFixed(2)} EUR`);
    });
  }

  if (invoice.payment && invoice.payment.terms) {
    console.log(`\n  Paiement    : ${invoice.payment.terms}`);
  }

  console.log('');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const invoiceIdx = args.indexOf('--invoice');
  const jsonOutput = args.includes('--json');

  if (invoiceIdx === -1 || !args[invoiceIdx + 1]) {
    console.error('Usage: node scripts/parse-einvoice.js --invoice <fichier.xml>');
    console.error('Options:');
    console.error('  --json   Sortie JSON uniquement (pour intégration CI/agent)');
    process.exit(1);
  }

  const filePath = args[invoiceIdx + 1];
  if (!fs.existsSync(filePath)) {
    console.error(`Fichier introuvable : ${filePath}`);
    process.exit(1);
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    console.error('Les fichiers PDF ne sont pas supportés directement.');
    console.error("Extrayez d'abord le XML embarqué avec pdfdetach (poppler-utils) :");
    console.error('  pdfdetach -savefile factur-x.xml ' + path.basename(filePath));
    console.error('  node scripts/parse-einvoice.js --invoice factur-x.xml');
    process.exit(1);
  }

  const xml = fs.readFileSync(filePath, 'utf8');
  if (!xml.trim()) {
    console.error('Fichier vide.');
    process.exit(1);
  }

  const format = detectFormat(xml);
  if (!format) {
    console.error('Format non reconnu : ni CII ni UBL détecté.');
    console.error('Vérifiez que le fichier est bien une facture électronique EN 16931.');
    process.exit(1);
  }

  if (format === 'ubl') {
    console.error('Format UBL non encore supporté (utilisé sur le réseau Peppol).');
    console.error('Ce parser traite les factures CII (Factur-X, échanges domestiques FR).');
    process.exit(1);
  }

  const invoice = parseCII(xml);

  if (jsonOutput) {
    console.log(JSON.stringify(invoice, null, 2));
  } else {
    printHuman(invoice);
  }
}

main();
