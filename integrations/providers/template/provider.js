async function fetchTransactions() {
  throw new Error('template provider does not fetch data; copy this provider and implement provider-specific fetching');
}

module.exports = {
  id: 'template-provider',
  type: 'template',
  name: 'Template Provider',
  capabilities: ['banking'],
  fetchTransactions,
};
