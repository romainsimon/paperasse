#!/usr/bin/env node

const assert = require("assert");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const CALC_SCRIPT = path.join(ROOT, "scripts", "calc.js");

function runNodeScript(scriptPath, args) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

function runCalc(args) {
  return runNodeScript(CALC_SCRIPT, args);
}

function testCCA() {
  const output = runCalc(["cca", "--total=1200", "--jours-n-plus-1=92", "--jours-totaux=365"]);
  assert.match(output, /CCA: 302,47 EUR/);
}

function testAmortissementLineaire() {
  const output = runCalc([
    "amortissement-lineaire",
    "--valeur=3000",
    "--duree=3",
    "--jours-utilises=200",
    "--base-jours=365",
  ]);
  assert.match(output, /Annuite pleine: 1000,00 EUR/);
  assert.match(output, /Dotation periode: 547,95 EUR/);
}

function testISTauxUnique() {
  const output = runCalc(["is", "--resultat-fiscal=10000", "--taux=25"]);
  assert.match(output, /IS total: 2500,00 EUR/);
}

function testISTauxOneMeansOnePercent() {
  const output = runCalc(["is", "--resultat-fiscal=1000", "--taux=1"]);
  assert.match(output, /IS total: 10,00 EUR/);
}

function testISNegative() {
  const output = runCalc(["is", "--resultat-fiscal=-1000", "--taux=25"]);
  assert.match(output, /IS: 0,00 EUR \(resultat fiscal <= 0\)/);
}

function testISProratedReducedRate() {
  const output = runCalc([
    "is",
    "--resultat-fiscal=50000",
    "--taux-reduit=15",
    "--taux-normal=25",
    "--jours-exercice=182",
  ]);

  assert.match(output, /Plafond taux reduit applique: 21191,78 EUR/);
  assert.match(output, /IS total: 10380,83 EUR/);
}

function testTVAAcomptesRS() {
  const output = runCalc(["tva-acomptes-rs", "--tva-n-1=12000"]);
  assert.match(output, /Acompte juillet \(55%\): 6600,00 EUR/);
  assert.match(output, /Total acomptes: 11400,00 EUR/);
}

function testProrata() {
  const output = runCalc(["prorata", "--montant=1000", "--jours=50", "--base=365"]);
  assert.match(output, /Resultat: 136,99 EUR/);
}

// ---------------------------------------------------------------------------
// Bilan : appariement immobilisations / amortissements-depreciations
// ---------------------------------------------------------------------------

const { generateBilan } = require(path.join(ROOT, "scripts", "generate-statements.js"));

const FIXTURE_COMPANY = {
  fiscal_year: { start: "2025-01-01", end: "2025-12-31", is_first_year: false },
};

function runBilan(accounts) {
  return generateBilan(accounts, FIXTURE_COMPANY, {}, { resultatNet: 0 });
}

function bilanRow(md, acct) {
  const line = md.split("\n").find((l) => l.includes(acct + " —"));
  assert.ok(line, "ligne " + acct + " absente du bilan:\n" + md);
  return line;
}

// Cellules [brut, amort, net] d'une ligne d'actif, espaces de milliers retires
// (verrouille l'ordre des colonnes, insensible a la locale)
function rowCells(md, acct) {
  return bilanRow(md, acct)
    .split("|")
    .slice(2, 5)
    .map((c) => c.replace(/[\s  ]/g, ""));
}

function testBilanAmortComptesCompletes() {
  // Plan de comptes a 6 chiffres : 281000 amortit 210000 (et non 2810000)
  const { md, totalActif } = runBilan({
    "210000": { debit: 10000, credit: 0 },
    "281000": { debit: 0, credit: 1200 },
  });
  assert.deepStrictEqual(rowCells(md, "210000"), ["10000,00", "1200,00", "8800,00"],
    "amortissement 281000 non apparie a 210000:\n" + md);
  assert.ok(!md.includes("281000 —"), "281000 ne doit pas avoir de ligne separee:\n" + md);
  assert.strictEqual(totalActif, 8800, "total actif attendu 8800: " + totalActif);
}

function testBilanAmortSubdivision() {
  // Subdivision : 281830 amortit 218300
  const { md, totalActif } = runBilan({
    "218300": { debit: 3000, credit: 0 },
    "281830": { debit: 0, credit: 500 },
  });
  assert.deepStrictEqual(rowCells(md, "218300"), ["3000,00", "500,00", "2500,00"],
    "amortissement 281830 non apparie a 218300:\n" + md);
  assert.ok(!md.includes("281830 —"), "281830 ne doit pas avoir de ligne separee:\n" + md);
  assert.strictEqual(totalActif, 2500, "total actif attendu 2500: " + totalActif);
}

function testBilanDepreciation29x() {
  // Depreciation 29x apparie a l'immobilisation correspondante
  const { md, totalActif } = runBilan({
    "210000": { debit: 10000, credit: 0 },
    "291000": { debit: 0, credit: 700 },
  });
  assert.deepStrictEqual(rowCells(md, "210000"), ["10000,00", "700,00", "9300,00"],
    "depreciation 291000 non appariee a 210000:\n" + md);
  assert.ok(!md.includes("291000 —"), "291000 ne doit pas avoir de ligne separee:\n" + md);
  assert.strictEqual(totalActif, 9300, "total actif attendu 9300: " + totalActif);
}

function testBilanAmortOrphelin() {
  // 28x sans immobilisation brute : doit rester visible au bilan, pas disparaitre
  const { md, totalActif } = runBilan({
    "281000": { debit: 0, credit: 1200 },
    "512000": { debit: 1200, credit: 0 },
  });
  assert.deepStrictEqual(rowCells(md, "281000"), ["", "1200,00", "-1200,00"],
    "amortissement orphelin absent ou mal presente:\n" + md);
  assert.strictEqual(totalActif, 0, "total actif attendu 0 (1200 - 1200): " + totalActif);
}

function testBilanAmortNu() {
  // '28' nu (non ventile dans le PCG) : pas d'affectation arbitraire a 20
  const { md, totalActif } = runBilan({
    "20": { debit: 10000, credit: 0 },
    "21": { debit: 20000, credit: 0 },
    "28": { debit: 0, credit: 3000 },
  });
  assert.deepStrictEqual(rowCells(md, "20"), ["10000,00", "0,00", "10000,00"],
    "le 28 nu ne doit pas etre affecte a 20:\n" + md);
  assert.deepStrictEqual(rowCells(md, "28"), ["", "3000,00", "-3000,00"],
    "le 28 nu doit rester orphelin:\n" + md);
  assert.strictEqual(totalActif, 27000, "total actif attendu 27000: " + totalActif);
}

function testBilanCollisionRacines() {
  // 21 et 210000 dans la meme balance : appariement ambigu refuse
  const { md, totalActif } = runBilan({
    "21": { debit: 5000, credit: 0 },
    "210000": { debit: 8000, credit: 0 },
    "281000": { debit: 0, credit: 1200 },
  });
  assert.deepStrictEqual(rowCells(md, "281000"), ["", "1200,00", "-1200,00"],
    "appariement ambigu : 281000 doit rester orphelin:\n" + md);
  assert.strictEqual(totalActif, 11800, "total actif attendu 11800: " + totalActif);
}

function main() {
  testCCA();
  testAmortissementLineaire();
  testISTauxUnique();
  testISTauxOneMeansOnePercent();
  testISNegative();
  testISProratedReducedRate();
  testTVAAcomptesRS();
  testProrata();
  testBilanAmortComptesCompletes();
  testBilanAmortSubdivision();
  testBilanDepreciation29x();
  testBilanAmortOrphelin();
  testBilanAmortNu();
  testBilanCollisionRacines();
  console.log("Deterministic calculation tests passed.");
}

main();
