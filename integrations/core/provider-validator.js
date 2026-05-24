const { isProviderCapability } = require('./capabilities');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isIsoDateString(value) {
  if (!isNonEmptyString(value)) return false;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

function validateProviderDescriptor(provider) {
  const errors = [];

  if (!provider || typeof provider !== 'object' || Array.isArray(provider)) {
    return {
      valid: false,
      errors: ['provider must be an object'],
    };
  }

  if (!isNonEmptyString(provider.id)) {
    errors.push('provider.id must be a non-empty string');
  }

  if (!isNonEmptyString(provider.type)) {
    errors.push('provider.type must be a non-empty string');
  }

  if (!isNonEmptyString(provider.name)) {
    errors.push('provider.name must be a non-empty string');
  }

  if (!Array.isArray(provider.capabilities)) {
    errors.push('provider.capabilities must be an array');
  } else if (provider.capabilities.length === 0) {
    errors.push('provider.capabilities must contain at least one capability');
  } else {
    const seenCapabilities = new Set();
    for (const capability of provider.capabilities) {
      if (seenCapabilities.has(capability)) {
        errors.push(`provider.capabilities contains duplicate capability: ${String(capability)}`);
        continue;
      }
      seenCapabilities.add(capability);

      if (!isProviderCapability(capability)) {
        errors.push(`provider.capabilities contains unsupported capability: ${String(capability)}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateNormalizedTransaction(transaction) {
  const errors = [];

  if (!transaction || typeof transaction !== 'object' || Array.isArray(transaction)) {
    return {
      valid: false,
      errors: ['transaction must be an object'],
    };
  }

  if (!isNonEmptyString(transaction.id)) {
    errors.push('transaction.id must be a non-empty string');
  }

  if (!isNonEmptyString(transaction.source)) {
    errors.push('transaction.source must be a non-empty string');
  }

  if (!isIsoDateString(transaction.date)) {
    errors.push('transaction.date must be a UTC ISO date string with milliseconds');
  }

  if (typeof transaction.amount !== 'number' || !Number.isFinite(transaction.amount)) {
    errors.push('transaction.amount must be a finite number');
  }

  if (!isNonEmptyString(transaction.currency)) {
    errors.push('transaction.currency must be a non-empty string');
  }

  if (!isNonEmptyString(transaction.label)) {
    errors.push('transaction.label must be a non-empty string');
  }

  if (!Object.prototype.hasOwnProperty.call(transaction, 'raw')) {
    errors.push('transaction.raw must be present');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateProviderDescriptor,
  validateNormalizedTransaction,
};
