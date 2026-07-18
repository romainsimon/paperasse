#!/usr/bin/env node

/**
 * Tests de parse-einvoice.js
 *
 * 1. Round-trip : une facture generee par generate-facturx.js (--xml-only)
 *    est relue par parse-einvoice.js — les donnees doivent correspondre.
 *    Couvre les deux regimes : TVA 20% (S) et franchise en base (E).
 * 2. Fixture avec remise : une ligne CII portant GrossPriceProductTradePrice
 *    (prix catalogue) AVANT NetPriceProductTradePrice (prix net) — le parseur
 *    doit retourner le prix net, pas le brut.
 *
 * Usage : npm run test:parse
 */

"use strict";

const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const GENERATE_SCRIPT = path.join(ROOT, "scripts", "generate-facturx.js");
const PARSE_SCRIPT = path.join(ROOT, "scripts", "parse-einvoice.js");

function parseInvoice(xmlPath) {
  const output = execFileSync(process.execPath, [PARSE_SCRIPT, "--invoice", xmlPath, "--json"], {
    encoding: "utf8",
  });
  return JSON.parse(output);
}

// Dossiers temporaires crees par les tests — supprimes en fin de run.
const TMP_DIRS = [];

function mkTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "paperasse-test-"));
  TMP_DIRS.push(dir);
  return dir;
}

// Genere le XML CII dans un dossier temporaire contenant son propre
// company.json (generate-facturx.js cherche company.json dans le CWD d'abord).
function generateXml(company, invoice) {
  const tmpDir = mkTmpDir();
  fs.writeFileSync(path.join(tmpDir, "company.json"), JSON.stringify(company, null, 2));
  const invoicePath = path.join(tmpDir, `${invoice.number}.json`);
  fs.writeFileSync(invoicePath, JSON.stringify(invoice, null, 2));
  execFileSync(
    process.execPath,
    [GENERATE_SCRIPT, "--invoice", invoicePath, "--xml-only", "--output", tmpDir],
    { cwd: tmpDir, encoding: "utf8" }
  );
  return path.join(tmpDir, `${invoice.number}.xml`);
}

const baseCompany = {
  name: "TEST COMPANY SASU",
  legal_form: "SASU",
  siren: "123456789",
  siret: "12345678900014",
  address: "1 Rue de la Paix, 75001 Paris",
  city: "Paris",
  tva_intracom: "FR32123456789",
  tax: { regime_tva: "reel_simplifie", tva_rate: 0.2 },
};

const baseInvoice = {
  number: "F-TEST-001",
  date: "2026-01-15",
  due_date: "2026-02-14",
  type: "invoice",
  category: "services",
  client: {
    name: "CLIENT EXEMPLE SARL",
    address: "10 rue Example, 75001 Paris",
    country: "FR",
    siren: "987654321",
  },
  lines: [
    { description: "Developpement", quantity: 3, unit: "DAY", unit_price: 500 },
    { description: "Licence logicielle", quantity: 2, unit_price: 120 },
  ],
  payment: { terms: "30 jours date de facture", method: "virement" },
};

function testRoundTripTva20() {
  const xmlPath = generateXml(baseCompany, baseInvoice);
  const parsed = parseInvoice(xmlPath);

  assert.strictEqual(parsed.number, "F-TEST-001");
  assert.strictEqual(parsed.date, "2026-01-15");
  assert.strictEqual(parsed.due_date, "2026-02-14");
  assert.strictEqual(parsed.type, "invoice");
  assert.strictEqual(parsed.category, "services");

  assert.strictEqual(parsed.seller.name, "TEST COMPANY SASU");
  assert.strictEqual(parsed.seller.siret, "12345678900014");
  assert.strictEqual(parsed.seller.tva_intracom, "FR32123456789");

  assert.strictEqual(parsed.client.name, "CLIENT EXEMPLE SARL");
  assert.strictEqual(parsed.client.siren, "987654321");
  assert.strictEqual(parsed.client.siret, undefined);

  // HT = 3 x 500 + 2 x 120 = 1740 ; TVA 20% = 348 ; TTC = 2088
  assert.strictEqual(parsed.totals.ht, 1740);
  assert.strictEqual(parsed.totals.tva, 348);
  assert.strictEqual(parsed.totals.ttc, 2088);
  assert.strictEqual(parsed.totals.tva_rate, 0.2);
  assert.strictEqual(parsed.totals.tva_exempt, false);

  assert.strictEqual(parsed.tax_breakdown.length, 1);
  assert.strictEqual(parsed.tax_breakdown[0].category_code, "S");
  assert.strictEqual(parsed.tax_breakdown[0].rate, 0.2);
  assert.strictEqual(parsed.tax_breakdown[0].basis_amount, 1740);
  assert.strictEqual(parsed.tax_breakdown[0].tax_amount, 348);

  assert.strictEqual(parsed.lines.length, 2);
  assert.strictEqual(parsed.lines[0].description, "Developpement");
  assert.strictEqual(parsed.lines[0].quantity, 3);
  assert.strictEqual(parsed.lines[0].unit, "DAY");
  assert.strictEqual(parsed.lines[0].unit_price, 500);
  assert.strictEqual(parsed.lines[0].total, 1500);
  assert.strictEqual(parsed.lines[1].description, "Licence logicielle");
  assert.strictEqual(parsed.lines[1].unit, undefined); // C62 omis
  assert.strictEqual(parsed.lines[1].unit_price, 120);
  assert.strictEqual(parsed.lines[1].total, 240);

  assert.strictEqual(parsed.payment.terms, "30 jours date de facture");
}

function testRoundTripFranchise() {
  const company = { ...baseCompany, tax: { regime_tva: "franchise" } };
  const invoice = { ...baseInvoice, number: "F-TEST-002" };
  const xmlPath = generateXml(company, invoice);
  const parsed = parseInvoice(xmlPath);

  assert.strictEqual(parsed.totals.ht, 1740);
  assert.strictEqual(parsed.totals.tva, 0);
  assert.strictEqual(parsed.totals.ttc, 1740);
  assert.strictEqual(parsed.totals.tva_exempt, true);
  assert.strictEqual("tva_rate" in parsed.totals, false); // aucune ligne S

  assert.strictEqual(parsed.tax_breakdown.length, 1);
  assert.strictEqual(parsed.tax_breakdown[0].category_code, "E");
  assert.match(parsed.tax_breakdown[0].exemption_reason, /article 293 B/);
}

// Ligne avec remise : le prix brut (GrossPriceProductTradePrice, 120.00)
// precede le prix net (NetPriceProductTradePrice, 100.00) comme dans les
// Factur-X reels. Le parseur doit retourner le net.
const FIXTURE_DISCOUNT_LINE = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice
  xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocument>
    <ram:ID>F-REMISE-001</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">20260115</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>VENDEUR SAS</ram:Name>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>ACHETEUR SARL</ram:Name>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>40.00</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>200.00</ram:BasisAmount>
        <ram:CategoryCode>S</ram:CategoryCode>
        <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>
      </ram:ApplicableTradeTax>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:TaxBasisTotalAmount>200.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">40.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:SpecifiedTradeProduct>
        <ram:Name>Prestation avec remise</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:GrossPriceProductTradePrice>
          <ram:ChargeAmount>120.00</ram:ChargeAmount>
          <ram:AppliedTradeAllowanceCharge>
            <ram:ChargeIndicator><udt:Indicator>false</udt:Indicator></ram:ChargeIndicator>
            <ram:ActualAmount>20.00</ram:ActualAmount>
          </ram:AppliedTradeAllowanceCharge>
        </ram:GrossPriceProductTradePrice>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>100.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">2</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>200.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`;

function testUnitPriceIsNetNotGross() {
  const tmpDir = mkTmpDir();
  const xmlPath = path.join(tmpDir, "F-REMISE-001.xml");
  fs.writeFileSync(xmlPath, FIXTURE_DISCOUNT_LINE);
  const parsed = parseInvoice(xmlPath);

  assert.strictEqual(parsed.lines.length, 1);
  assert.strictEqual(parsed.lines[0].unit_price, 100); // net, pas le brut 120
  assert.strictEqual(parsed.lines[0].quantity, 2);
  assert.strictEqual(parsed.lines[0].total, 200);
  assert.strictEqual(parsed.totals.ttc, 240);
}

function main() {
  try {
    testRoundTripTva20();
    testRoundTripFranchise();
    testUnitPriceIsNetNotGross();
  } finally {
    TMP_DIRS.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  }
  console.log("parse-einvoice tests passed.");
}

main();
