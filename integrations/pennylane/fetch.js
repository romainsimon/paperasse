/**
 * Connecteur Pennylane
 * Récupère les transactions bancaires depuis l'API Company v2 et les normalise
 * au format data/transactions/ de Paperasse.
 *
 * Variable d'environnement requise :
 * - PENNYLANE_API_TOKEN (token Company avec le scope transactions:readonly)
 *
 * Usage :
 *   node integrations/pennylane/fetch.js
 *   node integrations/pennylane/fetch.js --start 2025-01-01 --end 2025-12-31
 */

const fs = require('fs');
const path = require('path');

const PENNYLANE_API_BASE = 'https://app.pennylane.com/api/external/v2';

function getHeaders(token = process.env.PENNYLANE_API_TOKEN) {
  if (!token) {
    throw new Error(
      'Variable PENNYLANE_API_TOKEN manquante.\n' +
      'Créez un token Company Pennylane avec le scope transactions:readonly.'
    );
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  };
}

function validateDate(value, flag) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`${flag} doit être une date au format YYYY-MM-DD`);
  }
}

/**
 * Construit les paramètres de l'endpoint GET /transactions.
 * Le filtre Pennylane est un tableau JSON de triplets field/operator/value.
 */
function buildTransactionsParams(options = {}) {
  const params = new URLSearchParams({
    limit: '100',
    sort: 'id'
  });
  const filters = [];

  if (options.startDate) {
    validateDate(options.startDate, '--start');
    filters.push({ field: 'date', operator: 'gteq', value: options.startDate });
  }
  if (options.endDate) {
    validateDate(options.endDate, '--end');
    filters.push({ field: 'date', operator: 'lteq', value: options.endDate });
  }
  if (filters.length > 0) params.set('filter', JSON.stringify(filters));
  if (options.cursor) params.set('cursor', options.cursor);

  return params;
}

async function getTransactionsPage(options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    throw new Error('Cette intégration nécessite Node.js 18 ou supérieur (fetch indisponible).');
  }

  const params = buildTransactionsParams(options);
  const apiBase = options.apiBase || PENNYLANE_API_BASE;
  const response = await fetchImpl(`${apiBase}/transactions?${params}`, {
    headers: getHeaders(options.token)
  });

  if (!response.ok) {
    throw new Error(`Erreur API Pennylane : ${response.status} ${response.statusText}`);
  }

  const page = await response.json();
  if (!page || !Array.isArray(page.items) || typeof page.has_more !== 'boolean') {
    throw new Error('Réponse API Pennylane invalide : pagination ou liste de transactions absente.');
  }
  return page;
}

/** Récupère toutes les pages, en protégeant contre un curseur absent ou répété. */
async function getAllTransactions(options = {}) {
  const transactions = [];
  const seenCursors = new Set();
  let cursor;

  while (true) {
    const page = await getTransactionsPage({ ...options, cursor });
    transactions.push(...page.items);

    if (!page.has_more) break;
    if (!page.next_cursor || page.next_cursor === cursor || seenCursors.has(page.next_cursor)) {
      throw new Error('Pagination Pennylane invalide : next_cursor absent ou répété.');
    }
    seenCursors.add(page.next_cursor);
    cursor = page.next_cursor;
  }

  return transactions;
}

function toNumber(value, field, transactionId, nullable = false) {
  if (nullable && (value === null || value === undefined || value === '')) return null;
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Transaction Pennylane ${transactionId} invalide : ${field} n'est pas un montant.`);
  }
  return number;
}

/** Transforme une transaction Pennylane au format standard Paperasse. */
function transformTransaction(tx) {
  if (tx.id === null || tx.id === undefined || !tx.date) {
    throw new Error('Transaction Pennylane invalide : id ou date absent.');
  }

  const categoryLabels = Array.isArray(tx.categories)
    ? tx.categories.map(category => category.label).filter(Boolean)
    : [];

  return {
    id: `pennylane-${tx.id}`,
    source: 'pennylane',
    account_id: tx.bank_account && tx.bank_account.id != null
      ? String(tx.bank_account.id)
      : null,
    date: tx.date,
    amount: toNumber(tx.currency_amount, 'currency_amount', tx.id),
    amount_eur: toNumber(tx.amount, 'amount', tx.id),
    currency: tx.currency,
    fee: toNumber(tx.currency_fee, 'currency_fee', tx.id, true),
    fee_eur: toNumber(tx.fee, 'fee', tx.id, true),
    label: tx.label || `Transaction Pennylane ${tx.id}`,
    reference: tx.interbank_code || null,
    counterparty: tx.label || null,
    category: categoryLabels[0] || null,
    categories: categoryLabels,
    our_category: null,
    status: tx.archived_at ? 'archived' : 'completed',
    attachment_required: Boolean(tx.attachment_required),
    raw: tx
  };
}

function parseArgs(args) {
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if ((args[i] === '--start' || args[i] === '--end') && !args[i + 1]) {
      throw new Error(`Valeur manquante pour ${args[i]}`);
    }
    if (args[i] === '--start') {
      options.startDate = args[++i];
    } else if (args[i] === '--end') {
      options.endDate = args[++i];
    } else {
      throw new Error(`Option inconnue : ${args[i]}`);
    }
  }

  if (options.startDate) validateDate(options.startDate, '--start');
  if (options.endDate) validateDate(options.endDate, '--end');
  if (options.startDate && options.endDate && options.startDate > options.endDate) {
    throw new Error('--start doit être antérieure ou égale à --end');
  }
  return options;
}

function isPennylaneDisabled(companyPath) {
  if (!fs.existsSync(companyPath)) return false;
  const company = JSON.parse(fs.readFileSync(companyPath, 'utf-8'));
  return Boolean(company.pennylane && company.pennylane.enabled === false);
}

function writeTransactionsFile(transactions, outputFile) {
  const transformed = transactions.map(transformTransaction);
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2));
  return transformed;
}

async function main() {
  const companyPath = path.join(__dirname, '../../company.json');
  if (isPennylaneDisabled(companyPath)) {
    console.log('Pennylane est désactivé dans company.json. Ignoré.');
    return;
  }

  if (!process.env.PENNYLANE_API_TOKEN) {
    console.log('Variable PENNYLANE_API_TOKEN non définie. Pennylane ignoré.');
    console.log('Créez un token Company avec le scope transactions:readonly pour activer le connecteur.');
    return;
  }

  const options = parseArgs(process.argv.slice(2));
  console.log('Récupération des transactions Pennylane...');
  const transactions = await getAllTransactions(options);

  const outputFile = path.join(__dirname, '../../data/transactions/pennylane.json');
  const transformed = writeTransactionsFile(transactions, outputFile);

  console.log(`${transformed.length} transaction(s) enregistrée(s) dans ${outputFile}`);
}

module.exports = {
  buildTransactionsParams,
  getTransactionsPage,
  getAllTransactions,
  transformTransaction,
  parseArgs,
  isPennylaneDisabled,
  writeTransactionsFile
};

if (require.main === module) {
  main().catch(err => {
    console.error('Erreur :', err.message);
    process.exit(1);
  });
}
