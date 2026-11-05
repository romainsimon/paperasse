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

const { generateBilan, checkBilanEquilibre } = require(path.join(ROOT, "scripts", "generate-statements.js"));

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

function runCalcIrFoyer(foyer, args = []) {
  // Écrit le foyer dans un fichier temporaire et renvoie la sortie JSON de calc_ir.py
  // (null sans python3 ; { refus } si le script s'arrête avec un message)
  const fs = require("fs");
  const os = require("os");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "calc-ir-"));
  const fichier = path.join(dir, "foyer.json");
  fs.writeFileSync(fichier, JSON.stringify(foyer));
  try {
    const out = execFileSync("python3", [path.join(ROOT, "fiscaliste", "scripts", "calc_ir.py"), "--foyer", fichier, "--json", ...args],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return JSON.parse(out);
  } catch (err) {
    if (err.code === "ENOENT") return null;
    if (err.status === 1 && err.stderr) return { refus: String(err.stderr) };
    throw err;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function testCalcIrRevenusCapitalEtPs() {
  // Option barème, crypto, LMNP, PS fonciers, RCM sans PS à la source (revenus 2025)
  const couple = { foyer: { situation: "marie" }, revenus: { salaires_declarant1: 40000, salaires_declarant2: 30000, dividendes_bruts: 20000, interets_rcm: 2000 } };
  const pfu = runCalcIrFoyer({ ...couple, options_fiscales: { revenus_capital: "pfu" } });
  if (pfu === null) { console.log("python3 absent : tests calc_ir ignorés"); return; }
  assert.strictEqual(pfu.rni, 63000);
  assert.strictEqual(pfu.ir_pfu.montant, 2816);
  assert.strictEqual(pfu.total_a_payer, 11708);

  // 2OP : abattement de 40 %, CSG déductible de l'année sur la ligne 2BH (6,8 % × 22 000 = 1 496 €)
  const bareme = runCalcIrFoyer({ ...couple, options_fiscales: { revenus_capital: "bareme" } });
  assert.strictEqual(bareme.rni, 75504);
  assert.strictEqual(bareme.ir_pfu.montant, 0);
  assert.strictEqual(bareme.prelevements_sociaux, 3784);
  assert.strictEqual(bareme.total_a_payer, 12643);

  // LMNP au barème et aux PS de 18,6 %, hors IR de 12,8 % ; foncier nu à 17,2 %
  const lmnp = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 50000, lmnp_reel_resultat: 10000 } });
  assert.strictEqual(lmnp.ir_pfu.montant, 0);
  assert.strictEqual(lmnp.ps_details.patrimoine.montant, 1860);
  assert.strictEqual(lmnp.total_a_payer, 11464);
  const lmnpFoncier = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 50000, lmnp_reel_resultat: 6000, revenus_fonciers_micro: 7000 } });
  assert.strictEqual(lmnpFoncier.rni, 58000);
  assert.strictEqual(lmnpFoncier.ps_details.patrimoine.montant, 1116);
  assert.strictEqual(lmnpFoncier.ps_details.foncier.montant, 1204);
  assert.strictEqual(lmnpFoncier.total_a_payer, 12824);

  // La 2OP ne couvre pas la crypto, qui garde son IR de 12,8 % ; option 3CN indépendante
  const celib = { foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, dividendes_bruts: 2000, crypto_plus_values: 10000 } };
  const deuxOp = runCalcIrFoyer({ ...celib, options_fiscales: { revenus_capital: "bareme" } });
  assert.strictEqual(deuxOp.ir_pfu.montant, 1280);
  assert.strictEqual(deuxOp.total_a_payer, 7707);
  const troisCn = runCalcIrFoyer({ ...celib, options_fiscales: { revenus_capital: "pfu", crypto: "bareme" } });
  assert.strictEqual(troisCn.rni, 46000);
  assert.strictEqual(troisCn.ir_pfu.montant, 256);
  assert.strictEqual(troisCn.total_a_payer, 9364);

  // Dividendes sans PS à la source : PS par voie de rôle au taux des revenus du patrimoine (18,6 %)
  const sansPs = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, dividendes_bruts: 5000, rcm_sans_ps_a_la_source: true } });
  assert.strictEqual(sansPs.ps_details.patrimoine.montant, 930);
  assert.strictEqual(sansPs.ps_details.placement.montant, 0);
  assert.strictEqual(sansPs.total_a_payer, 5474);
  const boolTexte = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, dividendes_bruts: 5000, rcm_sans_ps_a_la_source: "false" } });
  assert.match(boolTexte.refus || "", /booléen JSON/, "un booléen en texte doit être refusé");
  // Un montant : seule cette part passe aux revenus du patrimoine ; la CSG déductible
  // de l'année (option barème) ne porte que sur le reste (6,8 % × 2 000 = 136 €)
  const mixte = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, dividendes_bruts: 5000, rcm_sans_ps_a_la_source: 3000 }, options_fiscales: { revenus_capital: "bareme" } });
  assert.strictEqual(mixte.ps_details.patrimoine.montant, 558);
  assert.strictEqual(mixte.ps_details.placement.montant, 344);
  assert.strictEqual(mixte.rni, 36000 + 3000 - 136);
  const tropSansPs = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { dividendes_bruts: 5000, rcm_sans_ps_a_la_source: 6000 } });
  assert.match(tropSansPs.refus || "", /entre 0 et 5000/, "un montant au-delà des dividendes et intérêts doit être refusé");

  // Déficits fonciers antérieurs (4BD) : imputés sur le foncier net positif, avant l'IR et les PS
  const deficit = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, revenus_fonciers_reels: 10000, deficit_foncier_anterieur: 4000 } });
  assert.strictEqual(deficit.rni, 42000);
  assert.strictEqual(deficit.ps_details.foncier.montant, 1032);
  const deficitExcedent = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, revenus_fonciers_reels: 3000, deficit_foncier_anterieur: 5000 } });
  assert.strictEqual(deficitExcedent.rni, 36000);
  assert.strictEqual(deficitExcedent.prelevements_sociaux, 0);
  assert.ok((deficitExcedent._avertissements || []).some((a) => a.includes("2000 € restent reportables")), "le reliquat de déficit doit être signalé");
  const deficitNegatif = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { revenus_fonciers_reels: 3000, deficit_foncier_anterieur: -1000 } });
  assert.match(deficitNegatif.refus || "", /montant positif attendu/);

  // Moins-values nettes : jamais imputées sur le revenu global ni sur les dividendes
  const mvBareme = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, plus_values_mobilieres: -5000 }, options_fiscales: { revenus_capital: "bareme" } });
  assert.strictEqual(mvBareme.rni, 36000);
  const mvPfu = runCalcIrFoyer({ foyer: { situation: "celibataire" }, revenus: { salaires_declarant1: 40000, dividendes_bruts: 2000, plus_values_mobilieres: -5000, crypto_plus_values: -1000 } });
  assert.strictEqual(mvPfu.ir_pfu.montant, 256);
  assert.strictEqual(mvPfu.ps_details.patrimoine.montant, 0);

  // Option crypto au barème (art. 200 C) : ouverte aux cessions depuis le 01/01/2023
  const cryptoSeule = { foyer: { situation: "celibataire" }, revenus: { crypto_plus_values: 10000 }, options_fiscales: { crypto: "bareme" } };
  assert.match(runCalcIrFoyer(cryptoSeule, ["--annee", "2022"]).refus || "", /depuis le 01\/01\/2023/);
  const crypto2023 = runCalcIrFoyer(cryptoSeule, ["--annee", "2023"]);
  assert.strictEqual(crypto2023.ir_pfu.montant, 0);
  assert.strictEqual(crypto2023.rni, 10000);
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

// ---------------------------------------------------------------------------
// Bilan : comptes de tiers classes selon le sens du solde (#105)
// ---------------------------------------------------------------------------

// Cote du bilan ou figure la ligne du compte ('actif' ou 'passif')
function bilanSide(md, acct) {
  const [actif, passif] = md.split("## PASSIF");
  if (actif.includes(acct + " —")) return "actif";
  if (passif.includes(acct + " —")) return "passif";
  assert.fail("ligne " + acct + " absente du bilan:\n" + md);
}

function testBilanDettes42xEt4457x() {
  // Repro #105 : 42x et TVA collectee 4457x omis du passif
  const { md, totalActif, totalPassif } = runBilan({
    "512000": { debit: 3000, credit: 0 },
    "421000": { debit: 0, credit: 1000 },
    "445710": { debit: 0, credit: 500 },
    "101000": { debit: 0, credit: 1500 },
  });
  assert.strictEqual(bilanSide(md, "421000"), "passif", "421000 crediteur attendu au passif:\n" + md);
  assert.strictEqual(bilanSide(md, "445710"), "passif", "445710 crediteur attendu au passif:\n" + md);
  assert.strictEqual(totalActif, 3000, "total actif attendu 3000: " + totalActif);
  assert.strictEqual(totalPassif, 3000, "total passif attendu 3000: " + totalPassif);
}

function testBilanCompteCourantDebiteur() {
  // Repro #105 : 455x debiteur omis de l'actif
  const { md, totalActif, totalPassif } = runBilan({
    "512000": { debit: 500, credit: 0 },
    "455100": { debit: 200, credit: 0 },
    "101000": { debit: 0, credit: 700 },
  });
  assert.strictEqual(bilanSide(md, "455100"), "actif", "455100 debiteur attendu a l'actif:\n" + md);
  assert.strictEqual(totalActif, 700, "total actif attendu 700: " + totalActif);
  assert.strictEqual(totalPassif, 700, "total passif attendu 700: " + totalPassif);
}

function testBilanComptes419457467() {
  // #105 : 419 (clients crediteurs), 457 et 467 traites nulle part
  const { md, totalActif, totalPassif } = runBilan({
    "512000": { debit: 1000, credit: 0 },
    "467000": { debit: 300, credit: 0 },
    "419100": { debit: 0, credit: 400 },
    "457000": { debit: 0, credit: 250 },
    "101000": { debit: 0, credit: 650 },
  });
  assert.strictEqual(bilanSide(md, "467000"), "actif", "467000 debiteur attendu a l'actif:\n" + md);
  assert.strictEqual(bilanSide(md, "419100"), "passif", "419100 crediteur attendu au passif:\n" + md);
  assert.strictEqual(bilanSide(md, "457000"), "passif", "457000 crediteur attendu au passif:\n" + md);
  assert.strictEqual(totalActif, 1300, "total actif attendu 1300: " + totalActif);
  assert.strictEqual(totalPassif, 1300, "total passif attendu 1300: " + totalPassif);
}

function testBilanTresorerieCreditrice() {
  // 512 en decouvert et 519 concours bancaires : dettes au passif
  const { md, totalActif, totalPassif } = runBilan({
    "411000": { debit: 800, credit: 0 },
    "512000": { debit: 0, credit: 300 },
    "512100": { debit: 200, credit: 0 },
    "519000": { debit: 0, credit: 100 },
    "101000": { debit: 0, credit: 600 },
  });
  assert.strictEqual(bilanSide(md, "512000"), "passif", "512000 crediteur attendu au passif:\n" + md);
  assert.strictEqual(bilanSide(md, "512100"), "actif", "512100 debiteur attendu a l'actif:\n" + md);
  assert.strictEqual(bilanSide(md, "519000"), "passif", "519000 crediteur attendu au passif:\n" + md);
  assert.strictEqual(totalActif, 1000, "total actif attendu 1000: " + totalActif);
  assert.strictEqual(totalPassif, 1000, "total passif attendu 1000: " + totalPassif);
}

function testBilanSoldeUnCentime() {
  // Un solde d'exactement 0,01 doit figurer au bilan, sinon le controle
  // d'equilibre bloque la cloture sur un ecart fictif
  const r = runBilan({
    "512000": { debit: 999.99, credit: 0 },
    "445660": { debit: 0.01, credit: 0 },
    "101000": { debit: 0, credit: 1000 },
  });
  assert.strictEqual(bilanSide(r.md, "445660"), "actif", "445660 a 0,01 attendu a l'actif:\n" + r.md);
  assert.doesNotThrow(() => checkBilanEquilibre(r));
}

function testBilanControleEquilibre() {
  // Un ecart Actif / Passif doit lever une erreur explicite
  assert.doesNotThrow(() => checkBilanEquilibre({ totalActif: 700, totalPassif: 700, ecart: 0 }));
  assert.throws(
    () => checkBilanEquilibre({ totalActif: 500, totalPassif: 700, ecart: -200 }),
    /Bilan desequilibre/,
  );
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
  testCalcIrRevenusCapitalEtPs();
  testAnalyseFec();
  testBilanAmortComptesCompletes();
  testBilanAmortSubdivision();
  testBilanDepreciation29x();
  testBilanAmortOrphelin();
  testBilanAmortNu();
  testBilanCollisionRacines();
  testBilanDettes42xEt4457x();
  testBilanCompteCourantDebiteur();
  testBilanComptes419457467();
  testBilanTresorerieCreditrice();
  testBilanSoldeUnCentime();
  testBilanControleEquilibre();
  console.log("Deterministic calculation tests passed.");
}

main();
