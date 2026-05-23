const PROVIDER_CONTRACT_VERSION = '1.0.0';

/**
 * @typedef {'banking'|'payments'|'invoicing'|'accounting'|'payroll'|'hr'|'insurance'} ProviderCapability
 */

/**
 * @typedef {Object} ProviderDescriptor
 * @property {string} id Stable configured provider instance id.
 * @property {string} type Provider implementation type, such as qonto, stripe, fictional-suite or generic.
 * @property {string} name Human-readable provider name.
 * @property {ProviderCapability[]} capabilities Business capabilities exposed by the provider.
 */

/**
 * @typedef {Object} NormalizedTransaction
 * @property {string} id Stable transaction id from the provider or deterministic import id.
 * @property {string} source Provider source label.
 * @property {string} date ISO date string.
 * @property {number} amount Signed amount in transaction currency.
 * @property {string} currency ISO currency code.
 * @property {string} label Human-readable transaction label.
 * @property {string=} reference Optional provider reference.
 * @property {string=} counterparty Optional counterparty label.
 * @property {string=} category Optional provider category.
 * @property {string|null=} our_category Optional Paperasse category.
 * @property {unknown} raw Raw provider payload or raw import row.
 */

module.exports = {
  PROVIDER_CONTRACT_VERSION,
};
