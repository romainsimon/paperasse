const { isProviderCapability } = require('./capabilities');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
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
    for (const capability of provider.capabilities) {
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

module.exports = {
  validateProviderDescriptor,
};
