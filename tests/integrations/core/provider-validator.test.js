const test = require('node:test');
const assert = require('node:assert/strict');

const {
  PROVIDER_CAPABILITIES,
  isProviderCapability,
} = require('../../../integrations/core/capabilities');
const {
  validateProviderDescriptor,
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
