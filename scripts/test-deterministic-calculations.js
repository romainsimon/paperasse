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

function testIKBaremeAnnuel() {
  // Exemple officiel URSSAF : 5 800 km en 5 CV
  const output = runCalc(["ik", "--km=5800", "--cv=5"]);
  assert.match(output, /Tranche: de 5 001 a 20 000 km/);
  assert.match(output, /IK annuelle: 3465,60 EUR/);
}

function testIKRegularisationTropVerse() {
  // 5 800 km payes au taux de la 1re tranche (0,636) = 3 688,80 EUR
  const output = runCalc(["ik", "--km=5800", "--cv=5", "--deja-verse=3688.80"]);
  assert.match(output, /Trop-verse a regulariser: 223,20 EUR/);
}

function testIKElectrique() {
  const output = runCalc(["ik", "--km=3000", "--cv=4", "--electrique"]);
  assert.match(output, /IK annuelle: 2181,60 EUR/);
}

function testIKPuissancePlafonnee() {
  const output = runCalc(["ik", "--km=25000", "--cv=11"]);
  assert.match(output, /Categorie: 7 CV et plus/);
  assert.match(output, /IK annuelle: 11750,00 EUR/);
}

function testIKMoto() {
  const output = runCalc(["ik", "--km=4000", "--cv=3", "--vehicule=moto"]);
  assert.match(output, /IK annuelle: 1486,00 EUR/);
}

function testIKElectriqueArrondiUnique() {
  // 1001 x 0,529 x 1,2 = 635,4348 -> 635,43 (un seul arrondi)
  const output = runCalc(["ik", "--km=1001", "--cv=3", "--electrique"]);
  assert.match(output, /IK annuelle: 635,43 EUR/);
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

function testCalcIrDecoteArrondie() {
  // Impôt et décote arrondis à l'euro : l'impôt après décote doit être entier (art. 1657, 1 CGI)
  let out;
  try {
    out = execFileSync("python3", [path.join(ROOT, "fiscaliste", "scripts", "calc_ir.py"), "--rni", "20000", "--parts", "1", "--json"], { encoding: "utf8" });
  } catch (err) {
    if (err.code === "ENOENT") { console.log("python3 absent : test calc_ir ignoré"); return; }
    throw err;
  }
  const r = JSON.parse(out);
  assert.ok(r.decote > 0, "la décote doit jouer pour 20 000 € de RNI sur 1 part");
  assert.ok(Number.isInteger(r.impot_apres_decote), "impôt après décote non entier : " + r.impot_apres_decote);
  assert.strictEqual(r.impot_apres_decote, r.impot_brut_apres_qf - r.decote);
}

function testAnalyseFec() {
  // controleur-fiscal : contrôles déterministes du FEC d'exemple des evals
  const { analyser } = require(path.join(ROOT, "controleur-fiscal", "scripts", "analyse-fec.js"));
  const fs = require("fs");
  const fec = path.join(ROOT, "controleur-fiscal", "evals", "files", "fec-webagency.txt");
  const r = analyser(fs.readFileSync(fec, "utf8"), { fec, debut: "20250101", fin: "20251231" });
  assert.strictEqual(r.format.colonnes, 18);
  assert.ok(r.totaux_debit_credit.equilibre, "FEC d'exemple équilibré");
  assert.strictEqual(r.numerotation, "continue sur l'ensemble des journaux");
  assert.strictEqual(r.anomalies.length, 0, "aucune anomalie de forme attendue : " + JSON.stringify(r.anomalies));
  assert.strictEqual(r.compte_courant_455.solde, "100.00");
  assert.match(r.compte_courant_455.sens, /^débiteur/);
  assert.ok(r.a_examiner.some((x) => /netflix/i.test(x.libelle)), "l'abonnement Netflix doit être signalé");
  // FEC fautif : déséquilibre, date hors exercice, montant négatif, compte hors PCG, trou de numérotation
  const entete = fs.readFileSync(fec, "utf8").split("\n")[0];
  const bad = [entete,
    "BQ|Banque|001|20250105|5121|Banque|||A|20250105|Test|10.00|0.00|||20250105||",
    "BQ|Banque|001|20250105|706|Ventes|||A|20250105|Test|0.00|10.00|||20250105||",
    "BQ|Banque|004|20240105|9999|Bidon|||B|20240105|Test|10.00|5.00|||20240105||",
    "BQ|Banque|005|20250105|5121|Banque|||C|20250105|Test|-3.00|0.00|||20250105||"].join("\n");
  const b = analyser(bad, { fec: "bad", debut: "20250101", fin: "20251231" });
  const types = new Set(b.anomalies.map((a) => a.controle));
  for (const t of ["dates", "montants", "equilibre_ecriture", "equilibre_global", "numerotation", "pcg"]) {
    assert.ok(types.has(t), "anomalie attendue : " + t);
  }
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
  testIKBaremeAnnuel();
  testIKRegularisationTropVerse();
  testIKElectrique();
  testIKPuissancePlafonnee();
  testIKMoto();
  testIKElectriqueArrondiUnique();
  testCalcIrDecoteArrondie();
  testAnalyseFec();
  testBilanAmortComptesCompletes();
  testBilanAmortSubdivision();
  testBilanDepreciation29x();
  testBilanAmortOrphelin();
  testBilanAmortNu();
  testBilanCollisionRacines();
  console.log("Deterministic calculation tests passed.");
}

main();
