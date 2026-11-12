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

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`ok - ${name}`); } catch (e) { failures++; console.log(`not ok - ${name}\n  ${e.message}`); }
}

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
