/**
 * Connecteur Stripe
 * Récupère les charges, payouts et balance transactions depuis un ou plusieurs comptes Stripe.
 *
 * Supporte deux modes :
 *
 * 1. Comptes séparés (chacun avec sa propre clé API) :
 *    "stripe_accounts": [
 *      { "id": "saas", "name": "Mon SaaS", "env_key": "STRIPE_SECRET_SAAS" },
 *      { "id": "shop", "name": "Ma Boutique", "env_key": "STRIPE_SECRET_SHOP" }
 *    ]
 *
 * 2. Stripe Connect (une clé plateforme + identifiants de sous-comptes) :
 *    "stripe_accounts": [
 *      { "id": "client-a", "name": "Client A", "env_key": "STRIPE_PLATFORM_SECRET", "stripe_account_id": "acct_xxx" },
 *      { "id": "client-b", "name": "Client B", "env_key": "STRIPE_PLATFORM_SECRET", "stripe_account_id": "acct_yyy" }
 *    ]
 *
 * Les deux modes sont mixables. Si stripe_account_id est present, le header
 * Stripe-Account est envoyé a chaque appel API pour agir au nom du sous-compte.
 *
 * Usage :
 *   node integrations/stripe/fetch.js
 *   node integrations/stripe/fetch.js --start 2025-01-01 --end 2025-12-31
 *   node integrations/stripe/fetch.js --account main
 */

const fs = require('fs');
const path = require('path');

/**
 * Charge la liste des comptes Stripe depuis company.json.
 */
function loadStripeAccounts() {
  const companyPath = path.join(__dirname, '../../company.json');

  if (!fs.existsSync(companyPath)) {
    throw new Error(
      'company.json introuvable. Copiez company.example.json vers company.json et remplissez vos informations.\n' +
      'Ajoutez vos comptes Stripe dans le tableau "stripe_accounts".'
    );
  }

  const company = JSON.parse(fs.readFileSync(companyPath, 'utf-8'));

  if (!company.stripe_accounts || company.stripe_accounts.length === 0) {
    throw new Error(
      'Aucun compte Stripe configuré dans company.json.\n' +
      'Ajoutez vos comptes Stripe :\n' +
      '  "stripe_accounts": [\n' +
      '    { "id": "main", "name": "Mon SaaS", "env_key": "STRIPE_SECRET" }\n' +
      '  ]'
    );
  }

  return company.stripe_accounts;
}

/**
 * Initialise le client Stripe pour un compte donné.
 * Si le compte a un stripe_account_id (Connect), le client est configuré
 * pour envoyer le header Stripe-Account a chaque requête.
 */
function getStripeClient(account) {
  const apiKey = process.env[account.env_key];

  if (!apiKey) {
    console.warn(`Attention : ${account.env_key} non defini, "${account.name}" ignoré`);
    return null;
  }

  const Stripe = require('stripe');
  const options = {};

  if (account.stripe_account_id) {
    options.stripeAccount = account.stripe_account_id;
  }

  return new Stripe(apiKey, options);
}

/**
 * Récupère toutes les balance transactions (le plus complet pour la comptabilité).
 * Inclut les charges, frais, payouts, remboursements et ajustements.
 */
async function getBalanceTransactions(stripe, startDate, endDate) {
  const transactions = [];
  let hasMore = true;
  let startingAfter = null;

  const created = {};
  if (startDate) created.gte = Math.floor(new Date(startDate).getTime() / 1000);
  if (endDate) created.lte = Math.floor(new Date(endDate).getTime() / 1000);

  while (hasMore) {
    const params = {
      limit: 100,
      created: Object.keys(created).length > 0 ? created : undefined
    };

    if (startingAfter) {
      params.starting_after = startingAfter;
    }

    const result = await stripe.balanceTransactions.list(params);
    transactions.push(...result.data);

    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  return transactions;
}

/**
 * Récupère tous les payouts (virements de Stripe vers votre compte bancaire).
 */
async function getPayouts(stripe, startDate, endDate) {
  const payouts = [];
  let hasMore = true;
  let startingAfter = null;

  const created = {};
  if (startDate) created.gte = Math.floor(new Date(startDate).getTime() / 1000);
  if (endDate) created.lte = Math.floor(new Date(endDate).getTime() / 1000);

  while (hasMore) {
    const params = {
      limit: 100,
      created: Object.keys(created).length > 0 ? created : undefined
    };

    if (startingAfter) {
      params.starting_after = startingAfter;
    }

    const result = await stripe.payouts.list(params);
    payouts.push(...result.data);

    hasMore = result.has_more;
    if (result.data.length > 0) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  return payouts;
}

/**
 * Transforme une balance transaction Stripe au format standard Paperasse.
 */
function transformBalanceTransaction(tx, account) {
  return {
    id: tx.id,
    source: 'stripe',
    account_id: account.id,
    account_name: account.name,
    date: new Date(tx.created * 1000).toISOString(),
    type: tx.type,
    amount_gross: tx.amount / 100,
    fee: tx.fee / 100,
    amount_net: tx.net / 100,
    currency: tx.currency,
    description: tx.description,
    status: tx.status,
    payout_id: tx.payout,
    our_category: mapStripeType(tx.type),
    raw: tx
  };
}

/**
 * Associe un type de transaction Stripe à une catégorie comptable.
 */
function mapStripeType(type) {
  const mapping = {
    'charge': 'revenue',
    'payment': 'revenue',
    'payout': 'bank_transfer',
    'stripe_fee': 'banking_fees',
    'refund': 'refund',
    'adjustment': 'adjustment',
    'application_fee': 'platform_fee'
  };
  return mapping[type] || 'other';
}

/**
 * Récupère toutes les données d'un compte Stripe (transactions + payouts).
 */
async function fetchAccountData(account, options = {}) {
  const stripe = getStripeClient(account);
  if (!stripe) return null;

  console.log(`Récupération de "${account.name}"...`);

  const [balanceTransactions, payouts] = await Promise.all([
    getBalanceTransactions(stripe, options.startDate, options.endDate),
    getPayouts(stripe, options.startDate, options.endDate)
  ]);

  return {
    account_id: account.id,
    account_name: account.name,
    balanceTransactions: balanceTransactions.map(tx =>
      transformBalanceTransaction(tx, account)
    ),
    payouts: payouts.map(p => ({
      id: p.id,
      amount: p.amount / 100,
      currency: p.currency,
      arrival_date: new Date(p.arrival_date * 1000).toISOString(),
      status: p.status,
      method: p.method,
      description: p.description
    })),
    fetchedAt: new Date().toISOString()
  };
}

/**
 * Fonction principale : récupère tous les comptes Stripe configurés
 * et enregistre les transactions dans data/transactions/
 */
async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--start' && args[i + 1]) {
      options.startDate = args[i + 1];
      i++;
    } else if (args[i] === '--end' && args[i + 1]) {
      options.endDate = args[i + 1];
      i++;
    } else if (args[i] === '--account' && args[i + 1]) {
      options.accountId = args[i + 1];
      i++;
    }
  }

  const allAccounts = loadStripeAccounts();

  const accounts = options.accountId
    ? allAccounts.filter(a => a.id === options.accountId)
    : allAccounts;

  if (accounts.length === 0) {
    throw new Error(`Aucun compte Stripe trouvé avec l'id "${options.accountId}"`);
  }

  console.log('Récupération des données Stripe');
  console.log('===============================');
  if (options.startDate) console.log(`Date de début : ${options.startDate}`);
  if (options.endDate) console.log(`Date de fin : ${options.endDate}`);
  console.log(`Comptes : ${accounts.map(a => a.name).join(', ')}`);
  console.log('');

  const outputDir = path.join(__dirname, '../../data/transactions');
  fs.mkdirSync(outputDir, { recursive: true });

  const results = [];

  for (const account of accounts) {
    try {
      const data = await fetchAccountData(account, options);
      if (data) {
        results.push(data);

        const outputFile = path.join(outputDir, `stripe-${account.id}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
        console.log(`  ${data.balanceTransactions.length} transactions enregistrées dans stripe-${account.id}.json`);
      }
    } catch (err) {
      console.error(`  Erreur pour "${account.name}" : ${err.message}`);
    }
  }

  // Enregistrer le résumé global
  const summaryFile = path.join(outputDir, 'stripe-summary.json');
  const summary = {
    fetchedAt: new Date().toISOString(),
    options,
    accounts: results.map(r => ({
      account_id: r.account_id,
      account_name: r.account_name,
      transactionCount: r.balanceTransactions.length,
      payoutCount: r.payouts.length,
      totalGross: r.balanceTransactions
        .filter(t => t.type === 'charge' || t.type === 'payment')
        .reduce((sum, t) => sum + t.amount_gross, 0),
      totalFees: r.balanceTransactions
        .reduce((sum, t) => sum + t.fee, 0),
      totalNet: r.balanceTransactions
        .filter(t => t.type === 'charge' || t.type === 'payment')
        .reduce((sum, t) => sum + t.amount_net, 0)
    }))
  };

  fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));
  console.log(`\nRésumé enregistré dans stripe-summary.json`);

  console.log('\nRésumé :');
  console.log('--------');
  for (const a of summary.accounts) {
    console.log(`${a.account_name} : ${a.transactionCount} transactions, ${a.totalNet.toFixed(2)} EUR net`);
  }

  console.log('\nTerminé !');
}

module.exports = {
  loadStripeAccounts,
  getStripeClient,
  getBalanceTransactions,
  getPayouts,
  fetchAccountData,
  mapStripeType
};

if (require.main === module) {
  main().catch(err => {
    console.error('Erreur :', err.message);
    process.exit(1);
  });
}
