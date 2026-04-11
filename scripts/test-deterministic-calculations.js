#!/usr/bin/env node

const assert = require("assert");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

function runNodeScript(scriptPath, args) {
  return execFileSync(process.execPath, [scriptPath, ...args], {
    cwd: ROOT,
    encoding: "utf8",
  });
}

function testCliProratedReducedRate() {
  const output = runNodeScript(path.join(ROOT, "scripts", "calc.js"), [
    "is",
    "--resultat-fiscal=50000",
    "--taux-reduit=15",
    "--taux-normal=25",
    "--jours-exercice=182",
  ]);

  assert.match(output, /Plafond taux reduit applique: 21191,78 EUR/);
  assert.match(output, /IS total: 10380,83 EUR/);
}

function main() {
  testCliProratedReducedRate();
  console.log("Deterministic calculation tests passed.");
}

main();
