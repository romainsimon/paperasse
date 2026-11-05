#!/usr/bin/env node

/**
 * Tests de parse-einvoice.js
 *
 * 1. Round-trip : une facture generee par generate-facturx.js (--xml-only)
 *    est relue par parse-einvoice.js — les donnees doivent correspondre.
 *    Couvre les deux regimes : TVA 20% (S) et franchise en base (E).
 * 2. Lecture d'une fixture CII conforme EN 16931 (lignes en premier, comme
 *    dans le schema reel) : prix net et non prix brut, n° de TVA cherche dans
 *    tous les blocs SpecifiedTaxRegistration, decodage XML.
 * 3. Refus : chaque controle bloquant du parseur a un test qui le declenche
 *    (profil, date, decimal, rapprochements, champ obligatoire absent).
 *    Ces tests assertent le code de sortie non nul ET l'identifiant d'erreur.
 * 4. Lecture du XML : contenu non textuel (commentaire, instruction de
 *    traitement, CDATA, DOCTYPE/ENTITY), devise hors ISO 4217, entites
 *    numeriques et plafond de taille. Un cas par refus.
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

// Parse une facture attendue conforme. Leve si le parseur la refuse.
function parseInvoice(xmlPath) {
  const output = execFileSync(process.execPath, [PARSE_SCRIPT, "--invoice", xmlPath, "--json"], {
    encoding: "utf8",
  });
  return JSON.parse(output);
}

// Parse une facture attendue non conforme. Retourne la liste des erreurs.
function parseExpectingErrors(xmlPath) {
  try {
    execFileSync(process.execPath, [PARSE_SCRIPT, "--invoice", xmlPath, "--json"], { encoding: "utf8" });
  } catch (err) {
    assert.strictEqual(err.status, 1, "le parseur doit sortir en code 1");
    const payload = JSON.parse(err.stdout);
    assert.strictEqual(payload.ok, false);
    return payload.errors;
  }
  throw new assert.AssertionError({ message: `${path.basename(xmlPath)} aurait du etre refusee` });
}

// Refus prononce AVANT le parsing : le script ecrit sur stderr et sort en 1
// sans emettre de JSON. parseExpectingErrors ne convient donc pas.
function parseExpectingRejection(xmlPath, messageRe) {
  try {
    execFileSync(process.execPath, [PARSE_SCRIPT, "--invoice", xmlPath, "--json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    assert.strictEqual(err.status, 1, "le parseur doit sortir en code 1");
    assert.match(err.stderr, messageRe);
    return;
  }
  throw new assert.AssertionError({ message: `${path.basename(xmlPath)} aurait du etre refusee` });
}

function assertHasError(errors, id) {
  const ids = errors.map((e) => e.id);
  assert.ok(ids.includes(id), `erreur ${id} attendue, recu : ${ids.join(", ") || "aucune"}`);
}

// Dossiers temporaires crees par les tests — supprimes en fin de run.
const TMP_DIRS = [];

function mkTmpDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "paperasse-test-"));
  TMP_DIRS.push(dir);
  return dir;
}

function writeFixture(name, xml) {
  const xmlPath = path.join(mkTmpDir(), `${name}.xml`);
  fs.writeFileSync(xmlPath, xml);
  return xmlPath;
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
  assert.strictEqual(parsed.totals.due_payable, 2088);
  assert.strictEqual(parsed.totals.tva_rate, 0.2);
  assert.strictEqual(parsed.totals.has_untaxed_category, false);

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
  assert.strictEqual(parsed.totals.due_payable, 1740);
  assert.strictEqual(parsed.totals.has_untaxed_category, true);
  assert.strictEqual("tva_rate" in parsed.totals, false); // aucune ligne S

  assert.strictEqual(parsed.tax_breakdown.length, 1);
  assert.strictEqual(parsed.tax_breakdown[0].category_code, "E");
  assert.match(parsed.tax_breakdown[0].exemption_reason, /article 293 B/);
}

// Fixture CII conforme EN 16931, dans l'ordre du schema reel (lignes AVANT
// l'accord et le reglement, contrairement a ce que produit generate-facturx.js).
// Elle porte volontairement :
//   - une ligne avec remise : prix brut 120.00 puis prix net 100.00 ;
//   - deux SpecifiedTaxRegistration cote vendeur, le bloc "VA" en second.
// Totaux : 2 x 100 = 200 HT, TVA 20% = 40, TTC = 240, a payer = 240.
const VALID_CII = `<?xml version="1.0" encoding="UTF-8"?>
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
    <ram:ID>F-REMISE-001</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">20260115</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>1</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
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
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>S</ram:CategoryCode>
          <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>200.00</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>VENDEUR SAS</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">12345678900014</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>1 Rue de la Paix</ram:LineOne>
          <ram:PostcodeCode>75001</ram:PostcodeCode>
          <ram:CityName>Paris</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="FC">7501234567</ram:ID>
        </ram:SpecifiedTaxRegistration>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">FR32123456789</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>ACHETEUR SARL</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">987654321</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>10 rue Example</ram:LineOne>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery/>
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
        <ram:LineTotalAmount>200.00</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>200.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">40.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>
        <ram:DuePayableAmount>240.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
`;

// Remplace un ou plusieurs fragments de la fixture conforme, en verifiant que
// chaque fragment existait : sans ce garde-fou, un test de refus pourrait
// passer alors qu'il n'a rien mute.
function mutate(...replacements) {
  return replacements.reduce((xml, [search, replacement]) => {
    assert.ok(xml.includes(search), `fragment absent de la fixture : ${search}`);
    return xml.replace(search, replacement);
  }, VALID_CII);
}

function testValidFixtureIsAccepted() {
  const parsed = parseInvoice(writeFixture("F-REMISE-001", VALID_CII));

  assert.strictEqual(parsed.number, "F-REMISE-001");
  assert.strictEqual(parsed.date, "2026-01-15");
  assert.strictEqual(parsed.lines.length, 1);
  assert.strictEqual(parsed.lines[0].unit_price, 100); // net, pas le brut 120
  assert.strictEqual(parsed.lines[0].quantity, 2);
  assert.strictEqual(parsed.lines[0].total, 200);
  assert.strictEqual(parsed.totals.ttc, 240);
  assert.strictEqual(parsed.totals.due_payable, 240);
  assert.strictEqual(parsed.client.siren, "987654321");
  // Le bloc VA est le second : il doit quand meme etre trouve.
  assert.strictEqual(parsed.seller.tva_intracom, "FR32123456789");
}

// Les prefixes de namespace ne sont pas normatifs : certains emetteurs
// declarent CrossIndustryInvoice dans le namespace par defaut et n'ecrivent
// donc pas le prefixe rsm:. Le meme document doit se lire a l'identique.
function testDefaultNamespaceIsAccepted() {
  const xml = VALID_CII.replace("xmlns:rsm=", "xmlns=").replace(/rsm:/g, "");
  const parsed = parseInvoice(writeFixture("F-NS-DEFAUT", xml));

  assert.strictEqual(parsed.number, "F-REMISE-001");
  assert.strictEqual(parsed.lines.length, 1);
  assert.strictEqual(parsed.lines[0].unit_price, 100);
  assert.strictEqual(parsed.totals.ttc, 240);
  assert.strictEqual(parsed.totals.due_payable, 240);
}

function testPriceFallsBackToNothingWithoutNetPrice() {
  const xml = mutate([
    `        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>100.00</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
`,
    "",
  ]);
  // Sans prix net, le parseur doit refuser la ligne et surtout ne pas retomber
  // sur le prix brut (120.00) du bloc GrossPriceProductTradePrice.
  assertHasError(parseExpectingErrors(writeFixture("F-SANS-PRIX-NET", xml)), "BT-146_1_MISSING");
}

function testXmlEntitiesAreDecodedOnce() {
  const xml = mutate(["<ram:Name>VENDEUR SAS</ram:Name>", "<ram:Name>DUPONT &amp;lt;FILS&amp;gt;</ram:Name>"]);
  const parsed = parseInvoice(writeFixture("F-ENTITES", xml));
  // &amp;lt; se decode en &lt; — pas en < (double decodage).
  assert.strictEqual(parsed.seller.name, "DUPONT &lt;FILS&gt;");
}

function testProfileBasicWlIsRejected() {
  const xml = mutate([
    "urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:en16931",
    "urn:factur-x.eu:1p0:basicwl",
  ]);
  assertHasError(parseExpectingErrors(writeFixture("F-BASICWL", xml)), "BT-24_PROFILE");
}

function testImpossibleCalendarDateIsRejected() {
  const xml = mutate([">20260115<", ">20260231<"]); // 31 fevrier
  assertHasError(parseExpectingErrors(writeFixture("F-DATE-KO", xml)), "BT-2_INVALID");
}

// Date tronquee : les 8 chiffres du format 102 ne sont pas la, mais un decoupage
// naif y verrait quand meme une date valide (2026-01-1).
function testTruncatedDateIsRejected() {
  const xml = mutate([">20260115<", ">2026011<"]);
  assertHasError(parseExpectingErrors(writeFixture("F-DATE-COURTE", xml)), "BT-2_INVALID");
}

function testMalformedDecimalIsRejected() {
  const xml = mutate([
    "<ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>",
    "<ram:GrandTotalAmount>12abc</ram:GrandTotalAmount>",
  ]);
  assertHasError(parseExpectingErrors(writeFixture("F-DECIMAL-KO", xml)), "BT-112_INVALID");
}

function testTotalsMismatchIsRejected() {
  const xml = mutate([
    "<ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>",
    "<ram:GrandTotalAmount>999.00</ram:GrandTotalAmount>",
  ]);
  // 200 HT + 40 TVA ne font pas 999 TTC.
  assertHasError(parseExpectingErrors(writeFixture("F-TOTAUX-KO", xml)), "BR-CO-15");
}

function testLineSumMismatchIsRejected() {
  const xml = mutate([
    "<ram:LineTotalAmount>200.00</ram:LineTotalAmount>\n        <ram:TaxBasisTotalAmount>",
    "<ram:LineTotalAmount>150.00</ram:LineTotalAmount>\n        <ram:TaxBasisTotalAmount>",
  ]);
  // La somme des lignes vaut 200, pas 150.
  assertHasError(parseExpectingErrors(writeFixture("F-LIGNES-KO", xml)), "BR-CO-10");
}

// Facture interieurement coherente (tous les totaux s'additionnent) mais dont
// la TVA ne correspond pas au taux annonce : 200 a 20% font 40, pas 30.
// C'est le cas « ecriture plausible mais fausse ».
function testVatAmountNotMatchingRateIsRejected() {
  const xml = mutate(
    ["<ram:CalculatedAmount>40.00</ram:CalculatedAmount>", "<ram:CalculatedAmount>30.00</ram:CalculatedAmount>"],
    ['<ram:TaxTotalAmount currencyID="EUR">40.00</ram:TaxTotalAmount>', '<ram:TaxTotalAmount currencyID="EUR">30.00</ram:TaxTotalAmount>'],
    ["<ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>", "<ram:GrandTotalAmount>230.00</ram:GrandTotalAmount>"],
    ["<ram:DuePayableAmount>240.00</ram:DuePayableAmount>", "<ram:DuePayableAmount>230.00</ram:DuePayableAmount>"]
  );
  assertHasError(parseExpectingErrors(writeFixture("F-TVA-KO", xml)), "BR-S-09_1");
}

// La base declaree dans la ventilation TVA (150) ne couvre pas la base HT
// totale (200) : une partie du chiffre d'affaires echappe a la TVA.
function testVatBasisNotCoveringTaxBasisTotalIsRejected() {
  const xml = mutate(
    ["<ram:BasisAmount>200.00</ram:BasisAmount>", "<ram:BasisAmount>150.00</ram:BasisAmount>"],
    ["<ram:CalculatedAmount>40.00</ram:CalculatedAmount>", "<ram:CalculatedAmount>30.00</ram:CalculatedAmount>"],
    ['<ram:TaxTotalAmount currencyID="EUR">40.00</ram:TaxTotalAmount>', '<ram:TaxTotalAmount currencyID="EUR">30.00</ram:TaxTotalAmount>'],
    ["<ram:GrandTotalAmount>240.00</ram:GrandTotalAmount>", "<ram:GrandTotalAmount>230.00</ram:GrandTotalAmount>"],
    ["<ram:DuePayableAmount>240.00</ram:DuePayableAmount>", "<ram:DuePayableAmount>230.00</ram:DuePayableAmount>"]
  );
  assertHasError(parseExpectingErrors(writeFixture("F-BASES-KO", xml)), "COHERENCE_BASES");
}

// Un code type inconnu ne doit pas retomber silencieusement sur « facture ».
function testUnsupportedTypeCodeIsRejected() {
  const xml = mutate(["<ram:TypeCode>380</ram:TypeCode>", "<ram:TypeCode>FactureCommerciale</ram:TypeCode>"]);
  assertHasError(parseExpectingErrors(writeFixture("F-TYPE-KO", xml)), "BT-3_UNSUPPORTED");
}

// Une facture rectificative (384) reste une facture, mais son code doit
// rester lisible dans la sortie pour l'ecriture comptable.
function testCorrectiveTypeCodeIsExposed() {
  const xml = mutate(["<ram:TypeCode>380</ram:TypeCode>", "<ram:TypeCode>384</ram:TypeCode>"]);
  const parsed = parseInvoice(writeFixture("F-TYPE-384", xml));
  assert.strictEqual(parsed.type, "invoice");
  assert.strictEqual(parsed.type_code, "384");
}

// Un TypeCode heritant d'Object ne doit pas passer pour un type connu.
function testPrototypeTypeCodeIsRejected() {
  const xml = mutate(["<ram:TypeCode>380</ram:TypeCode>", "<ram:TypeCode>constructor</ram:TypeCode>"]);
  assertHasError(parseExpectingErrors(writeFixture("F-TYPE-PROTO", xml)), "BT-3_UNSUPPORTED");
}

// Un SIREN de 9 chiffres ne doit pas etre restitue dans le champ siret.
function testSellerSirenIsNotLabelledSiret() {
  const xml = mutate(['schemeID="0002">12345678900014<', 'schemeID="0002">123456789<']);
  const parsed = parseInvoice(writeFixture("F-SIREN", xml));

  assert.strictEqual(parsed.seller.siren, "123456789");
  assert.strictEqual(parsed.seller.siret, undefined);
}

function testMalformedSellerLegalIdIsRejected() {
  const xml = mutate(['schemeID="0002">12345678900014<', 'schemeID="0002">1234ABC<']);
  assertHasError(parseExpectingErrors(writeFixture("F-SIRET-KO", xml)), "BT-30_INVALID");
}

// Categorie S : le taux est obligatoire, son absence ne doit pas desactiver
// silencieusement le controle du montant de TVA.
function testStandardCategoryWithoutRateIsRejected() {
  const xml = mutate(["\n        <ram:RateApplicablePercent>20.00</ram:RateApplicablePercent>", ""]);
  assertHasError(parseExpectingErrors(writeFixture("F-TAUX-ABSENT", xml)), "BT-119_1_MISSING");
}

// Categories non taxees : BR-E-09 et ses equivalents imposent une TVA a zero.
function testExemptCategoryWithVatIsRejected() {
  // Cibler la ventilation d'en-tete : le bloc de la ligne porte lui aussi une
  // categorie S, et il apparait en premier dans la fixture.
  const xml = mutate([
    "<ram:BasisAmount>200.00</ram:BasisAmount>\n        <ram:CategoryCode>S</ram:CategoryCode>",
    "<ram:BasisAmount>200.00</ram:BasisAmount>\n        <ram:CategoryCode>E</ram:CategoryCode>",
  ]);
  assertHasError(parseExpectingErrors(writeFixture("F-EXO-TVA", xml)), "BR-CAT-09_1");
}

// xs:decimal autorise le signe : +240.00 est une valeur valide, pas un rejet.
function testSignedDecimalIsAccepted() {
  const xml = mutate(["<ram:GrandTotalAmount>240.00<", "<ram:GrandTotalAmount>+240.00<"]);
  const parsed = parseInvoice(writeFixture("F-SIGNE", xml));
  assert.strictEqual(parsed.totals.ttc, 240);
}

function testMissingDuePayableIsRejected() {
  const xml = mutate(["        <ram:DuePayableAmount>240.00</ram:DuePayableAmount>\n", ""]);
  assertHasError(parseExpectingErrors(writeFixture("F-SANS-BT115", xml)), "BT-115_MISSING");
}

function testMissingSellerNameIsRejected() {
  const xml = mutate(["<ram:Name>VENDEUR SAS</ram:Name>", ""]);
  assertHasError(parseExpectingErrors(writeFixture("F-SANS-VENDEUR", xml)), "BT-27_MISSING");
}

// Un commentaire place avant le vrai ram:ID ne doit pas etre lu comme une
// valeur : tout parseur XML — donc toute plateforme agreee — lirait la valeur
// suivante. Les commentaires sont retires avant extraction.
function testCommentIsNotReadAsContent() {
  const xml = mutate([
    "<ram:ID>F-REMISE-001</ram:ID>",
    "<!-- <ram:ID>F-FAKE-999</ram:ID> -->\n    <ram:ID>F-REMISE-001</ram:ID>",
  ]);
  const parsed = parseInvoice(writeFixture("F-COMMENTAIRE", xml));
  assert.strictEqual(parsed.number, "F-REMISE-001");
}

function testCommentedSellerNameIsNotReadAsContent() {
  const xml = mutate([
    "<ram:Name>VENDEUR SAS</ram:Name>",
    "<!-- <ram:Name>VENDEUR FANTOME</ram:Name> -->\n        <ram:Name>VENDEUR SAS</ram:Name>",
  ]);
  const parsed = parseInvoice(writeFixture("F-COMMENTAIRE-VENDEUR", xml));
  assert.strictEqual(parsed.seller.name, "VENDEUR SAS");
}

// Instruction de traitement : son contenu n'est pas du texte de document, mais
// ce parseur par regex y verrait une balise. Refus plutot que devinette.
function testProcessingInstructionIsRejected() {
  const xml = mutate([
    "<ram:ID>F-REMISE-001</ram:ID>",
    "<?x <ram:ID>F-FAKE-999</ram:ID>?>\n    <ram:ID>F-REMISE-001</ram:ID>",
  ]);
  parseExpectingRejection(writeFixture("F-PI", xml), /Instructions de traitement/);
}

// La declaration XML en tete de document, elle, reste acceptee : c'est la seule
// exception au refus des « <? ». Testee avec et sans BOM.
function testXmlDeclarationIsStillAccepted() {
  assert.ok(VALID_CII.startsWith("<?xml "), "la fixture doit porter une declaration XML");
  assert.strictEqual(parseInvoice(writeFixture("F-DECL-XML", VALID_CII)).number, "F-REMISE-001");
  assert.strictEqual(parseInvoice(writeFixture("F-DECL-XML-BOM", "\uFEFF" + VALID_CII)).number, "F-REMISE-001");
}

function testCdataSectionIsRejected() {
  const xml = mutate([
    "<ram:ID>F-REMISE-001</ram:ID>",
    "<![CDATA[<ram:ID>F-FAKE-999</ram:ID>]]>\n    <ram:ID>F-REMISE-001</ram:ID>",
  ]);
  parseExpectingRejection(writeFixture("F-CDATA", xml), /sections CDATA/);
}

function testDoctypeIsRejected() {
  const xml = mutate([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE rsm:CrossIndustryInvoice>',
  ]);
  parseExpectingRejection(writeFixture("F-DOCTYPE", xml), /DOCTYPE/);
}

function testEntityDeclarationIsRejected() {
  const xml = mutate([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml version="1.0" encoding="UTF-8"?>\n<!ENTITY xxe "F-FAKE-999">',
  ]);
  parseExpectingRejection(writeFixture("F-ENTITY", xml), /entit/i);
}

// La devise est injectee dans une RegExp pour retrouver BT-110 par currencyID :
// une valeur non echappee ferait planter le script (« EUR( ») ou matcherait
// n'importe quoi (« .* »). Elle est d'abord contrainte a un code ISO 4217.
function testInvalidCurrencyCodeIsRejected() {
  for (const bogus of ["EUR(", ".*", "eur", "EURO"]) {
    const xml = mutate([
      "<ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>",
      `<ram:InvoiceCurrencyCode>${bogus}</ram:InvoiceCurrencyCode>`,
    ]);
    assertHasError(parseExpectingErrors(writeFixture("F-DEVISE-KO", xml)), "BT-5_INVALID");
  }
}

// Entites numeriques : du XML valide et courant sur les raisons sociales
// francaises. Decimal et hexadecimal, en une seule passe.
function testNumericEntitiesAreDecoded() {
  const xml = mutate(["<ram:Name>VENDEUR SAS</ram:Name>", "<ram:Name>SOCI&#201;T&#xC9;</ram:Name>"]);
  assert.strictEqual(parseInvoice(writeFixture("F-ENTITES-NUM", xml)).seller.name, "SOCIÉTÉ");
}

// Une entite numerique issue d'un « &amp;#233; » ne doit pas etre decodee une
// seconde fois : le document dit « &#233; », pas « é ».
function testNumericEntitiesAreDecodedOnlyOnce() {
  const xml = mutate(["<ram:Name>VENDEUR SAS</ram:Name>", "<ram:Name>CAF&amp;#233;</ram:Name>"]);
  assert.strictEqual(parseInvoice(writeFixture("F-ENTITES-DOUBLE", xml)).seller.name, "CAF&#233;");
}

// Hors du jeu de caracteres XML 1.0 : « &#0; » reste litteral plutot que de
// faire entrer un caractere NUL dans la sortie JSON.
function testNonXmlCharacterReferenceIsLeftLiteral() {
  const xml = mutate(["<ram:Name>VENDEUR SAS</ram:Name>", "<ram:Name>VENDEUR&#0;SAS</ram:Name>"]);
  assert.strictEqual(parseInvoice(writeFixture("F-ENTITE-NUL", xml)).seller.name, "VENDEUR&#0;SAS");
}

// Au-dela de 5 Mo, le fichier est refuse sans etre lu.
function testOversizedFileIsRejected() {
  const padding = "<ram:Foo>".repeat(600000); // ~5,4 Mo
  const xml = mutate([
    "<ram:ApplicableHeaderTradeSettlement>",
    `<ram:ApplicableHeaderTradeSettlement>${padding}`,
  ]);
  parseExpectingRejection(writeFixture("F-VOLUMINEUX", xml), /trop volumineux/);
}

// Un commentaire jamais ferme rend le document malforme : le retirer
// reviendrait a decider ou il s'arrete. Refus.
function testUnclosedCommentIsRejected() {
  const xml = mutate(["<ram:ID>F-REMISE-001</ram:ID>", "<!-- jamais ferme\n    <ram:ID>F-REMISE-001</ram:ID>"]);
  parseExpectingRejection(writeFixture("F-COMMENTAIRE-OUVERT", xml), /Commentaire XML non ferm/);
}

// Sous le plafond de taille, un document fait de balises ouvrantes jamais
// fermees ne doit pas couter cher : avec un motif unique « <tag>...</tag> »,
// chacune des 60 000 ouvrantes relancait une exploration jusqu'a la fin du
// document (1,84 Mo = 17,4 s mesurees, code 0). Le seuil est large : il attrape
// le retour du comportement quadratique, pas une machine lente.
function testUnclosedTagsStayCheap() {
  const padding = "<ram:SpecifiedTradePaymentTerms>".repeat(60000); // ~1,84 Mo
  const xml = mutate([
    "<ram:ApplicableHeaderTradeSettlement>",
    `<ram:ApplicableHeaderTradeSettlement>${padding}`,
  ]);
  const xmlPath = writeFixture("F-BALISES-NON-FERMEES", xml);
  const started = Date.now();
  parseInvoice(xmlPath);
  const elapsed = Date.now() - started;
  assert.ok(elapsed < 5000, `lecture quadratique : ${elapsed} ms pour 1,84 Mo`);
}

// Meme mesure sur le retrait des commentaires : « <!--[\s\S]*?--> » coutait
// 46,4 s sur 1,67 Mo de « <!-- » non fermes.
function testUnclosedCommentsStayCheap() {
  const padding = "<!-- x ".repeat(250000); // ~1,67 Mo
  const xml = mutate([
    "<ram:ApplicableHeaderTradeSettlement>",
    `<ram:ApplicableHeaderTradeSettlement>${padding}`,
  ]);
  const xmlPath = writeFixture("F-COMMENTAIRES-NON-FERMES", xml);
  const started = Date.now();
  parseExpectingRejection(xmlPath, /Commentaire XML non ferm/);
  const elapsed = Date.now() - started;
  assert.ok(elapsed < 5000, `retrait des commentaires quadratique : ${elapsed} ms pour 1,67 Mo`);
}

// Une instruction de traitement en tete de document, sans declaration XML, ne
// doit pas passer pour la declaration : « <?xml-stylesheet » commence par
// « <?xml » mais c'est une instruction de traitement (bien formee).
function testLeadingXmlLikeProcessingInstructionIsRejected() {
  const body = VALID_CII.replace('<?xml version="1.0" encoding="UTF-8"?>\n', "");
  // Faux ExchangedDocument complet : sans le correctif, le script sort en code 0
  // avec le numero F-FAKE-999 (libxml2 et expat lisent F-REMISE-001).
  const fake = VALID_CII.match(/<rsm:ExchangedDocument>[\s\S]*?<\/rsm:ExchangedDocument>/)[0].replace("F-REMISE-001", "F-FAKE-999");
  parseExpectingRejection(writeFixture("F-PI-TETE", `<?xml-stylesheet ${fake}?>\n${body}`), /Instructions de traitement/);
  assert.strictEqual(parseInvoice(writeFixture("F-SANS-DECL", body)).number, "F-REMISE-001");
}

// « > » est permis dans une valeur d'attribut : il ne termine pas la balise.
function testGreaterThanInAttributeValue() {
  const xml = mutate(["<ram:ID>F-REMISE-001</ram:ID>", '<ram:ID schemeID=">F-FAKE-999">F-REMISE-001</ram:ID>']);
  assert.strictEqual(parseInvoice(writeFixture("F-ATTR-GT", xml)).number, "F-REMISE-001");
  const vat = mutate(['<ram:ID schemeID="VA">FR32123456789</ram:ID>', '<ram:ID x=">FR00999999999" schemeID="VA">FR32123456789</ram:ID>']);
  assert.strictEqual(parseInvoice(writeFixture("F-ATTR-GT-TVA", vat)).seller.tva_intracom, "FR32123456789");
}

// Toute declaration « <! » autre qu'un commentaire est refusee (CDATA quelle
// que soit la casse ecrite).
function testOtherMarkupDeclarationIsRejected() {
  const xml = mutate(["<ram:ID>F-REMISE-001</ram:ID>", "<![cdata[<ram:ID>F-FAKE-999</ram:ID>]]><ram:ID>F-REMISE-001</ram:ID>"]);
  parseExpectingRejection(writeFixture("F-CDATA-CASSE", xml), /sections CDATA/);
}

// Balise ouvrante jamais terminee : l'extraction d'une valeur reste lineaire.
function testUnterminatedStartTagsStayCheap() {
  const padding = "<ram:Name ".repeat(150000) + "<ram:X>"; // ~1,5 Mo
  const xml = mutate(["<ram:SellerTradeParty>", `<ram:SellerTradeParty>${padding}`]);
  const started = Date.now();
  parseInvoice(writeFixture("F-OUVRANTES-NON-TERMINEES", xml));
  const elapsed = Date.now() - started;
  assert.ok(elapsed < 5000, `extraction quadratique : ${elapsed} ms pour 1,5 Mo`);
}

const TESTS = [
  testRoundTripTva20,
  testRoundTripFranchise,
  testValidFixtureIsAccepted,
  testDefaultNamespaceIsAccepted,
  testPriceFallsBackToNothingWithoutNetPrice,
  testXmlEntitiesAreDecodedOnce,
  testProfileBasicWlIsRejected,
  testImpossibleCalendarDateIsRejected,
  testTruncatedDateIsRejected,
  testMalformedDecimalIsRejected,
  testTotalsMismatchIsRejected,
  testLineSumMismatchIsRejected,
  testVatAmountNotMatchingRateIsRejected,
  testVatBasisNotCoveringTaxBasisTotalIsRejected,
  testUnsupportedTypeCodeIsRejected,
  testCorrectiveTypeCodeIsExposed,
  testPrototypeTypeCodeIsRejected,
  testSellerSirenIsNotLabelledSiret,
  testMalformedSellerLegalIdIsRejected,
  testStandardCategoryWithoutRateIsRejected,
  testExemptCategoryWithVatIsRejected,
  testSignedDecimalIsAccepted,
  testMissingDuePayableIsRejected,
  testMissingSellerNameIsRejected,
  testCommentIsNotReadAsContent,
  testCommentedSellerNameIsNotReadAsContent,
  testProcessingInstructionIsRejected,
  testXmlDeclarationIsStillAccepted,
  testCdataSectionIsRejected,
  testDoctypeIsRejected,
  testEntityDeclarationIsRejected,
  testInvalidCurrencyCodeIsRejected,
  testNumericEntitiesAreDecoded,
  testNumericEntitiesAreDecodedOnlyOnce,
  testNonXmlCharacterReferenceIsLeftLiteral,
  testOversizedFileIsRejected,
  testUnclosedCommentIsRejected,
  testUnclosedTagsStayCheap,
  testUnclosedCommentsStayCheap,
  testLeadingXmlLikeProcessingInstructionIsRejected,
  testGreaterThanInAttributeValue,
  testOtherMarkupDeclarationIsRejected,
  testUnterminatedStartTagsStayCheap,
];

function main() {
  try {
    TESTS.forEach((test) => {
      test();
      console.log(`  ok ${test.name}`);
    });
  } finally {
    TMP_DIRS.forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  }
  console.log(`\nparse-einvoice : ${TESTS.length} tests passed.`);
}

main();
