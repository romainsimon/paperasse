const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assertProviderDescriptor,
  assertNormalizedTransactions,
  runProviderContractChecks,
} = require('../../../integrations/core/provider-test-kit');

test('assertProviderDescriptor returns the provider when valid', () => {
  const provider = {
    id: 'generic-bank-import',
    type: 'generic',
    name: 'Generic Bank Import',
    capabilities: ['banking'],
  };

  assert.equal(assertProviderDescriptor(provider), provider);
});

test('assertProviderDescriptor throws when invalid', () => {
  assert.throws(
    () => assertProviderDescriptor({
      id: 'bad-provider',
      type: 'generic',
      name: 'Bad Provider',
      capabilities: ['csv_import'],
    }),
    /provider contract failed: provider.capabilities contains unsupported capability: csv_import/
  );
});

test('assertNormalizedTransactions accepts valid transactions', () => {
  const transactions = [
    {
      id: 'tx-1',
      source: 'generic',
      date: '2026-05-23T10:30:00.000Z',
      amount: 100,
      currency: 'EUR',
      label: 'Client payment',
      raw: {},
    },
  ];

  assert.equal(assertNormalizedTransactions(transactions), transactions);
});

test('assertNormalizedTransactions throws with item index', () => {
  assert.throws(
    () => assertNormalizedTransactions([
      {
        id: '',
        source: 'generic',
        date: '2026-05-23T10:30:00.000Z',
        amount: 100,
        currency: 'EUR',
        label: 'Client payment',
        raw: {},
      },
    ]),
    /transaction contract failed at index 0: transaction.id must be a non-empty string/
  );
});

test('runProviderContractChecks validates provider and transaction output', async () => {
  const provider = {
    id: 'generic-bank-import',
    type: 'generic',
    name: 'Generic Bank Import',
    capabilities: ['banking'],
    async fetchTransactions() {
      return [
        {
          id: 'tx-1',
          source: 'generic',
          date: '2026-05-23T10:30:00.000Z',
          amount: 100,
          currency: 'EUR',
          label: 'Client payment',
          raw: {},
        },
      ];
    },
  };

  const result = await runProviderContractChecks(provider, {
    transactionsMethod: 'fetchTransactions',
  });

  assert.deepEqual(result, {
    provider_id: 'generic-bank-import',
    provider_type: 'generic',
    capabilities: ['banking'],
    transaction_count: 1,
  });
});
