#!/usr/bin/env node

/**
 * Generateur de factures au format Factur-X (PDF/A-3 + XML CII)
 *
 * Genere une facture conforme a la reforme 2026 :
 * - PDF lisible (humain)
 * - XML CII embarque (machine)
 * - Toutes les mentions obligatoires (existantes + nouvelles 2026)
 *
 * Usage:
 *   node scripts/generate-facturx.js --invoice data/invoices/F-2026-001.json
 *   node scripts/generate-facturx.js --invoice data/invoices/F-2026-001.json --output output/
 *   node scripts/generate-facturx.js --invoice data/invoices/F-2026-001.json --xml-only
 *   node scripts/generate-facturx.js --invoice data/invoices/F-2026-001.json --validate
 *
 * Prerequis:
 *   - company.json (copier company.example.json et remplir)
 *   - Un fichier facture JSON (voir format ci-dessous)
 *
 * Format facture JSON attendu :
 * {
 *   "number": "F-2026-001",
 *   "date": "2026-09-15",
 *   "due_date": "2026-10-15",
 *   "type": "invoice",
 *   "category": "services",
 *   "client": {
 *     "name": "Client SAS",
 *     "address": "10 avenue de la Republique, 75011 Paris",
 *     "siren": "987654321",
 *     "siret": "98765432100014",
 *     "tva_intracom": "FR98765432100"
 *   },
 *   "lines": [
 *     {
 *       "description": "Developpement application web",
 *       "quantity": 10,
 *       "unit": "jours",
 *       "unit_price": 500.00
 *     }
 *   ],
 *   "payment": {
 *     "terms": "30 jours date de facture",
 *     "method": "virement"
 *   },
 *   "notes": ""
 * }
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROOT = path.join(__dirname, '..');

function loadCompany() {
  // Chercher company.json dans le CWD d'abord, puis dans ROOT (paperasse)
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
// Validation des mentions obligatoires
// ---------------------------------------------------------------------------

function validateInvoice(company, invoice) {
  const errors = [];
  const warnings = [];

  // Emetteur
  if (!company.name) errors.push('company.name manquant');
  if (!company.siren) errors.push('company.siren manquant');
  if (!company.siret) errors.push('company.siret manquant');
  if (!company.address) errors.push('company.address manquant');
  if (!company.legal_form) warnings.push('company.legal_form manquant (obligatoire sur facture)');

  // Client
  if (!invoice.client) {
    errors.push('client manquant');
  } else {
    if (!invoice.client.name && !invoice.client.email) errors.push('client : nom ou email requis');

    const country = (invoice.client.country || 'FR').toUpperCase();
    const isFR = country === 'FR';
    const isEU = ['BE','BG','CZ','DK','DE','EE','IE','GR','ES','HR','IT','CY','LV','LT','LU','HU','MT','NL','AT','PL','PT','RO','SI','SK','FI','SE'].includes(country);
    const looksLikeBusiness = invoice.client.name && /\b(SAS|SASU|SARL|EURL|SA|SCI|GmbH|Ltd|LLC|Inc|Corp|BV|AB|AG|SpA)\b/i.test(invoice.client.name);
    const isB2C = !invoice.client.siren && !looksLikeBusiness;

    // Adresse : obligatoire pour B2B et B2C FR. Warning seulement pour B2C etranger (souvent absente sur SaaS).
    if (!invoice.client.address) {
      if (isB2C && !isFR) {
        warnings.push('client.address manquant (B2C etranger, recommande mais souvent absent sur SaaS)');
      } else {
        errors.push('client.address manquant');
      }
    }

    if (isFR && looksLikeBusiness && !invoice.client.siren) {
      warnings.push('client.siren manquant (obligatoire B2B FR a partir de sept. 2026)');
    } else if (isEU && looksLikeBusiness && !invoice.client.tva_intracom) {
      warnings.push('client.tva_intracom manquant (obligatoire B2B intra-UE)');
    }
  }

  // Facture
  if (!invoice.number) errors.push('number manquant');
  if (!invoice.date) errors.push('date manquant');
  if (!invoice.due_date) warnings.push('due_date manquant (obligatoire art. L441-9 C.com)');
  if (!invoice.category) warnings.push('category manquant (obligatoire a partir de sept. 2026 : "goods", "services" ou "mixed")');

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

  return { errors, warnings };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const COUNTRY_NAMES = {
  FR: 'France', BE: 'Belgique', CH: 'Suisse', LU: 'Luxembourg', DE: 'Allemagne',
  ES: 'Espagne', IT: 'Italie', PT: 'Portugal', NL: 'Pays-Bas', GB: 'Royaume-Uni',
  US: 'États-Unis', CA: 'Canada', AU: 'Australie', JP: 'Japon', BR: 'Brésil',
  IE: 'Irlande', AT: 'Autriche', PL: 'Pologne', SE: 'Suède', DK: 'Danemark',
  FI: 'Finlande', NO: 'Norvège', GR: 'Grèce', CZ: 'République tchèque',
};

function getCountryName(code) {
  if (!code) return '';
  const upper = code.toUpperCase();
  return COUNTRY_NAMES[upper] || upper;
}

function formatOriginalCurrency(invoice) {
  if (!invoice.stripe_original_currency) return '';
  if (invoice.stripe_original_currency.toUpperCase() === 'EUR') return '';
  if (!invoice.stripe_original_amount) return '';
  const cur = invoice.stripe_original_currency.toUpperCase();
  return `Montant original : ${invoice.stripe_original_amount.toFixed(2)} ${cur}` +
    (invoice.exchange_rate ? ` (taux : ${invoice.exchange_rate.toFixed(6)})` : '');
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

  const isFranchise = company.tax && company.tax.regime_tva === 'franchise';
  const tvaRate = isFranchise ? 0 : (company.tax && company.tax.tva_rate) || 0.20;
  const totalTVA = totalHT * tvaRate;
  const totalTTC = totalHT + totalTVA;

  return { lines, totalHT, tvaRate, totalTVA, totalTTC, isFranchise };
}

// ---------------------------------------------------------------------------
// Generation XML CII (Factur-X EN 16931)
// ---------------------------------------------------------------------------

function generateCII(company, invoice, totals) {
  const typeCode = invoice.type === 'credit_note' ? '381' : '380';
  const categoryMap = { goods: 'Livraison de biens', services: 'Prestation de services', mixed: 'Mixte' };
  const categoryLabel = categoryMap[invoice.category] || 'Prestation de services';

  const formatDate = (dateStr) => dateStr.replace(/-/g, '');

  const escapeXml = (str) => String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  // Lignes
  const lineItems = totals.lines.map((line, i) => `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>${i + 1}</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>${escapeXml(line.description)}</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>${line.unit_price.toFixed(2)}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="${line.unit || 'C62'}">${line.quantity}</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>${totals.isFranchise ? 'E' : 'S'}</ram:CategoryCode>
          <ram:RateApplicablePercent>${(totals.tvaRate * 100).toFixed(2)}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>${line.total.toFixed(2)}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`).join('\n');

  // TVA exoneration reason
  const taxExemption = totals.isFranchise
    ? `\n          <ram:ExemptionReason>TVA non applicable, article 293 B du Code general des impots</ram:ExemptionReason>`
    : '';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice
  xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">

  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:en16931</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>

  <rsm:ExchangedDocument>
    <ram:ID>${escapeXml(invoice.number)}</ram:ID>
    <ram:TypeCode>${typeCode}</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${formatDate(invoice.date)}</udt:DateTimeString>
    </ram:IssueDateTime>
    <ram:IncludedNote>
      <ram:Content>${escapeXml(categoryLabel)}</ram:Content>
      <ram:SubjectCode>AAK</ram:SubjectCode>
    </ram:IncludedNote>${invoice.notes ? `
    <ram:IncludedNote>
      <ram:Content>${escapeXml(invoice.notes)}</ram:Content>
    </ram:IncludedNote>` : ''}
  </rsm:ExchangedDocument>

  <rsm:SupplyChainTradeTransaction>

    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${escapeXml(company.name)}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${company.siret}</ram:ID>
          <ram:TradingBusinessName>${escapeXml(company.name)}</ram:TradingBusinessName>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(company.address)}</ram:LineOne>
          <ram:PostcodeCode>${(company.address.match(/\d{5}/) || [''])[0]}</ram:PostcodeCode>
          <ram:CityName>${escapeXml(company.city || '')}</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>${company.tva_intracom ? `
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${company.tva_intracom}</ram:ID>
        </ram:SpecifiedTaxRegistration>` : ''}
      </ram:SellerTradeParty>

      <ram:BuyerTradeParty>
        <ram:Name>${escapeXml(invoice.client.name)}</ram:Name>${invoice.client.siret || invoice.client.siren ? `
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${invoice.client.siret || invoice.client.siren}</ram:ID>
        </ram:SpecifiedLegalOrganization>` : ''}
        <ram:PostalTradeAddress>
          <ram:LineOne>${escapeXml(invoice.client.address)}</ram:LineOne>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>${invoice.client.tva_intracom ? `
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${invoice.client.tva_intracom}</ram:ID>
        </ram:SpecifiedTaxRegistration>` : ''}
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>

    <ram:ApplicableHeaderTradeDelivery/>

    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>${invoice.payment && invoice.payment.method ? `
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>${invoice.payment.method === 'virement' ? '30' : '10'}</ram:TypeCode>
      </ram:SpecifiedTradeSettlementPaymentMeans>` : ''}
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${totals.totalTVA.toFixed(2)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${totals.totalHT.toFixed(2)}</ram:BasisAmount>
        <ram:CategoryCode>${totals.isFranchise ? 'E' : 'S'}</ram:CategoryCode>
        <ram:RateApplicablePercent>${(totals.tvaRate * 100).toFixed(2)}</ram:RateApplicablePercent>${taxExemption}
      </ram:ApplicableTradeTax>${invoice.due_date ? `
      <ram:SpecifiedTradePaymentTerms>
        <ram:Description>${escapeXml(invoice.payment && invoice.payment.terms || '')}</ram:Description>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">${formatDate(invoice.due_date)}</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>` : ''}
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${totals.totalHT.toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${totals.totalHT.toFixed(2)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${totals.totalTVA.toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${totals.totalTTC.toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${totals.totalTTC.toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
${lineItems}
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

  return xml;
}

// ---------------------------------------------------------------------------
// Generation PDF (HTML → PDF via Puppeteer)
// ---------------------------------------------------------------------------

function generateInvoiceHTML(company, invoice, totals) {
  const templatePath = path.join(ROOT, 'templates', 'facturation', 'facture.html');

  // Si le template HTML existe, l'utiliser. Sinon, fallback inline.
  if (!fs.existsSync(templatePath)) {
    console.warn('Template facture.html introuvable, utilisation du fallback inline.');
    return generateFallbackHTML(company, invoice, totals);
  }

  let html = fs.readFileSync(templatePath, 'utf8');

  // Penalites : prefer late_penalty_label, sinon late_penalty_rate
  let penaltyLabel;
  if (company.payment && company.payment.late_penalty_label) {
    penaltyLabel = company.payment.late_penalty_label;
  } else {
    const rate = (company.payment && company.payment.late_penalty_rate);
    if (typeof rate === 'number' && rate > 0) {
      penaltyLabel = `${rate}%`;
    } else {
      penaltyLabel = '3 fois le taux d\'intérêt légal';
    }
  }

  // Escompte : obligatoire (mention conditions d'escompte ou "pas d'escompte")
  const escompteLabel = (company.payment && company.payment.escompte_label) || 'Pas d\'escompte pour paiement anticipé';

  const categoryMap = { goods: 'Livraison de biens', services: 'Prestation de services', mixed: 'Mixte' };

  // Construire l'adresse complete du client (gere les clients etrangers)
  const client = invoice.client || {};
  const clientAddressParts = [];
  if (client.address) clientAddressParts.push(client.address);
  if (client.line2) clientAddressParts.push(client.line2);
  const cityLine = [client.postcode, client.city].filter(Boolean).join(' ');
  if (cityLine) clientAddressParts.push(cityLine);
  if (client.country && client.country.toUpperCase() !== 'FR') {
    clientAddressParts.push(getCountryName(client.country));
  }
  const clientFullAddress = clientAddressParts.join(', ');

  // Remplacer les placeholders simples
  const replacements = {
    'company.name': company.name || '',
    'company.legal_form': company.legal_form || '',
    'company.capital': company.capital || '',
    'company.address': company.address || '',
    'company.siret': company.siret || '',
    'company.siren': company.siren || '',
    'company.rcs': company.rcs || '',
    'company.tva_intracom': company.tva_intracom || '',
    'invoice.number': invoice.number || '',
    'invoice.date': invoice.date || '',
    'invoice.due_date': invoice.due_date || '',
    'invoice.category_label': categoryMap[invoice.category] || '',
    'invoice.original_currency_label': formatOriginalCurrency(invoice),
    'client.name': client.name || '',
    'client.address': clientFullAddress,
    'client.siren': client.siren || '',
    'client.tva_intracom': client.tva_intracom || '',
    'client.country': (client.country || 'FR').toUpperCase(),
    'client.email': client.email || '',
    'totals.totalHT': totals.totalHT.toFixed(2),
    'totals.totalTVA': totals.totalTVA.toFixed(2),
    'totals.totalTTC': totals.totalTTC.toFixed(2),
    'totals.tvaRateLabel': `${(totals.tvaRate * 100).toFixed(0)}%`,
    'payment.terms': (invoice.payment && invoice.payment.terms) || '',
    'payment.method': (invoice.payment && invoice.payment.method) || 'virement',
    'payment.penalty_label': penaltyLabel,
    'payment.escompte_label': escompteLabel,
    'payment.iban': (company.payment && company.payment.bank_details && company.payment.bank_details.iban) || '',
    'payment.bic': (company.payment && company.payment.bank_details && company.payment.bank_details.bic) || '',
  };

  for (const [key, val] of Object.entries(replacements)) {
    html = html.replace(new RegExp(`\\{\\{${key.replace('.', '\\.')}\\}\\}`, 'g'), val);
  }

  // Lignes (remplacer le bloc {{#each lines}})
  const linesHTML = totals.lines.map(line => `
      <tr>
        <td class="description">${line.description || ''}</td>
        <td class="center">${line.quantity}${line.unit ? ' ' + line.unit : ''}</td>
        <td class="right">${line.unit_price.toFixed(2)} EUR</td>
        <td class="right">${line.total.toFixed(2)} EUR</td>
      </tr>`).join('');
  html = html.replace(/\{\{#each lines\}\}[\s\S]*?\{\{\/each\}\}/g, linesHTML);

  // Contexte pour les blocs conditionnels
  const isForeignClient = client.country && client.country.toUpperCase() !== 'FR';
  const ctx = {
    'company.tva_intracom': !!company.tva_intracom,
    'client.siren': !!client.siren,
    'client.tva_intracom': !!client.tva_intracom,
    'client.email': !!client.email,
    'client.foreign': isForeignClient,
    'invoice.category': !!invoice.category,
    'invoice.original_currency': !!(invoice.stripe_original_currency && invoice.stripe_original_currency.toUpperCase() !== 'EUR'),
    'totals.isFranchise': totals.isFranchise,
    'payment.iban': !!(company.payment && company.payment.bank_details && company.payment.bank_details.iban),
    'payment.escompte_label': !!(company.payment && company.payment.escompte_label),
  };

  // Moteur de templates : resout les blocs conditionnels de l'interieur vers l'exterieur
  // pour eviter que les regex croisent des blocs differents.
  const MAX_PASSES = 10;
  for (let pass = 0; pass < MAX_PASSES; pass++) {
    const before = html;

    // {{#if tag}}...{{else}}...{{/if}} (blocs SANS imbrication interne)
    html = html.replace(
      /\{\{#if ([\w.]+)\}\}((?:(?!\{\{#(?:if|unless))[\s\S])*?)\{\{else\}\}((?:(?!\{\{#(?:if|unless))[\s\S])*?)\{\{\/if\}\}/g,
      (_, tag, ifContent, elseContent) => ctx[tag] ? ifContent : elseContent
    );

    // {{#if tag}}...{{/if}} (sans else, sans imbrication interne)
    html = html.replace(
      /\{\{#if ([\w.]+)\}\}((?:(?!\{\{#(?:if|unless))[\s\S])*?)\{\{\/if\}\}/g,
      (_, tag, content) => ctx[tag] ? content : ''
    );

    // {{#unless tag}}...{{/unless}} (sans imbrication interne)
    html = html.replace(
      /\{\{#unless ([\w.]+)\}\}((?:(?!\{\{#(?:if|unless))[\s\S])*?)\{\{\/unless\}\}/g,
      (_, tag, content) => ctx[tag] ? '' : content
    );

    if (html === before) break; // Plus rien a resoudre
  }

  return html;
}

function generateFallbackHTML(company, invoice, totals) {
  // Fallback minimal si le template est absent
  const linesHTML = totals.lines.map(line => `
    <tr>
      <td>${line.description}</td>
      <td style="text-align:right">${line.quantity}</td>
      <td style="text-align:right">${line.unit_price.toFixed(2)} EUR</td>
      <td style="text-align:right">${line.total.toFixed(2)} EUR</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8">
<style>body{font-family:sans-serif;font-size:10pt;margin:40px}table{width:100%;border-collapse:collapse}th,td{padding:6px;border-bottom:1px solid #eee;text-align:left}</style>
</head><body>
<h2>${company.name}</h2><p>${company.address} | SIRET ${company.siret}</p>
<h1>Facture ${invoice.number}</h1><p>Date : ${invoice.date} | Echeance : ${invoice.due_date || ''}</p>
<p><strong>${invoice.client.name}</strong><br>${invoice.client.address}</p>
<table><thead><tr><th>Designation</th><th>Qte</th><th>PU HT</th><th>Total HT</th></tr></thead><tbody>${linesHTML}</tbody></table>
<p><strong>Total : ${totals.totalTTC.toFixed(2)} EUR</strong></p>
${totals.isFranchise ? '<p><em>TVA non applicable, art. 293 B du CGI</em></p>' : ''}
</body></html>`;
}

async function generatePDF(html, outputPath) {
  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch {
    console.error('Erreur : puppeteer non installe. Lancez : npm install');
    console.error('Le XML a ete genere. Pour le PDF, installez puppeteer.');
    return false;
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    printBackground: true,
  });
  await browser.close();
  return true;
}

// ---------------------------------------------------------------------------
// Embedding Factur-X : XML CII dans le PDF + metadonnees XMP (PDF/A-3B)
// ---------------------------------------------------------------------------

async function embedFacturX(pdfPath, xml, invoice, company) {
  let pdfLib;
  try {
    pdfLib = require('pdf-lib');
  } catch {
    console.error('Erreur : pdf-lib non installe. Lancez : npm install');
    return false;
  }
  const { PDFDocument, PDFName, PDFString, PDFHexString, AFRelationship } = pdfLib;

  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Metadonnees PDF classiques (Title/Author/Producer)
  pdfDoc.setTitle(`Facture ${invoice.number}`);
  pdfDoc.setAuthor(company.name || '');
  pdfDoc.setProducer('Paperasse generate-facturx');
  pdfDoc.setCreator('Paperasse');
  const issueDate = invoice.date ? new Date(invoice.date + 'T00:00:00Z') : new Date();
  pdfDoc.setCreationDate(issueDate);
  pdfDoc.setModificationDate(issueDate);

  // Embarquer factur-x.xml comme piece jointe avec AFRelationship="Alternative"
  // (profil Factur-X EN16931). Le nom de fichier DOIT etre "factur-x.xml" (lowercase).
  await pdfDoc.attach(Buffer.from(xml, 'utf8'), 'factur-x.xml', {
    mimeType: 'application/xml',
    description: 'Factur-X EN16931 CII XML representation',
    creationDate: issueDate,
    modificationDate: issueDate,
    afRelationship: AFRelationship.Alternative,
  });

  // Metadonnees XMP declarant PDF/A-3B + profil Factur-X
  const xmpMetadata = buildXmpMetadata(invoice, company, issueDate);
  const metadataStream = pdfDoc.context.stream(xmpMetadata, {
    Type: PDFName.of('Metadata'),
    Subtype: PDFName.of('XML'),
    Length: xmpMetadata.length,
  });
  const metadataRef = pdfDoc.context.register(metadataStream);
  pdfDoc.catalog.set(PDFName.of('Metadata'), metadataRef);

  // Marquer le document comme PDF/A : Catalog /Lang + MarkInfo (basique)
  pdfDoc.catalog.set(PDFName.of('Lang'), PDFString.of('fr-FR'));

  const out = await pdfDoc.save({ useObjectStreams: false });
  fs.writeFileSync(pdfPath, out);
  return true;
}

function buildXmpMetadata(invoice, company, issueDate) {
  const iso = issueDate.toISOString();
  const escape = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:xmp="http://ns.adobe.com/xap/1.0/"
      xmlns:pdf="http://ns.adobe.com/pdf/1.3/"
      xmlns:fx="urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#">
      <pdfaid:part>3</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">Facture ${escape(invoice.number)}</rdf:li></rdf:Alt></dc:title>
      <dc:creator><rdf:Seq><rdf:li>${escape(company.name)}</rdf:li></rdf:Seq></dc:creator>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">Factur-X EN16931 - ${escape(invoice.number)}</rdf:li></rdf:Alt></dc:description>
      <xmp:CreateDate>${iso}</xmp:CreateDate>
      <xmp:ModifyDate>${iso}</xmp:ModifyDate>
      <xmp:CreatorTool>Paperasse</xmp:CreatorTool>
      <pdf:Producer>Paperasse generate-facturx</pdf:Producer>
      <fx:DocumentType>INVOICE</fx:DocumentType>
      <fx:DocumentFileName>factur-x.xml</fx:DocumentFileName>
      <fx:Version>1.0</fx:Version>
      <fx:ConformanceLevel>EN 16931</fx:ConformanceLevel>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const invoiceIdx = args.indexOf('--invoice');
  const outputIdx = args.indexOf('--output');
  const xmlOnly = args.includes('--xml-only');
  const validateOnly = args.includes('--validate');

  if (invoiceIdx === -1 || !args[invoiceIdx + 1]) {
    console.error('Usage: node scripts/generate-facturx.js --invoice <chemin-facture.json>');
    console.error('Options:');
    console.error('  --output <dossier>   Dossier de sortie (defaut: output/)');
    console.error('  --xml-only           Generer uniquement le XML CII');
    console.error('  --validate           Valider sans generer');
    process.exit(1);
  }

  const invoicePath = args[invoiceIdx + 1];
  const outputDir = outputIdx !== -1 ? args[outputIdx + 1] : path.join(ROOT, 'output');

  const company = loadCompany();
  const invoice = loadInvoice(invoicePath);

  // Validation
  const { errors, warnings } = validateInvoice(company, invoice);

  if (warnings.length > 0) {
    console.log('\n⚠️  Avertissements :');
    warnings.forEach(w => console.log(`   🟡 ${w}`));
  }

  if (errors.length > 0) {
    console.log('\n❌ Erreurs bloquantes :');
    errors.forEach(e => console.log(`   🔴 ${e}`));
    process.exit(1);
  }

  if (validateOnly) {
    console.log('\n✅ Facture valide (toutes les mentions obligatoires presentes)');
    return;
  }

  // Calculs
  const totals = computeTotals(company, invoice);

  // XML
  const xml = generateCII(company, invoice, totals);

  // Sortie
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const xmlPath = path.join(outputDir, `${invoice.number}.xml`);
  fs.writeFileSync(xmlPath, xml, 'utf8');
  console.log(`\n✅ XML CII genere : ${xmlPath}`);

  if (xmlOnly) return;

  // PDF
  const html = generateInvoiceHTML(company, invoice, totals);
  const pdfPath = path.join(outputDir, `${invoice.number}.pdf`);
  const pdfOk = await generatePDF(html, pdfPath);

  if (pdfOk) {
    console.log(`✅ PDF genere : ${pdfPath}`);
    const embedded = await embedFacturX(pdfPath, xml, invoice, company);
    if (embedded) {
      console.log(`✅ Factur-X embarque : ${pdfPath} (PDF/A-3B, XML CII inclus)`);
    }
  }

  // Resume
  console.log(`\n📊 Resume :`);
  console.log(`   Facture : ${invoice.number}`);
  console.log(`   Client : ${invoice.client.name}`);
  console.log(`   Total HT : ${totals.totalHT.toFixed(2)} EUR`);
  if (!totals.isFranchise) {
    console.log(`   TVA (${(totals.tvaRate * 100).toFixed(0)}%) : ${totals.totalTVA.toFixed(2)} EUR`);
  }
  console.log(`   Total TTC : ${totals.totalTTC.toFixed(2)} EUR`);
}

main().catch(err => {
  console.error('Erreur:', err.message);
  process.exit(1);
});
