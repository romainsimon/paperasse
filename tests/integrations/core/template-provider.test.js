const test = require('node:test');
const assert = require('node:assert/strict');

const {
  assertProviderDescriptor,
} = require('../../../integrations/core/provider-test-kit');
const templateProvider = require('../../../integrations/providers/template/provider');

test('template provider exposes a valid descriptor', () => {
  assert.equal(assertProviderDescriptor(templateProvider), templateProvider);
});

test('template provider marks fetchTransactions as intentionally unavailable', async () => {
  await assert.rejects(
    () => templateProvider.fetchTransactions(),
    /template provider does not fetch data/
  );
});
