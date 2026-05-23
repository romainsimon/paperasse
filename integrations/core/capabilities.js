const PROVIDER_CAPABILITIES = Object.freeze([
  'banking',
  'payments',
  'invoicing',
  'accounting',
  'payroll',
  'hr',
  'insurance',
]);

const PROVIDER_CAPABILITY_SET = new Set(PROVIDER_CAPABILITIES);

function isProviderCapability(value) {
  return PROVIDER_CAPABILITY_SET.has(value);
}

module.exports = {
  PROVIDER_CAPABILITIES,
  isProviderCapability,
};
