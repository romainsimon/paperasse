# ADR 0001: Provider Abstraction Contract

Date: 2026-05-23
Status: Proposed

## Context

Paperasse currently has provider-specific integrations for Qonto and Stripe.
Issue #18 proposes support for more accounting, banking and payment providers.

The key design risk is forcing each provider into one fixed category such as `bank`, `payment`, `accounting` or `csv`.
Real providers can cover several business domains depending on how a company uses them.

Examples:

- Qonto can be used for banking.
- Stripe can be used for payments.
- Pennylane can be used for accounting, invoicing or bank feeds depending on the setup.
- A fictional provider could expose accounting, banking or insurance-related capabilities.
- A generic provider could expose a business capability while hiding whether it uses CSV, API, MCP, pasted data or another ingestion mechanism internally.

## Decision

Model providers by identity plus business capabilities.

```ts
type ProviderCapability =
  | 'banking'
  | 'payments'
  | 'invoicing'
  | 'accounting'
  | 'payroll'
  | 'hr'
  | 'insurance'

type ProviderDescriptor = {
  id: string
  type: string
  name: string
  capabilities: ProviderCapability[]
}
```

Provider identity is represented by `type` and `id`.
Business capabilities are represented by `capabilities`.
Ingestion details remain internal to each provider.

CSV is not a business capability.
API, CSV, MCP, manual export and pasted data are ingestion mechanisms.

## V1 Runtime Boundary

The first runtime implementation may stay transaction-first because Qonto and Stripe currently produce transaction-like records.

Capabilities are declarative in V1.
The initial runner should be provider-driven:

```txt
providers[] -> runner -> provider.fetch() -> normalized output
```

Capability-driven workflows can be added later when there are multiple normalized output families.

## Compatibility

Legacy compatibility must be defined by observable behavior:

- existing commands keep working;
- existing CLI options keep working;
- existing output filenames keep working;
- legacy config keeps working for legacy commands.

Internal module exports are secondary unless they are documented public APIs.

## Consequences

Provider authors can add new integrations without changing the provider taxonomy.
The same provider can declare several capabilities.
The same capability can be implemented by many providers.
Ingestion implementation details do not leak into the public contract.

## Non-Goals for PR1

- Do not migrate Qonto.
- Do not migrate Stripe.
- Do not add a provider runner.
- Do not add a CSV provider.
- Do not change existing fetch commands.
