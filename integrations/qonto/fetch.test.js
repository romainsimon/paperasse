/**
 * Tests du connecteur Qonto (integrations/qonto/fetch.js).
 * Exécution : node integrations/qonto/fetch.test.js
 *
 * Couvre la régression #54 : le filtre de date doit porter sur settled_at
 * (date de règlement) et non sur updated_at (date de modification), sinon des
 * transactions réglées dans la période sont silencieusement exclues.
 */

const assert = require('node:assert');
const { buildTransactionsParams, findBalanceDiscontinuities } = require('./fetch');

let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

console.log('buildTransactionsParams');

test('mappe les bornes de période sur settled_at_from / settled_at_to', () => {
  const p = buildTransactionsParams('FR76', {
    settled_at_from: '2025-07-01',
    settled_at_to: '2026-06-30'
  });
  assert.strictEqual(p.get('settled_at_from'), '2025-07-01');
  assert.strictEqual(p.get('settled_at_to'), '2026-06-30');
  // Régression #54 : ne doit PAS retomber sur updated_at.
  assert.strictEqual(p.get('updated_at_from'), null);
  assert.strictEqual(p.get('updated_at_to'), null);
});

test('applique le statut completed par défaut', () => {
  const p = buildTransactionsParams('FR76', {});
  assert.strictEqual(p.get('status'), 'completed');
  assert.strictEqual(p.get('iban'), 'FR76');
});

console.log('findBalanceDiscontinuities');

test('ne signale aucune rupture sur une suite de soldes cohérente', () => {
  const txs = [
    { settled_at: '2025-07-01T10:00:00Z', side: 'credit', amount: 100, settled_balance: 1100 },
    { settled_at: '2025-07-02T10:00:00Z', side: 'debit', amount: 40, settled_balance: 1060 },
    { settled_at: '2025-07-03T10:00:00Z', side: 'credit', amount: 200, settled_balance: 1260 }
  ];
  assert.deepStrictEqual(findBalanceDiscontinuities(txs), []);
});

test('détecte une transaction manquante via la rupture de solde', () => {
  // Entre la 1ère et la 2e, une opération de -50 est absente de l'export :
  // solde attendu 1100 - 40 = 1060, mais le solde réel est 1010.
  const txs = [
    { settled_at: '2025-07-01T10:00:00Z', side: 'credit', amount: 100, settled_balance: 1100 },
    { settled_at: '2025-07-02T10:00:00Z', side: 'debit', amount: 40, settled_balance: 1010, label: 'X' }
  ];
  const gaps = findBalanceDiscontinuities(txs);
  assert.strictEqual(gaps.length, 1);
  assert.strictEqual(gaps[0].expected_balance, 1060);
  assert.strictEqual(gaps[0].actual_balance, 1010);
  assert.strictEqual(gaps[0].gap, -50);
});

console.log(`\n${passed} test(s) OK`);
