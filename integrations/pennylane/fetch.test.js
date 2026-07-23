/**
 * Tests du connecteur Pennylane. Aucun appel réseau ni donnée réelle.
 * Exécution : node integrations/pennylane/fetch.test.js
 */

const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const fixture = require('./fixtures/transactions-pages.json');
const {
  buildTransactionsParams,
  getAllTransactions,
  transformTransaction,
  parseArgs,
  isPennylaneDisabled,
  writeTransactionsFile
} = require('./fetch');

let passed = 0;
async function test(name, fn) {
  await fn();
  passed++;
  console.log(`  ✓ ${name}`);
}

async function run() {
  console.log('buildTransactionsParams');

  await test('encode les dates dans le filtre JSON attendu par Pennylane', () => {
    const params = buildTransactionsParams({
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      cursor: 'next-page'
    });
    assert.strictEqual(params.get('limit'), '100');
    assert.strictEqual(params.get('sort'), 'id');
    assert.strictEqual(params.get('cursor'), 'next-page');
    assert.deepStrictEqual(JSON.parse(params.get('filter')), [
      { field: 'date', operator: 'gteq', value: '2025-01-01' },
      { field: 'date', operator: 'lteq', value: '2025-12-31' }
    ]);
  });

  await test('rejette une période inversée ou une option inconnue', () => {
    assert.throws(
      () => parseArgs(['--start', '2025-12-31', '--end', '2025-01-01']),
      /--start doit être antérieure/
    );
    assert.throws(() => parseArgs(['--start', '2025-02-31']), /format YYYY-MM-DD/);
    assert.throws(() => parseArgs(['--token', 'secret']), /Option inconnue/);
  });

  console.log('getAllTransactions');

  await test('suit next_cursor et transmet le token sans le placer dans l’URL', async () => {
    const requestedUrls = [];
    const requestedHeaders = [];
    let pageIndex = 0;
    const fetchImpl = async (url, init) => {
      requestedUrls.push(url);
      requestedHeaders.push(init.headers);
      const page = fixture.pages[pageIndex++];
      return {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: async () => page
      };
    };

    const transactions = await getAllTransactions({
      token: 'test-token-not-a-secret',
      fetchImpl,
      apiBase: 'https://example.invalid/api',
      startDate: '2025-01-01'
    });

    assert.strictEqual(transactions.length, 2);
    assert.strictEqual(requestedUrls.length, 2);
    assert.match(requestedUrls[1], /cursor=cursor-page-2/);
    assert.ok(requestedUrls.every(url => !url.includes('test-token-not-a-secret')));
    assert.ok(requestedHeaders.every(headers => headers.Authorization === 'Bearer test-token-not-a-secret'));
  });

  await test('échoue si has_more ne fournit pas de nouveau curseur', async () => {
    const fetchImpl = async () => ({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ has_more: true, next_cursor: null, items: [] })
    });
    await assert.rejects(
      getAllTransactions({ token: 'test', fetchImpl }),
      /next_cursor absent ou répété/
    );
  });

  await test('échoue aussi si Pennylane répète le même curseur', async () => {
    let calls = 0;
    const fetchImpl = async () => ({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ has_more: true, next_cursor: 'same-cursor', items: [{ id: ++calls }] })
    });
    await assert.rejects(
      getAllTransactions({ token: 'test', fetchImpl }),
      /next_cursor absent ou répété/
    );
    assert.strictEqual(calls, 2);
  });

  console.log('transformTransaction');

  await test('normalise montant, compte, catégorie et statut au format Paperasse', () => {
    const normalized = transformTransaction(fixture.pages[0].items[0]);
    assert.deepStrictEqual(
      {
        id: normalized.id,
        source: normalized.source,
        account_id: normalized.account_id,
        date: normalized.date,
        amount: normalized.amount,
        amount_eur: normalized.amount_eur,
        currency: normalized.currency,
        fee: normalized.fee,
        fee_eur: normalized.fee_eur,
        label: normalized.label,
        reference: normalized.reference,
        category: normalized.category,
        categories: normalized.categories,
        status: normalized.status,
        attachment_required: normalized.attachment_required,
        our_category: normalized.our_category
      },
      {
        id: 'pennylane-101',
        source: 'pennylane',
        account_id: '53',
        date: '2025-02-14',
        amount: -120.5,
        amount_eur: -120.5,
        currency: 'EUR',
        fee: -0.5,
        fee_eur: -0.5,
        label: 'VIR SEPA FOURNISSEUR DEMO',
        reference: 'VIR-DEMO-101',
        category: 'Hébergement',
        categories: ['Hébergement'],
        status: 'completed',
        attachment_required: true,
        our_category: null
      }
    );
    assert.strictEqual(normalized.raw.id, 101);
  });

  await test('préserve le montant en devise et le montant EUR', () => {
    const normalized = transformTransaction(fixture.pages[1].items[0]);
    assert.strictEqual(normalized.amount, 50);
    assert.strictEqual(normalized.amount_eur, 45);
    assert.strictEqual(normalized.currency, 'USD');
    assert.strictEqual(normalized.fee, null);
    assert.strictEqual(normalized.fee_eur, null);
    assert.strictEqual(normalized.label, 'Transaction Pennylane 102');
    assert.strictEqual(normalized.status, 'archived');
  });

  console.log('configuration et écriture');

  await test('respecte enabled=false dans company.json', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paperasse-pennylane-config-'));
    const companyPath = path.join(tempDir, 'company.json');
    try {
      assert.strictEqual(isPennylaneDisabled(companyPath), false);
      fs.writeFileSync(companyPath, JSON.stringify({ pennylane: { enabled: false } }));
      assert.strictEqual(isPennylaneDisabled(companyPath), true);
      fs.writeFileSync(companyPath, JSON.stringify({ pennylane: { enabled: true } }));
      assert.strictEqual(isPennylaneDisabled(companyPath), false);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  await test('écrit le tableau JSON normalisé complet dans le fichier cible', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paperasse-pennylane-output-'));
    const outputFile = path.join(tempDir, 'data', 'transactions', 'pennylane.json');
    try {
      const written = writeTransactionsFile([fixture.pages[0].items[0]], outputFile);
      const saved = JSON.parse(fs.readFileSync(outputFile, 'utf-8'));
      assert.deepStrictEqual(saved, written);
      assert.deepStrictEqual(saved[0], transformTransaction(fixture.pages[0].items[0]));
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  console.log(`\n${passed} test(s) OK`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
