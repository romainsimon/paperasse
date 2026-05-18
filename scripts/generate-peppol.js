#!/usr/bin/env node

/**
 * Générateur de factures au format Peppol BIS 3.0 (UBL 2.1)
 *
 * Génère une facture électronique conforme à l'obligation belge B2B
 * (AR du 29 octobre 2024 — obligatoire depuis le 01/01/2026)
 *
 * Format: UBL 2.1 (Universal Business Language)
 * Profil: Peppol BIS Billing 3.0
 * Identifiant réseau Peppol: 0208:[BCE sans points]
 *
 * Usage:
 *   node scripts/generate-peppol.js --invoice data/invoices/F-2026-001.json
 *   node scripts/generate-peppol.js --invoice data/invoices/F-2026-001.json --output output/
 *   node scripts/generate-peppol.js --invoice data/invoices/F-2026-001.json --validate
 *
 * Format facture JSON attendu:
 * {
 *   "number": "F-2026-001",
 *   "date": "2026-09-15",
 *   "due_date": "2026-10-15",
 *   "type": "invoice",          // "invoice" ou "credit_note"
 *   "client": {
 *     "name": "Client SRL",
 *     "bce": "0123.456.789",   // BCE format 0xxx.xxx.xxx
 *     "tva": "BE0123456789",
 *     "address": "Rue de la Loi 16, 1000 Bruxelles"
 *   },
 *   "lines": [...],
 *   "vat_rate": 21             // taux TVA belge: 21, 12, 6, ou 0
 * }
 *
 * Plateforme officielle: https://www.mercurius.be
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROOT = path.join(__dirname, '..');

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

function loadInvoice(invoicePath) {
  if (!fs.existsSync(invoicePath)) {
    console.error(`Erreur : fichier facture introuvable : ${invoicePath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(invoicePath, 'utf8'));
}

// ---------------------------------------------------------------------------
// Validation des champs Peppol/CTVA belge
// ---------------------------------------------------------------------------

/**
 * Vérifie que le format BCE est valide (0xxx.xxx.xxx).
 */
function isValidBCE(bce) {
  if (!bce) return false;
  return /^0\d{3}\.\d{3}\.\d{3}$/.test(bce);
}

/**
 * Convertit un BCE (0xxx.xxx.xxx) en identifiant Peppol (0208:0xxxxxxxxx).
 */
function bceToPeppolId(bce) {
  if (!bce) return '';
  return '0208:' + bce.replace(/\./g, '');
}

/**
 * Vérifie que le numéro de TVA belge est valide (BE0xxxxxxxxx).
 */
function isValidTVABelge(tva) {
  if (!tva) return false;
  return /^BE0\d{9}$/.test(tva);
}

/**
 * Vérifie les champs obligatoires pour une facture Peppol belge.
 * Mentions obligatoires selon l'art. 5 AR 29 juin 1992 (CTVA).
 */
function validatePeppolFields(invoice) {
  const errors = [];
  const warnings = [];

  // Numéro séquentiel
  if (!invoice.number) errors.push('number manquant (numéro séquentiel obligatoire — art. 5 AR 29 juin 1992)');

  // Date
  if (!invoice.date) errors.push('date manquant');
  if (!invoice.due_date) warnings.push('due_date manquant (recommandé)');

  // Client
  if (!invoice.client) {
    errors.push('client manquant');
  } else {
    if (!invoice.client.name) errors.push('client.name manquant');
    if (!invoice.client.address) errors.push('client.address manquant');

    // BCE format 0xxx.xxx.xxx
    if (invoice.client.bce && !isValidBCE(invoice.client.bce)) {
      errors.push(`client.bce format invalide : "${invoice.client.bce}" (attendu: 0xxx.xxx.xxx)`);
    }

    // TVA belge BE0xxxxxxxxx
    if (invoice.client.tva && !isValidTVABelge(invoice.client.tva)) {
      warnings.push(`client.tva format non standard : "${invoice.client.tva}" (attendu: BE0xxxxxxxxx)`);
    }

    // Pour B2B belge, BCE ou TVA est requis
    const looksLikeBusiness = invoice.client.name && /\b(SRL|SA|SPRL|ASBL|SCRL|CVBA|NV|BV|VOF|CommV|SNC|SCS|AISBL|SCRIS)\b/i.test(invoice.client.name);
    if (looksLikeBusiness && !invoice.client.bce && !invoice.client.tva) {
      warnings.push('client B2B : BCE ou numéro de TVA belge recommandé (obligatoire B2B depuis 01/01/2026)');
    }
  }

  // Lignes
  if (!invoice.lines || invoice.lines.length === 0) {
    errors.push('Aucune ligne de facture');
  } else {
    invoice.lines.forEach((line, i) => {
      if (!line.description) errors.push(`lines[${i}].description manquant`);
      if (line.quantity === undefined) errors.push(`lines[${i}].quantity manquant`);
      if (line.unit_price === undefined) errors.push(`lines[${i}].unit_price manquant`);
    });
  }

  // Taux TVA belge valide
  const validRates = [0, 6, 12, 21];
  if (invoice.vat_rate !== undefined && !validRates.includes(invoice.vat_rate)) {
    errors.push(`vat_rate invalide : ${invoice.vat_rate} (taux belges valides : 0, 6, 12, 21)`);
  }

  return { errors, warnings };
}

function validateCompanyPeppol(company) {
  const errors = [];
  const warnings = [];

  if (!company.name) errors.push('company.name manquant');
  if (!company.address) errors.push('company.address manquant');

  if (!company.bce) {
    errors.push('company.bce manquant (BCE format 0xxx.xxx.xxx)');
  } else if (!isValidBCE(company.bce)) {
    errors.push(`company.bce format invalide : "${company.bce}" (attendu: 0xxx.xxx.xxx)`);
  }

  if (!company.tva) {
    warnings.push('company.tva manquant (numéro TVA belge BE0xxxxxxxxx)');
  } else if (!isValidTVABelge(company.tva)) {
    warnings.push(`company.tva format non standard : "${company.tva}" (attendu: BE0xxxxxxxxx)`);
  }

  return { errors, warnings };
}

// ---------------------------------------------------------------------------
// Calculs
// ---------------------------------------------------------------------------

function computeTotals(company, invoice) {
  let totalHT = 0;

  const lines = (invoice.lines || []).map(line => {
    const lineTotal = (line.quantity || 0) * (line.unit_price || 0);
    totalHT += lineTotal;
    return { ...line, total: lineTotal };
  });

  // Taux TVA belge : 21 par défaut (taux standard belge)
  const vatRate = invoice.vat_rate !== undefined ? invoice.vat_rate : 21;
  const totalTVA = Math.round(totalHT * vatRate) / 100;
  const totalTTC = totalHT + totalTVA;

  return { lines, totalHT, vatRate, totalTVA, totalTTC };
}

// ---------------------------------------------------------------------------
// Génération XML UBL 2.1 (Peppol BIS Billing 3.0)
// ---------------------------------------------------------------------------

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateUBL(company, invoice, totals) {
  const typeCode = invoice.type === 'credit_note' ? '381' : '380';
  const rootElement = invoice.type === 'credit_note' ? 'CreditNote' : 'Invoice';
  const lineElement = invoice.type === 'credit_note' ? 'CreditNoteLine' : 'InvoiceLine';
  const qtyElement = invoice.type === 'credit_note' ? 'CreditedQuantity' : 'InvoicedQuantity';

  const supplierBce = company.bce || '';
  const supplierPeppolId = bceToPeppolId(supplierBce);
  const supplierTva = company.tva || '';

  const clientBce = (invoice.client && invoice.client.bce) || '';
  const clientPeppolId = bceToPeppolId(clientBce);
  const clientTva = (invoice.client && invoice.client.tva) || '';

  // Lignes UBL
  const lineItems = totals.lines.map((line, i) => `
  <${lineElement}>
    <cbc:ID>${i + 1}</cbc:ID>
    <cbc:${qtyElement} unitCode="${line.unit || 'C62'}">${line.quantity}</cbc:${qtyElement}>
    <cbc:LineExtensionAmount currencyID="EUR">${line.total.toFixed(2)}</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>${escapeXml(line.description)}</cbc:Description>
      <cbc:Name>${escapeXml(line.description)}</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>${totals.vatRate === 0 ? 'Z' : 'S'}</cbc:ID>
        <cbc:Percent>${totals.vatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">${line.unit_price.toFixed(2)}</cbc:PriceAmount>
    </cac:Price>
  </${lineElement}>`).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<${rootElement} xmlns="urn:oasis:names:specification:ubl:schema:xsd:${rootElement}-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">

  <!-- Peppol BIS Billing 3.0 — Facture électronique belge obligatoire B2B depuis 01/01/2026 -->
  <!-- AR du 29 octobre 2024 — Plateforme officielle: https://www.mercurius.be -->

  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:ProfileID>
  <cbc:ID>${escapeXml(invoice.number)}</cbc:ID>
  <cbc:IssueDate>${invoice.date}</cbc:IssueDate>${invoice.due_date ? `
  <cbc:DueDate>${invoice.due_date}</cbc:DueDate>` : ''}
  <cbc:${rootElement === 'Invoice' ? 'InvoiceTypeCode' : 'CreditNoteTypeCode'}>${typeCode}</cbc:${rootElement === 'Invoice' ? 'InvoiceTypeCode' : 'CreditNoteTypeCode'}>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
  <cbc:BuyerReference>${escapeXml(invoice.client && invoice.client.name || '')}</cbc:BuyerReference>

  <!-- Fournisseur (émetteur) -->
  <cac:AccountingSupplierParty>
    <cac:Party>${supplierPeppolId ? `
      <cbc:EndpointID schemeID="0208">${escapeXml(supplierPeppolId.replace('0208:', ''))}</cbc:EndpointID>` : ''}
      <cac:PartyIdentification>
        <cbc:ID schemeID="0208">${escapeXml(supplierBce.replace(/\./g, ''))}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>${escapeXml(company.name)}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${escapeXml(company.address)}</cbc:StreetName>
        <cbc:CityName>${escapeXml(company.city || '')}</cbc:CityName>
        <cbc:PostalZone>${(company.address.match(/\d{4}/) || [''])[0]}</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>BE</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>${supplierTva ? `
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXml(supplierTva)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>` : ''}
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(company.name)}</cbc:RegistrationName>
        <cbc:CompanyID schemeID="0208">${escapeXml(supplierBce.replace(/\./g, ''))}</cbc:CompanyID>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>

  <!-- Client (destinataire) -->
  <cac:AccountingCustomerParty>
    <cac:Party>${clientPeppolId ? `
      <cbc:EndpointID schemeID="0208">${escapeXml(clientPeppolId.replace('0208:', ''))}</cbc:EndpointID>` : ''}${clientBce ? `
      <cac:PartyIdentification>
        <cbc:ID schemeID="0208">${escapeXml(clientBce.replace(/\./g, ''))}</cbc:ID>
      </cac:PartyIdentification>` : ''}
      <cac:PartyName>
        <cbc:Name>${escapeXml(invoice.client && invoice.client.name || '')}</cbc:Name>
      </cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${escapeXml(invoice.client && invoice.client.address || '')}</cbc:StreetName>
        <cac:Country>
          <cbc:IdentificationCode>${escapeXml((invoice.client && invoice.client.country) || 'BE')}</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>${clientTva ? `
      <cac:PartyTaxScheme>
        <cbc:CompanyID>${escapeXml(clientTva)}</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>` : ''}${clientBce ? `
      <cac:PartyLegalEntity>
        <cbc:CompanyID schemeID="0208">${escapeXml(clientBce.replace(/\./g, ''))}</cbc:CompanyID>
      </cac:PartyLegalEntity>` : ''}
    </cac:Party>
  </cac:AccountingCustomerParty>

  <!-- Moyens de paiement -->
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>${invoice.due_date ? `
    <cbc:PaymentDueDate>${invoice.due_date}</cbc:PaymentDueDate>` : ''}${company.payment && company.payment.bank_details && company.payment.bank_details.iban ? `
    <cac:PayeeFinancialAccount>
      <cbc:ID>${escapeXml(company.payment.bank_details.iban)}</cbc:ID>${company.payment.bank_details.bic ? `
      <cac:FinancialInstitutionBranch>
        <cbc:ID>${escapeXml(company.payment.bank_details.bic)}</cbc:ID>
      </cac:FinancialInstitutionBranch>` : ''}
    </cac:PayeeFinancialAccount>` : ''}
  </cac:PaymentMeans>

  <!-- TVA -->
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">${totals.totalTVA.toFixed(2)}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">${totals.totalHT.toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">${totals.totalTVA.toFixed(2)}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>${totals.vatRate === 0 ? 'Z' : 'S'}</cbc:ID>
        <cbc:Percent>${totals.vatRate.toFixed(2)}</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>

  <!-- Totaux monétaires -->
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">${totals.totalHT.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">${totals.totalHT.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">${totals.totalTTC.toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">${totals.totalTTC.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>

  <!-- Lignes de facture -->
${lineItems}

</${rootElement}>`;

  return xml;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const invoiceIdx = args.indexOf('--invoice');
  const outputIdx = args.indexOf('--output');
  const validateOnly = args.includes('--validate');

  if (invoiceIdx === -1 || !args[invoiceIdx + 1]) {
    console.error('Usage: node scripts/generate-peppol.js --invoice <chemin-facture.json>');
    console.error('Options:');
    console.error('  --output <dossier>   Dossier de sortie (defaut: output/)');
    console.error('  --validate           Valider sans generer');
    process.exit(1);
  }

  const invoicePath = args[invoiceIdx + 1];
  const outputDir = outputIdx !== -1 ? args[outputIdx + 1] : path.join(ROOT, 'output');

  const company = loadCompany();
  const invoice = loadInvoice(invoicePath);

  // Validation
  const { errors: compErrors, warnings: compWarnings } = validateCompanyPeppol(company);
  const { errors: invErrors, warnings: invWarnings } = validatePeppolFields(invoice);

  const errors = [...compErrors, ...invErrors];
  const warnings = [...compWarnings, ...invWarnings];

  if (warnings.length > 0) {
    console.log('\nAvertissements :');
    warnings.forEach(w => console.log(`   [WARN] ${w}`));
  }

  if (errors.length > 0) {
    console.log('\nErreurs bloquantes :');
    errors.forEach(e => console.log(`   [ERR] ${e}`));
    process.exit(1);
  }

  if (validateOnly) {
    console.log('\nFacture valide (mentions obligatoires CTVA art. 5 AR 29 juin 1992 presentes)');
    return;
  }

  // Calculs
  const totals = computeTotals(company, invoice);

  // XML UBL 2.1
  const xml = generateUBL(company, invoice, totals);

  // Sortie
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const xmlPath = path.join(outputDir, `${invoice.number}_peppol.xml`);
  fs.writeFileSync(xmlPath, xml, 'utf8');
  console.log(`\nXML UBL 2.1 Peppol BIS 3.0 genere : ${xmlPath}`);

  // Resume
  console.log(`\nResume :`);
  console.log(`   Facture : ${invoice.number}`);
  console.log(`   Client : ${invoice.client && invoice.client.name}`);
  console.log(`   BCE client : ${(invoice.client && invoice.client.bce) || '(non renseigne)'}`);
  console.log(`   Peppol ID client : ${(invoice.client && invoice.client.bce) ? bceToPeppolId(invoice.client.bce) : '(non disponible)'}`);
  console.log(`   Total HTVA : ${totals.totalHT.toFixed(2)} EUR`);
  console.log(`   TVA (${totals.vatRate}%) : ${totals.totalTVA.toFixed(2)} EUR`);
  console.log(`   Total TVAC : ${totals.totalTTC.toFixed(2)} EUR`);
  console.log(`\n   Plateforme belge : https://www.mercurius.be`);
}

main().catch(err => {
  console.error('Erreur:', err.message);
  process.exit(1);
});
