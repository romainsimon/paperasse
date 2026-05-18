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

function testISOCTauxUnique() {
  // ISOC taux normal 25% (art. 215 al. 1 CIR 92)
  const output = runCalc(["isoc", "--resultat-fiscal=10000", "--taux=25"]);
  assert.match(output, /ISOC total: 2500,00 EUR/);
}

function testISOCTauxOneMeansOnePercent() {
  const output = runCalc(["isoc", "--resultat-fiscal=1000", "--taux=1"]);
  assert.match(output, /ISOC total: 10,00 EUR/);
}

function testISOCNegative() {
  const output = runCalc(["isoc", "--resultat-fiscal=-1000", "--taux=25"]);
  assert.match(output, /ISOC: 0,00 EUR \(resultat fiscal <= 0\)/);
}

function testISOCProratedReducedRate() {
  // ISOC belge taux réduit 20% (art. 215 al. 2 CIR 92), plafond 100 000 EUR
  // Exercice proraté 182 jours : plafond proraté = 100000 * 182/365 = 49863,01 EUR
  // Sur 50000 EUR : tranche réduite = 49863,01 EUR @ 20% = 9972,60 EUR
  //                 tranche normale = 136,99 EUR @ 25% = 34,25 EUR
  //                 total ISOC = 10006,85 EUR
  const output = runCalc([
    "isoc",
    "--resultat-fiscal=50000",
    "--taux-reduit=20",
    "--taux-normal=25",
    "--jours-exercice=182",
  ]);

  assert.match(output, /Plafond taux reduit applique: 49863,01 EUR/);
  assert.match(output, /ISOC total: 10006,85 EUR/);
}

function testTVAAcomptesRS() {
  // Note : en Belgique, les déclarations TVA se font via Intervat (mensuel/trimestriel)
  // Cette commande calcule des acomptes indicatifs (simulation)
  const output = runCalc(["tva-acomptes-rs", "--tva-n-1=12000"]);
  assert.match(output, /Acompte indicatif periode 1 \(55%\): 6600,00 EUR/);
  assert.match(output, /Total acomptes indicatifs: 11400,00 EUR/);
}

function testProrata() {
  const output = runCalc(["prorata", "--montant=1000", "--jours=50", "--base=365"]);
  assert.match(output, /Resultat: 136,99 EUR/);
}

function main() {
  testCCA();
  testAmortissementLineaire();
  testISOCTauxUnique();
  testISOCTauxOneMeansOnePercent();
  testISOCNegative();
  testISOCProratedReducedRate();
  testTVAAcomptesRS();
  testProrata();
  console.log("Deterministic calculation tests passed (droit belge — CIR 92).");
}

main();
