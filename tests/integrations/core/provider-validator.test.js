const test = require('node:test');
const assert = require('node:assert/strict');

const {
  PROVIDER_CAPABILITIES,
  isProviderCapability,
} = require('../../../integrations/core/capabilities');
const {
  validateProviderDescriptor,
  validateNormalizedTransaction,
} = require('../../../integrations/core/provider-validator');

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

test('validateProviderDescriptor accepts a valid provider descriptor', () => {
  const result = validateProviderDescriptor({
    id: 'qonto-main',
    type: 'qonto',
    name: 'Qonto',
    capabilities: ['banking'],
  });

  assert.deepEqual(result, {
    valid: true,
    errors: [],
  });
});

test('validateProviderDescriptor rejects missing identity fields', () => {
  const result = validateProviderDescriptor({
    id: '',
    type: '',
    name: '',
    capabilities: ['banking'],
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'provider.id must be a non-empty string',
    'provider.type must be a non-empty string',
    'provider.name must be a non-empty string',
  ]);
});

test('validateProviderDescriptor rejects empty capabilities', () => {
  const result = validateProviderDescriptor({
    id: 'empty-provider',
    type: 'generic',
    name: 'Empty Provider',
    capabilities: [],
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'provider.capabilities must contain at least one capability',
  ]);
});

test('validateProviderDescriptor rejects unknown capabilities', () => {
  const result = validateProviderDescriptor({
    id: 'bad-provider',
    type: 'generic',
    name: 'Bad Provider',
    capabilities: ['banking', 'csv_import', 'api'],
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'provider.capabilities contains unsupported capability: csv_import',
    'provider.capabilities contains unsupported capability: api',
  ]);
});

test('validateNormalizedTransaction accepts a valid transaction', () => {
  const result = validateNormalizedTransaction({
    id: 'tx-1',
    source: 'qonto',
    date: '2026-05-23T10:30:00.000Z',
    amount: -42.5,
    currency: 'EUR',
    label: 'Software subscription',
    our_category: null,
    raw: {
      provider_id: 'raw-tx-1',
    },
  });

  assert.deepEqual(result, {
    valid: true,
    errors: [],
  });
});

test('validateNormalizedTransaction rejects missing required fields', () => {
  const result = validateNormalizedTransaction({
    id: '',
    source: '',
    date: '',
    amount: '42.5',
    currency: '',
    label: '',
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'transaction.id must be a non-empty string',
    'transaction.source must be a non-empty string',
    'transaction.date must be a non-empty ISO date string',
    'transaction.amount must be a finite number',
    'transaction.currency must be a non-empty string',
    'transaction.label must be a non-empty string',
    'transaction.raw must be present',
  ]);
});

test('validateNormalizedTransaction rejects invalid dates and amounts', () => {
  const result = validateNormalizedTransaction({
    id: 'tx-2',
    source: 'stripe',
    date: 'not-a-date',
    amount: Number.NaN,
    currency: 'EUR',
    label: 'Bad transaction',
    raw: {},
  });

  assert.equal(result.valid, false);
  assert.deepEqual(result.errors, [
    'transaction.date must be a non-empty ISO date string',
    'transaction.amount must be a finite number',
  ]);
});

test('core index exports contract utilities', () => {
  const core = require('../../../integrations/core');

  assert.equal(Array.isArray(core.PROVIDER_CAPABILITIES), true);
  assert.equal(typeof core.isProviderCapability, 'function');
  assert.equal(typeof core.validateProviderDescriptor, 'function');
  assert.equal(typeof core.validateNormalizedTransaction, 'function');
  assert.equal(typeof core.assertProviderDescriptor, 'function');
  assert.equal(typeof core.assertNormalizedTransactions, 'function');
  assert.equal(typeof core.runProviderContractChecks, 'function');
  assert.equal(core.PROVIDER_CONTRACT_VERSION, '1.0.0');
});
