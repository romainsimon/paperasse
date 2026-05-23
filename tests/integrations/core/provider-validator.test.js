const test = require('node:test');
const assert = require('node:assert/strict');

const {
  PROVIDER_CAPABILITIES,
  isProviderCapability,
} = require('../../../integrations/core/capabilities');

test('PROVIDER_CAPABILITIES contains the supported business capabilities', () => {
  assert.deepEqual(PROVIDER_CAPABILITIES, [
    'banking',
    'payments',
    'invoicing',
    'accounting',
    'payroll',
    'hr',
    'insurance',
  ]);
});

test('isProviderCapability accepts known capabilities', () => {
  assert.equal(isProviderCapability('banking'), true);
  assert.equal(isProviderCapability('payments'), true);
  assert.equal(isProviderCapability('accounting'), true);
});

test('isProviderCapability rejects ingestion mechanisms', () => {
  assert.equal(isProviderCapability('csv_import'), false);
  assert.equal(isProviderCapability('api'), false);
  assert.equal(isProviderCapability('mcp'), false);
});
