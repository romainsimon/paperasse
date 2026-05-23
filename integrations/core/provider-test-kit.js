const {
  validateProviderDescriptor,
  validateNormalizedTransaction,
} = require('./provider-validator');

function assertProviderDescriptor(provider) {
  const result = validateProviderDescriptor(provider);
  if (!result.valid) {
    throw new Error(`provider contract failed: ${result.errors.join('; ')}`);
  }
  return provider;
}

function assertNormalizedTransactions(transactions) {
  if (!Array.isArray(transactions)) {
    throw new Error('transaction contract failed: expected an array of transactions');
  }

  transactions.forEach((transaction, index) => {
    const result = validateNormalizedTransaction(transaction);
    if (!result.valid) {
      throw new Error(`transaction contract failed at index ${index}: ${result.errors.join('; ')}`);
    }
  });

  return transactions;
}

async function runProviderContractChecks(provider, options = {}) {
  assertProviderDescriptor(provider);

  const transactionsMethod = options.transactionsMethod || 'fetchTransactions';
  let transactions = [];

  if (typeof provider[transactionsMethod] === 'function') {
    transactions = await provider[transactionsMethod](options.fetchOptions || {});
    assertNormalizedTransactions(transactions);
  }

  return {
    provider_id: provider.id,
    provider_type: provider.type,
    capabilities: provider.capabilities.slice(),
    transaction_count: transactions.length,
  };
}

module.exports = {
  assertProviderDescriptor,
  assertNormalizedTransactions,
  runProviderContractChecks,
};
