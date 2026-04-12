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

function main() {
  testCCA();
  testAmortissementLineaire();
  testISTauxUnique();
  testISTauxOneMeansOnePercent();
  testISNegative();
  testISProratedReducedRate();
  testTVAAcomptesRS();
  testProrata();
  console.log("Deterministic calculation tests passed.");
}

main();
