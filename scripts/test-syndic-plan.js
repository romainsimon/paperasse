#!/usr/bin/env node
// Non-regression checks for the syndic chart of accounts (arrêté du 14 mars 2005, art. 7).
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.join(__dirname, '..', 'syndic');
const plan = JSON.parse(fs.readFileSync(path.join(root, 'data', 'plan-comptable-copro.json'), 'utf8'));
const accounts = new Map();
for (const c of plan.classes) for (const a of c.accounts) accounts.set(a.number, a);

// Article 7 of the arrêté du 14 mars 2005 (version in force since 31/12/2020), verbatim.
// Two-digit group headings are not accounts, except 12 (used directly by art. 10) and 53, 65, 68, 78 (no subdivision).
// 1032 appears in the text only as « (Supprimé) ».
const ARTICLE_7 = [
  ["102", "Provisions pour travaux décidés"],
  ["103", "Avances"],
  ["1031", "Avances de trésorerie"],
  ["1033", "Autres avances"],
  ["105", "Fonds de travaux"],
  ["106", "Provisions pour travaux au titre de la délégation de pouvoirs accordée au conseil syndical en application de l'article 21-1 de la loi susvisée"],
  ["12", "Solde en attente sur travaux et opérations exceptionnelles"],
  ["12-1", "Travaux décidés par l'assemblée générale"],
  ["12-2", "Travaux délégués au conseil syndical en application de l'article 21-1 de la loi susvisée"],
  ["131", "Subventions accordées en instance de versement"],
  ["401", "Factures parvenues"],
  ["408", "Factures non parvenues"],
  ["409", "Fournisseurs débiteurs"],
  ["421", "Rémunérations dues"],
  ["431", "Sécurité sociale"],
  ["432", "Autres organismes sociaux"],
  ["441", "Etat et autres organismes - subventions à recevoir"],
  ["442", "Etat - impôts et versements assimilés"],
  ["443", "Collectivités territoriales - aides"],
  ["450", "Copropriétaire individualisé"],
  ["450-1", "Copropriétaire - budget prévisionnel"],
  ["450-2", "Copropriétaire - travaux de l'article 14-2 de la loi susvisée et opérations exceptionnelles"],
  ["450-3", "Copropriétaire - avances"],
  ["450-4", "Copropriétaire - emprunts"],
  ["450-5", "Copropriétaire-fonds de travaux"],
  ["459", "Copropriétaire - créances douteuses"],
  ["461", "Débiteurs divers"],
  ["462", "Créditeurs divers"],
  ["471", "Compte en attente d'imputation débiteur"],
  ["472", "Compte en attente d'imputation créditeur"],
  ["486", "Charges payées d'avance"],
  ["487", "Produits encaissés d'avance"],
  ["491", "Copropriétaires"],
  ["492", "Personnes autres que les copropriétaires"],
  ["501", "Compte à terme"],
  ["502", "Autre compte"],
  ["512", "Banques"],
  ["514", "Chèques postaux"],
  ["53", "Caisse"],
  ["601", "Eau"],
  ["602", "Electricité"],
  ["603", "Chauffage, énergie et combustibles"],
  ["604", "Achats produits d'entretien et petits équipements"],
  ["605", "Matériel"],
  ["606", "Fournitures"],
  ["611", "Nettoyage des locaux"],
  ["612", "Locations immobilières"],
  ["613", "Locations mobilières"],
  ["614", "Contrats de maintenance"],
  ["615", "Entretien et petites réparations"],
  ["616", "Primes d'assurances"],
  ["621", "Rémunérations du syndic sur gestion copropriété"],
  ["6211", "Rémunération du syndic"],
  ["6212", "Débours"],
  ["6213", "Frais postaux"],
  ["622", "Autres honoraires du syndic"],
  ["6221", "Honoraires travaux"],
  ["6222", "Prestations particulières"],
  ["6223", "Autres honoraires"],
  ["623", "Rémunérations de tiers intervenants"],
  ["624", "Frais du conseil syndical"],
  ["632", "Taxe de balayage"],
  ["633", "Taxe foncière"],
  ["634", "Autres impôts et taxes"],
  ["641", "Salaires"],
  ["642", "Charges sociales et organismes sociaux"],
  ["643", "Taxe sur les salaires"],
  ["644", "Autres (médecine du travail, mutuelles, etc.)"],
  ["65", "Montant spécifique alloué au conseil syndical, au sein du budget prévisionnel, pour l'exercice de sa délégation de pouvoirs en application de l'article 21-1 de la loi susvisée"],
  ["661", "Remboursement d'annuités d'emprunt"],
  ["662", "Autres charges financières et agios"],
  ["671", "Travaux décidés par l'assemblée générale"],
  ["672", "Travaux urgents"],
  ["673", "Etudes techniques, diagnostic, consultation"],
  ["674", "Travaux délégués au conseil syndical en application de l'article 21-1 de la loi susvisée"],
  ["677", "Pertes sur créances irrécouvrables"],
  ["678", "Charges exceptionnelles"],
  ["68", "Dotations aux dépréciations sur créances douteuses"],
  ["701", "Provisions sur opérations courantes"],
  ["702", "Provisions sur travaux du I de l'article 14-2 et opérations exceptionnelles"],
  ["703", "Avances"],
  ["704", "Remboursements d'annuités d'emprunts"],
  ["705", "Affectation du fonds de travaux"],
  ["706", "Provisions au titre de la délégation de pouvoirs accordée au conseil syndical en application de l'article 21-1 de la loi susvisée"],
  ["706-1", "Provisions sur opérations courantes"],
  ["706-2", "Provisions sur travaux et opérations exceptionnelles"],
  ["711", "Subventions"],
  ["712", "Emprunts"],
  ["713", "Indemnités d'assurances"],
  ["714", "Produits divers (dont intérêts légaux dus par les copropriétaires)"],
  ["716", "Produits financiers"],
  ["718", "Produits exceptionnels"],
  ["78", "Reprises de dépréciations sur créances douteuses"]
];

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`ok - ${name}`); } catch (e) { failures++; console.log(`not ok - ${name}\n  ${e.message}`); }
}

check('the chart is exactly article 7 (numbers, labels, order)', () => {
  const actual = [...accounts.values()].map((a) => [a.number, a.label]);
  assert.deepStrictEqual(actual, ARTICLE_7);
});

check('every account used in an accounting entry exists in the chart', () => {
  const text = fs.readFileSync(path.join(root, 'references', 'comptabilite-copro.md'), 'utf8');
  for (const m of text.matchAll(/^(?:Débit|Crédit)\s+(\d[\d-]*)\b/gm)) {
    assert(accounts.has(m[1]), `entry uses ${m[1]}, which is not in the chart`);
  }
});

check('no general chart (PCG) or deleted accounts', () => {
  for (const n of ['411', '412', '413', '414', '488', '489', '503', '1032']) {
    assert(!accounts.has(n), `${n} must not be an active account`);
  }
});

check('key labels match article 7', () => {
  const expected = {
    '450': 'Copropriétaire individualisé',
    '471': "Compte en attente d'imputation débiteur",
    '472': "Compte en attente d'imputation créditeur",
    '501': 'Compte à terme',
    '512': 'Banques',
    '671': "Travaux décidés par l'assemblée générale",
    '677': 'Pertes sur créances irrécouvrables',
  };
  for (const [n, label] of Object.entries(expected)) {
    assert(accounts.has(n), `${n} missing`);
    assert.strictEqual(accounts.get(n).label, label, `label of ${n}`);
  }
});

check('the Qonto guide reconciles with the bank account 512, not 501', () => {
  const doc = fs.readFileSync(path.join(root, 'references', 'integration-qonto.md'), 'utf8');
  assert(!/compte 501\)|solde du compte 501/.test(doc), 'integration-qonto.md still reconciles with 501');
  assert(/solde du compte 512/.test(doc), 'integration-qonto.md should reconcile with 512');
  for (const n of ['617', '618', '619', '625']) {
    assert(!new RegExp(`\\| ${n} `).test(doc), `${n} is not in the copro chart`);
  }
});

check('every account in the reference tables exists in the chart', () => {
  const docs = ['comptabilite-copro.md', 'integration-qonto.md'];
  for (const f of docs) {
    const text = fs.readFileSync(path.join(root, 'references', f), 'utf8');
    for (const m of text.matchAll(/^\|\s*\**(\d[\d-]*)\**\s*\|/gm)) {
      assert(accounts.has(m[1]), `${f}: ${m[1]} is not in data/plan-comptable-copro.json`);
    }
    for (const m of text.matchAll(/^\|[^|]+\|\s*(\d{2,4}(?:-\d)?) [A-ZÉ]/gm)) {
      assert(accounts.has(m[1]), `${f}: ${m[1]} is not in data/plan-comptable-copro.json`);
    }
  }
});

check('works call credits 102, not 702 directly', () => {
  const text = fs.readFileSync(path.join(root, 'references', 'comptabilite-copro.md'), 'utf8');
  const block = text.split('### Appel pour travaux votés')[1].split('###')[0];
  assert(/Crédit 102/.test(block), 'the works call should credit 102');
  assert(!/Crédit 702/.test(block), 'the works call must not credit 702 directly');
});

if (failures) { console.log(`\n${failures} check(s) failed`); process.exit(1); }
console.log('\nAll syndic chart checks passed.');
