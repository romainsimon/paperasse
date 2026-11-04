#!/usr/bin/env node
/**
 * analyse-fec.js : contrôles déterministes d'un FEC (art. A. 47 A-1 LPF), sans dépendance.
 *
 * Usage :
 *   node scripts/analyse-fec.js --fec <fichier.txt> [--company company.json | --debut AAAAMMJJ --fin AAAAMMJJ] [--pcg <pcg.json>] [--json]
 *
 * Sortie : format, équilibres, numérotation, dates, balance par compte, détail du 455,
 * comptes inconnus du PCG et écritures à examiner. Le script constate, il ne qualifie pas :
 * la qualification fiscale (chef de redressement, base légale, risque) reste à faire dans le rapport.
 * Code de sortie : 0 si le fichier a pu être lu (même avec des anomalies), 2 si illisible.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const COLONNES = [
  "JournalCode", "JournalLib", "EcritureNum", "EcritureDate", "CompteNum", "CompteLib",
  "CompteAuxNum", "CompteAuxLib", "PieceRef", "PieceDate", "EcritureLib", "Debit", "Credit",
  "EcritureLet", "DateLet", "ValidDate", "Montantdevise", "Idevise",
];

// Libellés qui méritent une question (dépense possiblement personnelle). Indice, pas preuve.
const MOTS_A_EXAMINER = [
  "netflix", "spotify", "disney", "canal+", "deezer", "prime video", "amazon prime",
  "vacances", "voyage perso", "perso", "cadeau", "anniversaire", "mariage", "supermarché",
  "carrefour", "leclerc", "auchan", "monoprix", "salle de sport", "fitness", "coiffeur",
  "pressing", "loyer domicile", "crèche", "école",
];

function args(argv) {
  const out = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const v = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    out[k] = v;
  }
  return out;
}

function montant(s) {
  if (s === undefined || s === null || String(s).trim() === "") return 0;
  const n = Number(String(s).trim().replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

const cents = (x) => Math.round(x * 100);
const euros = (c) => (c / 100).toFixed(2);

function chargerPcg(chemin) {
  let p = chemin;
  if (!p) {
    const dir = path.join(__dirname, "..", "data");
    try {
      const f = fs.readdirSync(dir).filter((x) => /^pcg_\d{4}\.json$/.test(x)).sort().pop();
      if (f) p = path.join(dir, f);
    } catch (_) { /* pas de dossier data */ }
  }
  if (!p || !fs.existsSync(p)) return null;
  const d = JSON.parse(fs.readFileSync(p, "utf8"));
  return { fichier: path.basename(p), numeros: new Set((d.flat || []).map((x) => String(x.number))) };
}

// Racine PCG la plus longue qui préfixe le compte (sous-comptes admis).
function racinePcg(compte, pcg) {
  for (let l = compte.length; l >= 1; l--) {
    if (pcg.numeros.has(compte.slice(0, l))) return compte.slice(0, l);
  }
  return null;
}

function jourSemaine(aaaammjj) {
  const d = new Date(Date.UTC(+aaaammjj.slice(0, 4), +aaaammjj.slice(4, 6) - 1, +aaaammjj.slice(6, 8)));
  return d.getUTCDay(); // 0 dimanche, 6 samedi
}

function analyser(texte, opts) {
  const lignes = texte.split(/\r?\n/).filter((l) => l.trim() !== "");
  const anomalies = [];
  const entete = lignes[0].split("|").map((x) => x.trim());
  const format = {
    separateur: lignes[0].includes("|") ? "|" : (lignes[0].includes("\t") ? "tabulation" : "inconnu"),
    colonnes: entete.length,
    entete_conforme: COLONNES.every((c, i) => (entete[i] || "").toLowerCase() === c.toLowerCase()),
  };
  if (format.colonnes !== 18) anomalies.push({ controle: "format", detail: `${format.colonnes} colonnes au lieu de 18` });
  if (!format.entete_conforme) anomalies.push({ controle: "format", detail: "en-tête différent de l'ordre de l'art. A. 47 A-1 LPF" });

  const sep = format.separateur === "tabulation" ? "\t" : "|";
  const ecritures = new Map();
  const comptes = new Map();
  let totD = 0, totC = 0;
  const lignesFec = [];

  lignes.slice(1).forEach((l, i) => {
    const c = l.split(sep);
    const r = Object.fromEntries(COLONNES.map((k, j) => [k, (c[j] || "").trim()]));
    r._ligne = i + 2;
    const d = montant(r.Debit), cr = montant(r.Credit);
    if (Number.isNaN(d) || Number.isNaN(cr)) anomalies.push({ controle: "montants", ligne: r._ligne, detail: "montant illisible" });
    if (d < 0 || cr < 0) anomalies.push({ controle: "montants", ligne: r._ligne, detail: "montant négatif" });
    r._d = cents(d || 0); r._c = cents(cr || 0);
    totD += r._d; totC += r._c;
    lignesFec.push(r);

    const cle = `${r.JournalCode}|${r.EcritureNum}`;
    if (!ecritures.has(cle)) ecritures.set(cle, { journal: r.JournalCode, num: r.EcritureNum, date: r.EcritureDate, d: 0, c: 0, lignes: [] });
    const e = ecritures.get(cle); e.d += r._d; e.c += r._c; e.lignes.push(r._ligne);

    if (!comptes.has(r.CompteNum)) comptes.set(r.CompteNum, { compte: r.CompteNum, libelle: r.CompteLib, d: 0, c: 0, mouvements: 0 });
    const a = comptes.get(r.CompteNum); a.d += r._d; a.c += r._c; a.mouvements++;

    if (!r.PieceRef) anomalies.push({ controle: "pieces", ligne: r._ligne, detail: "PieceRef vide" });
    if (!/^\d{8}$/.test(r.EcritureDate)) anomalies.push({ controle: "dates", ligne: r._ligne, detail: `EcritureDate illisible : ${r.EcritureDate}` });
    else if (opts.debut && opts.fin && (r.EcritureDate < opts.debut || r.EcritureDate > opts.fin)) {
      anomalies.push({ controle: "dates", ligne: r._ligne, detail: `date ${r.EcritureDate} hors exercice ${opts.debut}-${opts.fin}` });
    }
  });

  const desequilibrees = [...ecritures.values()].filter((e) => e.d !== e.c)
    .map((e) => ({ journal: e.journal, num: e.num, debit: euros(e.d), credit: euros(e.c), ecart: euros(e.d - e.c) }));
  desequilibrees.forEach((e) => anomalies.push({ controle: "equilibre_ecriture", detail: `écriture ${e.journal}/${e.num} : écart ${e.ecart}` }));
  if (totD !== totC) anomalies.push({ controle: "equilibre_global", detail: `débits ${euros(totD)} / crédits ${euros(totC)}` });

  // Numérotation : continue sur l'ensemble des journaux (séquence unique), sinon journal par journal.
  const trous = [];
  const sansTrou = (nums) => {
    const n = [...new Set(nums.map((x) => parseInt(x, 10)).filter(Number.isFinite))].sort((a, b) => a - b);
    const t = [];
    for (let k = 1; k < n.length; k++) if (n[k] !== n[k - 1] + 1) t.push({ apres: n[k - 1], avant: n[k] });
    return t;
  };
  const tousNums = [...ecritures.values()].map((e) => e.num);
  const numerotation = sansTrou(tousNums).length === 0 ? "continue sur l'ensemble des journaux" : "par journal";
  if (numerotation === "par journal") {
    const parJournal = {};
    for (const e of ecritures.values()) (parJournal[e.journal] = parJournal[e.journal] || []).push(e.num);
    for (const [j, nums] of Object.entries(parJournal)) sansTrou(nums).forEach((t) => trous.push({ journal: j, ...t }));
  }
  trous.forEach((t) => anomalies.push({ controle: "numerotation", detail: `journal ${t.journal} : trou entre ${t.apres} et ${t.avant}` }));

  // Comptes et PCG.
  const pcg = chargerPcg(opts.pcg);
  const inconnus = [];
  const balance = [...comptes.values()].sort((a, b) => a.compte.localeCompare(b.compte)).map((a) => {
    const solde = a.d - a.c;
    const racine = pcg ? racinePcg(a.compte, pcg) : null;
    if (pcg && (!racine || racine.length < 3)) inconnus.push(a.compte);
    return { compte: a.compte, libelle: a.libelle, debit: euros(a.d), credit: euros(a.c), solde: euros(solde), sens: solde > 0 ? "débiteur" : solde < 0 ? "créditeur" : "soldé", mouvements: a.mouvements, racine_pcg: racine };
  });
  inconnus.forEach((c) => anomalies.push({ controle: "pcg", detail: `compte ${c} sans racine PCG d'au moins 3 chiffres` }));

  // Compte courant d'associé (455) : mouvements et solde.
  const l455 = lignesFec.filter((r) => r.CompteNum.startsWith("455"));
  const s455 = l455.reduce((s, r) => s + r._d - r._c, 0);
  const cca = {
    mouvements: l455.map((r) => ({ ligne: r._ligne, date: r.EcritureDate, libelle: r.EcritureLib, debit: euros(r._d), credit: euros(r._c), piece: r.PieceRef })),
    solde: euros(Math.abs(s455)),
    sens: s455 > 0 ? "débiteur (avance de la société à l'associé)" : s455 < 0 ? "créditeur (dette de la société envers l'associé)" : "soldé",
    interets_6615_ou_6618: lignesFec.filter((r) => /^661[58]/.test(r.CompteNum)).map((r) => ({ ligne: r._ligne, montant: euros(r._d - r._c), libelle: r.EcritureLib })),
  };

  // Écritures à examiner (indices).
  const aExaminer = [];
  for (const r of lignesFec) {
    const lib = `${r.EcritureLib} ${r.CompteLib}`.toLowerCase();
    const mot = MOTS_A_EXAMINER.find((m) => lib.includes(m));
    if (mot && /^6/.test(r.CompteNum)) aExaminer.push({ ligne: r._ligne, compte: r.CompteNum, libelle: r.EcritureLib, montant: euros(r._d - r._c), motif: `libellé « ${mot} » : dépense peut-être personnelle` });
    if (/^\d{8}$/.test(r.EcritureDate) && [0, 6].includes(jourSemaine(r.EcritureDate)) && /^625/.test(r.CompteNum)) {
      aExaminer.push({ ligne: r._ligne, compte: r.CompteNum, libelle: r.EcritureLib, montant: euros(r._d - r._c), motif: "déplacement ou réception daté d'un week-end" });
    }
    const m = Math.max(r._d, r._c);
    if (m >= 100000 && m % 10000 === 0 && /^6/.test(r.CompteNum)) aExaminer.push({ ligne: r._ligne, compte: r.CompteNum, libelle: r.EcritureLib, montant: euros(m), motif: "montant rond (centaines d'euros) sur une charge" });
  }

  // Totaux utiles.
  const somme = (pred) => [...comptes.values()].filter((a) => pred(a.compte)).reduce((s, a) => s + (a.d - a.c), 0);
  const charges = somme((c) => c.startsWith("6"));
  const produits = -somme((c) => c.startsWith("7"));
  const totaux = {
    charges: euros(charges), produits: euros(produits), resultat_comptable: euros(produits - charges),
    ca_70: euros(-somme((c) => c.startsWith("70"))),
    tva_collectee_4457: euros(-somme((c) => c.startsWith("4457"))),
    tva_deductible_4456: euros(somme((c) => c.startsWith("4456"))),
    dotations_68: euros(somme((c) => c.startsWith("68"))),
    immobilisations_2_hors_28: euros(somme((c) => c.startsWith("2") && !c.startsWith("28") && !c.startsWith("29"))),
  };

  return {
    fichier: opts.fec, lignes: lignesFec.length, ecritures: ecritures.size,
    format, numerotation, totaux_debit_credit: { debit: euros(totD), credit: euros(totC), equilibre: totD === totC },
    pcg: pcg ? pcg.fichier : "non chargé", anomalies, ecritures_desequilibrees: desequilibrees,
    trous_numerotation: trous, balance, compte_courant_455: cca, a_examiner: aExaminer, totaux,
  };
}

function texteRapport(r) {
  const L = [];
  L.push(`# Analyse FEC : ${path.basename(r.fichier)}`);
  L.push(`${r.lignes} lignes, ${r.ecritures} écritures, ${r.format.colonnes} colonnes, séparateur ${r.format.separateur}, PCG : ${r.pcg}`);
  L.push(`Numérotation : ${r.numerotation}`);
  L.push(`Débits ${r.totaux_debit_credit.debit} / Crédits ${r.totaux_debit_credit.credit} : ${r.totaux_debit_credit.equilibre ? "équilibré" : "DÉSÉQUILIBRÉ"}`);
  L.push("", "## Anomalies de forme (Axe 1)");
  if (!r.anomalies.length) L.push("Aucune.");
  r.anomalies.forEach((a) => L.push(`- [${a.controle}]${a.ligne ? ` ligne ${a.ligne}` : ""} ${a.detail}`));
  L.push("", "## Balance");
  L.push("| Compte | Libellé | Débit | Crédit | Solde | Sens |", "|---|---|---:|---:|---:|---|");
  r.balance.forEach((b) => L.push(`| ${b.compte} | ${b.libelle} | ${b.debit} | ${b.credit} | ${b.solde.replace("-", "")} | ${b.sens} |`));
  L.push("", "## Compte courant d'associé 455 (Axe 4)");
  L.push(`Solde : ${r.compte_courant_455.solde}, ${r.compte_courant_455.sens}`);
  r.compte_courant_455.mouvements.forEach((m) => L.push(`- ${m.date} ${m.libelle} : D ${m.debit} / C ${m.credit} (pièce ${m.piece || "absente"})`));
  if (r.compte_courant_455.interets_6615_ou_6618.length) L.push(`Intérêts comptabilisés : ${r.compte_courant_455.interets_6615_ou_6618.map((x) => x.montant).join(", ")}`);
  L.push("", "## Écritures à examiner (indices, à qualifier)");
  if (!r.a_examiner.length) L.push("Aucune.");
  r.a_examiner.forEach((x) => L.push(`- ligne ${x.ligne}, ${x.compte} « ${x.libelle} » ${x.montant} : ${x.motif}`));
  L.push("", "## Totaux");
  Object.entries(r.totaux).forEach(([k, v]) => L.push(`- ${k} : ${v}`));
  return L.join("\n");
}

function main() {
  const a = args(process.argv);
  if (!a.fec || a.fec === true) {
    console.error("Usage : node scripts/analyse-fec.js --fec <fichier> [--company company.json | --debut AAAAMMJJ --fin AAAAMMJJ] [--pcg <pcg.json>] [--json]");
    process.exit(2);
  }
  let texte;
  try { texte = fs.readFileSync(a.fec, "utf8"); } catch (e) { console.error(`FEC illisible : ${e.message}`); process.exit(2); }
  let { debut, fin } = a;
  if (a.company && a.company !== true && (!debut || !fin)) {
    try {
      const fy = JSON.parse(fs.readFileSync(a.company, "utf8")).fiscal_year || {};
      debut = debut || (fy.start || "").replace(/-/g, "");
      fin = fin || (fy.end || "").replace(/-/g, "");
    } catch (e) { console.error(`company.json illisible, dates d'exercice non contrôlées : ${e.message}`); }
  }
  const r = analyser(texte, { fec: a.fec, debut, fin, pcg: a.pcg });
  process.stdout.write(a.json ? JSON.stringify(r, null, 2) + "\n" : texteRapport(r) + "\n");
}

if (require.main === module) main();
module.exports = { analyser };
