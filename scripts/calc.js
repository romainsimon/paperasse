#!/usr/bin/env node

/**
 * Calculateur comptable/fiscal deterministe.
 *
 * Objectif:
 * - Eviter les calculs "a la main" par le LLM
 * - Centraliser les formules utilisees dans le skill comptable
 *
 * Usage:
 *   node scripts/calc.js <commande> [--param valeur]
 *
 * Commandes:
 *   cca
 *     --total 1200
 *     --jours-n-plus-1 92
 *     --jours-totaux 365
 *
 *   amortissement-lineaire
 *     --valeur 3000
 *     --duree 3
 *     [--jours-utilises 200]
 *     [--base-jours 365]
 *
 *   is
 *     --resultat-fiscal 50000
 *     [--taux 25]                          // taux unique (%)
 *     [--taux-reduit 15 --plafond 42500 --taux-normal 25]
 *     [--jours-exercice 365]
 *
 *   tva-acomptes-rs
 *     --tva-n-1 12000
 *
 *   prorata
 *     --montant 1000
 *     --jours 50
 *     [--base 365]
 */

function fail(msg) {
  console.error("Erreur: " + msg);
  process.exit(1);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const eq = token.indexOf("=");
      if (eq > 2) {
        const key = token.slice(2, eq);
        const value = token.slice(eq + 1);
        args[key] = value;
        continue;
      }
      const key = token.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = value;
        i++;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

function parseIntStrict(value, name) {
  if (value === undefined) fail("parametre manquant --" + name);
  if (!/^-?\d+$/.test(String(value))) fail("entier invalide pour --" + name + ": " + value);
  return Number(value);
}

function parseAmountToCents(value, name) {
  if (value === undefined) fail("parametre manquant --" + name);
  const raw = String(value).trim().replace(/\s/g, "").replace(",", ".");
  if (!/^-?\d+(\.\d{1,2})?$/.test(raw)) {
    fail("montant invalide pour --" + name + ": " + value);
  }
  const neg = raw.startsWith("-");
  const abs = neg ? raw.slice(1) : raw;
  const [euros, decimals = ""] = abs.split(".");
  const centsStr = euros + decimals.padEnd(2, "0");
  const cents = BigInt(centsStr);
  return neg ? -cents : cents;
}

function parseRateToBps(value, name) {
  if (value === undefined) fail("parametre manquant --" + name);
  const raw = String(value).trim().replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(raw)) fail("taux invalide pour --" + name + ": " + value);
  const num = Number(raw);
  if (Number.isNaN(num)) fail("taux invalide pour --" + name + ": " + value);
  return BigInt(Math.round(num * 100)); // 1% = 100 bps
}

function roundDivSigned(numer, denom) {
  if (denom <= 0n) fail("denominateur doit etre > 0");
  if (numer >= 0n) return (numer + denom / 2n) / denom;
  return -((-numer + denom / 2n) / denom);
}

function prorateAnnualThreshold(thresholdCents, exerciseDays) {
  if (exerciseDays === null) return thresholdCents;
  if (exerciseDays <= 0n) fail("--jours-exercice doit etre > 0");
  return roundDivSigned(thresholdCents * exerciseDays, 365n);
}

function formatCents(cents) {
  const neg = cents < 0n;
  const abs = neg ? -cents : cents;
  const euros = abs / 100n;
  const dec = (abs % 100n).toString().padStart(2, "0");
  const text = euros.toString() + "," + dec + " EUR";
  return neg ? "-" + text : text;
}

function printResult(title, rows) {
  console.log(title);
  console.log("=".repeat(title.length));
  for (const [k, v] of rows) {
    console.log(k + ": " + v);
  }
}

function cmdCCA(args) {
  const total = parseAmountToCents(args.total, "total");
  const joursN1 = BigInt(parseIntStrict(args["jours-n-plus-1"], "jours-n-plus-1"));
  const joursTotaux = BigInt(parseIntStrict(args["jours-totaux"], "jours-totaux"));
  if (joursN1 < 0n) fail("--jours-n-plus-1 doit etre >= 0");
  if (joursTotaux <= 0n) fail("--jours-totaux doit etre > 0");

  const cca = roundDivSigned(total * joursN1, joursTotaux);
  printResult("Calcul CCA", [
    ["Formule", "CCA = Montant total x (Jours N+1 / Jours totaux)"],
    ["Montant total", formatCents(total)],
    ["Jours N+1", String(joursN1)],
    ["Jours totaux", String(joursTotaux)],
    ["CCA", formatCents(cca)],
  ]);
}

function cmdProrata(args) {
  const montant = parseAmountToCents(args.montant, "montant");
  const jours = BigInt(parseIntStrict(args.jours, "jours"));
  const base = BigInt(parseIntStrict(args.base || 365, "base"));
  if (jours < 0n) fail("--jours doit etre >= 0");
  if (base <= 0n) fail("--base doit etre > 0");

  const value = roundDivSigned(montant * jours, base);
  printResult("Calcul Prorata", [
    ["Formule", "Montant prorata = Montant x (Jours / Base)"],
    ["Montant", formatCents(montant)],
    ["Jours", String(jours)],
    ["Base", String(base)],
    ["Resultat", formatCents(value)],
  ]);
}

function cmdAmortissementLineaire(args) {
  const valeur = parseAmountToCents(args.valeur, "valeur");
  const duree = BigInt(parseIntStrict(args.duree, "duree"));
  if (duree <= 0n) fail("--duree doit etre > 0");

  const annuitePleine = roundDivSigned(valeur, duree);
  const joursUtilises = args["jours-utilises"] !== undefined
    ? BigInt(parseIntStrict(args["jours-utilises"], "jours-utilises"))
    : null;
  const baseJours = BigInt(parseIntStrict(args["base-jours"] || 365, "base-jours"));
  if (baseJours <= 0n) fail("--base-jours doit etre > 0");

  if (joursUtilises !== null && joursUtilises < 0n) fail("--jours-utilises doit etre >= 0");

  const dotation = joursUtilises === null
    ? annuitePleine
    : roundDivSigned(annuitePleine * joursUtilises, baseJours);

  const rows = [
    ["Formule annuite", "Annuite = Valeur brute / Duree"],
    ["Valeur brute", formatCents(valeur)],
    ["Duree", String(duree) + " an(s)"],
    ["Annuite pleine", formatCents(annuitePleine)],
  ];

  if (joursUtilises !== null) {
    rows.push(["Formule prorata", "Dotation = Annuite x (Jours utilises / Base jours)"]);
    rows.push(["Jours utilises", String(joursUtilises)]);
    rows.push(["Base jours", String(baseJours)]);
    rows.push(["Dotation periode", formatCents(dotation)]);
  } else {
    rows.push(["Dotation periode", formatCents(dotation)]);
  }

  printResult("Calcul Amortissement Lineaire", rows);
}

function cmdIS(args) {
  const resultatFiscal = parseAmountToCents(args["resultat-fiscal"], "resultat-fiscal");
  if (resultatFiscal <= 0n) {
    printResult("Calcul IS", [
      ["Resultat fiscal", formatCents(resultatFiscal)],
      ["IS", "0,00 EUR (resultat fiscal <= 0)"],
    ]);
    return;
  }

  let totalIS = 0n;
  let mode = "";
  const rows = [["Resultat fiscal", formatCents(resultatFiscal)]];

  if (args.taux !== undefined) {
    const tauxBps = parseRateToBps(args.taux, "taux");
    totalIS = roundDivSigned(resultatFiscal * tauxBps, 10000n);
    mode = "taux unique";
    rows.push(["Mode", mode]);
    rows.push(["Taux", args.taux + " %"]);
    rows.push(["Formule", "IS = Resultat fiscal x Taux"]);
  } else if (
    args["taux-reduit"] !== undefined ||
    args["taux-normal"] !== undefined ||
    args.plafond !== undefined
  ) {
    const tauxReduitBps = parseRateToBps(args["taux-reduit"] ?? 15, "taux-reduit");
    const tauxNormalBps = parseRateToBps(args["taux-normal"] ?? 25, "taux-normal");
    const plafondAnnuel = parseAmountToCents(args.plafond ?? 42500, "plafond");
    const joursExercice = args["jours-exercice"] !== undefined
      ? BigInt(parseIntStrict(args["jours-exercice"], "jours-exercice"))
      : null;
    const plafond = prorateAnnualThreshold(plafondAnnuel, joursExercice);

    const trancheReduite = resultatFiscal < plafond ? resultatFiscal : plafond;
    const trancheNormale = resultatFiscal > plafond ? (resultatFiscal - plafond) : 0n;
    const isReduit = roundDivSigned(trancheReduite * tauxReduitBps, 10000n);
    const isNormal = roundDivSigned(trancheNormale * tauxNormalBps, 10000n);
    totalIS = isReduit + isNormal;
    mode = "deux tranches";

    rows.push(["Mode", mode]);
    rows.push(["Plafond annuel taux reduit", formatCents(plafondAnnuel)]);
    if (joursExercice !== null) {
      rows.push(["Jours exercice", String(joursExercice)]);
    }
    rows.push(["Plafond taux reduit applique", formatCents(plafond)]);
    rows.push(["Taux reduit", String(args["taux-reduit"] ?? 15) + " %"]);
    rows.push(["Taux normal", String(args["taux-normal"] ?? 25) + " %"]);
    rows.push(["Tranche reduite", formatCents(trancheReduite)]);
    rows.push(["Tranche normale", formatCents(trancheNormale)]);
    rows.push(["IS tranche reduite", formatCents(isReduit)]);
    rows.push(["IS tranche normale", formatCents(isNormal)]);
  } else {
    fail("pour la commande is, fournir --taux OU (--taux-reduit/--taux-normal/--plafond)");
  }

  rows.push(["IS total", formatCents(totalIS)]);
  printResult("Calcul IS", rows);
}

function cmdTVAAcomptesRS(args) {
  const tvaN1 = parseAmountToCents(args["tva-n-1"], "tva-n-1");
  const a1 = roundDivSigned(tvaN1 * 55n, 100n);
  const a2 = roundDivSigned(tvaN1 * 40n, 100n);
  const total = a1 + a2;

  printResult("Calcul Acomptes TVA Regime Simplifie", [
    ["TVA N-1", formatCents(tvaN1)],
    ["Acompte juillet (55%)", formatCents(a1)],
    ["Acompte decembre (40%)", formatCents(a2)],
    ["Total acomptes", formatCents(total)],
  ]);
}

function help() {
  console.log("Calculateur comptable/fiscal deterministe");
  console.log("");
  console.log("Usage: node scripts/calc.js <commande> [--param valeur]");
  console.log("");
  console.log("Commandes:");
  console.log("  cca");
  console.log("  amortissement-lineaire");
  console.log("  is");
  console.log("  tva-acomptes-rs");
  console.log("  prorata");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const cmd = args._[0];

  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
    help();
    return;
  }

  switch (cmd) {
    case "cca":
      cmdCCA(args);
      break;
    case "amortissement-lineaire":
      cmdAmortissementLineaire(args);
      break;
    case "is":
      cmdIS(args);
      break;
    case "tva-acomptes-rs":
      cmdTVAAcomptesRS(args);
      break;
    case "prorata":
      cmdProrata(args);
      break;
    default:
      fail("commande inconnue: " + cmd + ". Lancez: node scripts/calc.js --help");
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  cmdAmortissementLineaire,
  cmdCCA,
  cmdIS,
  cmdProrata,
  cmdTVAAcomptesRS,
  formatCents,
  parseAmountToCents,
  parseRateToBps,
  prorateAnnualThreshold,
  roundDivSigned,
};
