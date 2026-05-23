# Template Provider

This directory is a contract example for new provider implementations.

It is not used by the Paperasse runtime.

## Descriptor

```js
{
  id: 'template-provider',
  type: 'template',
  name: 'Template Provider',
  capabilities: ['banking']
}
```

## Usage

Copy this directory when starting a new provider.
Replace the provider identity and capabilities with the new integration identity.

Do not model ingestion details as capabilities.
For example, do not add `csv_import`, `api` or `mcp` to `capabilities`.
