/**
 * Connecteur Qonto
 * Récupère les transactions bancaires depuis un compte Qonto pour le rapprochement comptable.
 *
 * Variables d'environnement requises :
 * - QONTO_ID (slug de l'organisation)
 * - QONTO_API_SECRET (clé secrète)
 *
 * Disponibles dans votre dashboard Qonto : Settings > Integrations > API.
 *
 * Usage :
 *   node integrations/qonto/fetch.js
 *   node integrations/qonto/fetch.js --start 2025-01-01 --end 2025-12-31
 */

const fs = require('fs');
const path = require('path');

const QONTO_API_BASE = 'https://thirdparty.qonto.com/v2';

async function getHeaders() {
  const id = process.env.QONTO_ID;
  const secret = process.env.QONTO_API_SECRET;

  if (!id || !secret) {
    throw new Error(
      'Variables QONTO_ID ou QONTO_API_SECRET manquantes.\n' +
      'Definissez-les dans votre shell ou fichier .env.\n' +
      'Disponibles dans votre dashboard Qonto : Settings > Integrations > API.'
    );
  }

  return {
    'Authorization': `${id}:${secret}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Récupère les informations de l'organisation et la liste des comptes bancaires.
 */
async function getOrganization() {
  const headers = await getHeaders();
  const response = await fetch(`${QONTO_API_BASE}/organization`, { headers });

  if (!response.ok) {
    throw new Error(`Erreur API Qonto : ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Construit les paramètres de requête pour l'endpoint /transactions.
 *
 * Filtres de date supportés (cf. doc API Qonto) :
 * - settled_at_from / settled_at_to : date de règlement (impacte le solde) — à utiliser pour la comptabilité
 * - emitted_at_from / emitted_at_to : date d'émission
 * - updated_at_from / updated_at_to : date de dernière modification de la fiche (rarement pertinent en compta)
 *
 * Extrait dans une fonction pure pour être testable sans appel réseau.
 * @param {string} iban - IBAN du compte bancaire
 * @param {object} options - Options de requête
 * @returns {URLSearchParams}
 */
function buildTransactionsParams(iban, options = {}) {
  const params = new URLSearchParams({
    iban,
    status: options.status || 'completed',
    per_page: String(options.per_page || 100),
    current_page: String(options.current_page || 1)
  });

  const dateFilters = [
    'settled_at_from', 'settled_at_to',
    'emitted_at_from', 'emitted_at_to',
    'updated_at_from', 'updated_at_to'
  ];
  for (const key of dateFilters) {
    if (options[key]) {
      params.append(key, options[key]);
    }
  }

  return params;
}

/**
 * Récupère les transactions d'un compte bancaire spécifique.
 * @param {string} iban - IBAN du compte bancaire
 * @param {object} options - Options de requête
 * @param {string} options.status - Filtre par statut (défaut : 'completed')
 * @param {string} options.settled_at_from - Date de règlement de début (format ISO)
 * @param {string} options.settled_at_to - Date de règlement de fin (format ISO)
 * @param {number} options.per_page - Résultats par page (max 100)
 * @param {number} options.current_page - Numéro de page
 */
async function getTransactions(iban, options = {}) {
  const headers = await getHeaders();

  const params = buildTransactionsParams(iban, options);

  const url = `${QONTO_API_BASE}/transactions?${params}`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Erreur API Qonto : ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Récupère toutes les transactions avec pagination automatique.
 * @param {string} iban - IBAN du compte bancaire
 * @param {object} options - Options de requête (identiques à getTransactions)
 * @returns {Array} Toutes les transactions
 */
async function getAllTransactions(iban, options = {}) {
  const allTransactions = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore) {
    const result = await getTransactions(iban, {
      ...options,
      current_page: currentPage,
      per_page: 100
    });

    allTransactions.push(...result.transactions);

    const totalPages = Math.ceil(result.meta.total_count / result.meta.per_page);
    hasMore = currentPage < totalPages;
    currentPage++;

    // Limitation de débit API
    if (hasMore) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return allTransactions;
}

/**
 * Contrôle de cohérence : détecte les transactions manquantes en vérifiant la
 * continuité du solde cumulé (settled_balance). Pour chaque transaction (triée
 * par settled_at croissant), le solde précédent + le montant doit égaler le
 * solde courant. Toute rupture révèle une opération absente de l'export.
 *
 * @param {Array} transactions - Transactions brutes de l'API Qonto (champ settled_balance)
 * @returns {Array<object>} Liste des ruptures détectées (vide si tout est cohérent)
 */
function findBalanceDiscontinuities(transactions) {
  const settled = transactions
    .filter(t => t.settled_at && typeof t.settled_balance === 'number')
    .sort((a, b) => new Date(a.settled_at) - new Date(b.settled_at));

  const gaps = [];
  for (let i = 1; i < settled.length; i++) {
    const prev = settled[i - 1];
    const cur = settled[i];
    const signed = cur.side === 'credit' ? cur.amount : -cur.amount;
    const expected = Math.round((prev.settled_balance + signed) * 100) / 100;
    if (Math.abs(expected - cur.settled_balance) > 0.01) {
      gaps.push({
        date: cur.settled_at,
        label: cur.label,
        expected_balance: expected,
        actual_balance: cur.settled_balance,
        gap: Math.round((cur.settled_balance - expected) * 100) / 100
      });
    }
  }
  return gaps;
}

/**
 * Transforme une transaction Qonto au format standard Paperasse.
 * Le champ our_category est rempli par le skill comptable lors de la catégorisation.
 */
function transformTransaction(tx) {
  return {
    id: tx.transaction_id,
    source: 'qonto',
    date: tx.settled_at || tx.emitted_at,
    amount: tx.side === 'credit' ? tx.amount : -tx.amount,
    currency: tx.currency,
    label: tx.label,
    reference: tx.reference,
    counterparty: tx.label,
    category: tx.category,
    our_category: null, // Rempli par le skill comptable lors de la catégorisation
    status: tx.status,
    raw: tx
  };
}

/**
 * Fonction principale : récupère les transactions de tous les comptes et les enregistre
 * dans data/transactions/
 */
async function main() {
  // Vérifier si Qonto est activé dans company.json
  const companyPath = path.join(__dirname, '../../company.json');
  if (fs.existsSync(companyPath)) {
    const company = JSON.parse(fs.readFileSync(companyPath, 'utf-8'));
    if (company.qonto && company.qonto.enabled === false) {
      console.log('Qonto est desactive dans company.json. Ignoré.');
      return;
    }
  }

  // Vérifier les variables d'environnement avant d'appeler l'API
  if (!process.env.QONTO_ID || !process.env.QONTO_API_SECRET) {
    console.log('Variables Qonto (QONTO_ID, QONTO_API_SECRET) non definies. Ignoré.');
    console.log('Pour configurer Qonto, definissez ces variables et activez qonto dans company.json.');
    return;
  }

  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--start' && args[i + 1]) {
      // Filtre sur la date de règlement (settled_at), pas la date de modification :
      // c'est la date qui a un sens comptable et qui impacte le solde.
      options.settled_at_from = args[i + 1];
      i++;
    } else if (args[i] === '--end' && args[i + 1]) {
      options.settled_at_to = args[i + 1];
      i++;
    }
  }

  console.log('Récupération des informations Qonto...');
  const org = await getOrganization();

  console.log(`Organisation : ${org.organization.slug}`);
  console.log(`Comptes bancaires : ${org.organization.bank_accounts.length}`);

  const outputDir = path.join(__dirname, '../../data/transactions');
  fs.mkdirSync(outputDir, { recursive: true });

  for (const account of org.organization.bank_accounts) {
    console.log(`\nRécupération des transactions pour ${account.name} (${account.iban})...`);

    const transactions = await getAllTransactions(account.iban, options);
    console.log(`${transactions.length} transactions trouvées`);

    // Contrôle de cohérence : alerter si le solde cumulé présente des ruptures,
    // signe qu'il manque des transactions dans l'export.
    const gaps = findBalanceDiscontinuities(transactions);
    if (gaps.length > 0) {
      console.warn(`\n⚠️  ${gaps.length} rupture(s) de continuité du solde détectée(s) : des transactions sont probablement manquantes.`);
      for (const g of gaps.slice(0, 5)) {
        console.warn(`   ${g.date} ${g.label} — solde attendu ${g.expected_balance} vs réel ${g.actual_balance} (écart ${g.gap})`);
      }
      if (gaps.length > 5) console.warn(`   ... et ${gaps.length - 5} autre(s).`);
      console.warn('   Vérifiez la période demandée et rapprochez avec le relevé Qonto.');
    }

    const transformed = transactions.map(transformTransaction);

    const outputFile = path.join(outputDir, `qonto-${account.slug}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(transformed, null, 2));
    console.log(`Enregistré dans ${outputFile}`);
  }

  console.log('\nTerminé !');
}

module.exports = {
  getOrganization,
  getTransactions,
  getAllTransactions,
  transformTransaction,
  buildTransactionsParams,
  findBalanceDiscontinuities
};

if (require.main === module) {
  main().catch(err => {
    console.error('Erreur :', err.message);
    process.exit(1);
  });
}
