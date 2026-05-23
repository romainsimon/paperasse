# Provider Core

Provider core contains the shared provider contract utilities for Paperasse.

This module does not fetch data and does not change the existing Qonto or Stripe integrations.

## Concepts

- Provider identity: `id`, `type`, `name`
- Business capabilities: `banking`, `payments`, `invoicing`, `accounting`, `payroll`, `hr`, `insurance`
- Ingestion details: internal to each provider

CSV, API, MCP and manual exports are ingestion mechanisms, not capabilities.

## Validate a Provider

```js
const {
  assertProviderDescriptor,
  runProviderContractChecks,
} = require('../core');

const provider = require('../providers/template/provider');

assertProviderDescriptor(provider);

runProviderContractChecks(provider).then((summary) => {
  console.log(summary);
});
```

## Add a Provider

1. Copy `integrations/providers/template`.
2. Change `id`, `type`, `name` and `capabilities`.
3. Implement provider-specific fetching.
4. Return normalized transactions when implementing transaction output.
5. Test with `runProviderContractChecks`.
