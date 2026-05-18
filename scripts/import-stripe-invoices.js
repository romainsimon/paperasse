#!/usr/bin/env node

/**
 * Import des factures Stripe vers le format Paperasse (Belgique)
 *
 * Recupere les invoices Stripe d'une periode et les convertit en JSON
 * compatibles avec generate-peppol.js. Numerotation automatique a partir
 * de invoicing.next_numbers[year] dans company.json.
 *
 * Usage:
 *   node scripts/import-stripe-invoices.js --start 2026-01-01 --end 2026-03-31
 *   node scripts/import-stripe-invoices.js --start 2026-01-01 --end 2026-03-31 --account melies
 *   node scripts/import-stripe-invoices.js --start 2026-01-01 --end 2026-03-31 --output data/invoices/
 *   node scripts/import-stripe-invoices.js --start 2026-01-01 --end 2026-03-31 --dry-run
 *
 * Prerequis :
 *   - company.json avec stripe_accounts et invoicing.next_numbers
 *   - Variables d'environnement Stripe (env_key par compte)
 *
 * Sortie : un fichier JSON par invoice dans data/invoices/F-YYYY-NNN.json
 * Met a jour invoicing.next_numbers dans company.json a la fin.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function getCompanyPath() {
  const candidates = [
    path.join(process.cwd(), 'company.json'),
    path.join(ROOT, 'company.json'),
  ];
  return candidates.find(p => fs.existsSync(p));
}

function loadCompany() {
  const companyPath = getCompanyPath();
  if (!companyPath) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(companyPath, 'utf8'));
}

function saveCompany(company) {
  const companyPath = getCompanyPath();
  fs.writeFileSync(companyPath, JSON.stringify(company, null, 2) + '\n', 'utf8');
}

function loadIndex(indexPath) {
  if (fs.existsSync(indexPath)) {
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }
  return { invoices: {}, stripe_map: {}, last_sync: null };
}

function saveIndex(indexPath, index) {
  index.last_sync = new Date().toISOString();
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf8');
}

function getNextNumber(company, year) {
  if (!company.invoicing) company.invoicing = {};
  if (!company.invoicing.next_numbers) company.invoicing.next_numbers = {};
  if (!company.invoicing.next_numbers[year]) company.invoicing.next_numbers[year] = 1;
  const num = company.invoicing.next_numbers[year];
  company.invoicing.next_numbers[year] = num + 1;
  return num;
}

function formatInvoiceNumber(company, year, num) {
  const prefix = (company.invoicing && company.invoicing.prefix) || 'F';
  const sep = (company.invoicing && company.invoicing.separator) || '-';
  const padded = String(num).padStart(3, '0');
  return `${prefix}${sep}${year}${sep}${padded}`;
}

// ---------------------------------------------------------------------------
// Stripe
// ---------------------------------------------------------------------------

function getStripeClient(account) {
  const apiKey = process.env[account.env_key];
  if (!apiKey) {
    console.warn(`⚠️  ${account.env_key} non defini, "${account.name}" ignoré`);
    return null;
  }
  const Stripe = require('stripe');
  const options = {};
  if (account.stripe_account_id) options.stripeAccount = account.stripe_account_id;
  return new Stripe(apiKey, options);
}

async function fetchInvoices(stripe, startDate, endDate) {
  const invoices = [];
  const created = {
    gte: Math.floor(new Date(startDate).getTime() / 1000),
    lte: Math.floor(new Date(endDate).getTime() / 1000),
  };

  let hasMore = true;
  let startingAfter = null;

  while (hasMore) {
    const params = {
      limit: 100,
      created,
      status: 'paid',
      // Expand jusqu'a balance_transaction pour avoir le montant EUR converti + taux
      expand: ['data.customer', 'data.charge.balance_transaction'],
    };
    if (startingAfter) params.starting_after = startingAfter;

    const result = await stripe.invoices.list(params);
    invoices.push(...result.data);
    hasMore = result.has_more;
    if (hasMore) startingAfter = result.data[result.data.length - 1].id;
  }

  return invoices;
}

// ---------------------------------------------------------------------------
// Conversion Stripe → format Paperasse
// ---------------------------------------------------------------------------

function detectCategory(invoice) {
  // Pour un SaaS, c'est toujours services
  // Pour des produits physiques, ce serait 'goods'
  return 'services';
}

/**
 * Tente d'extraire le BCE (0xxx.xxx.xxx) depuis les métadonnées Stripe.
 * En Belgique, le BCE remplace le SIREN/SIRET comme identifiant légal.
 * Convention : stocker le BCE dans customer.metadata.bce ou metadata.vat_number.
 */
function extractBCE(cust) {
  if (!cust || !cust.metadata) return '';
  const meta = cust.metadata;
  // Chercher dans les champs courants
  const candidates = [meta.bce, meta.BCE, meta.company_number, meta.enterprise_number];
  for (const c of candidates) {
    if (c && /^0\d{3}[\.\s]?\d{3}[\.\s]?\d{3}$/.test(c.trim())) {
      // Normaliser au format 0xxx.xxx.xxx
      const digits = c.replace(/[\.\s]/g, '');
      return digits.slice(0, 4) + '.' + digits.slice(4, 7) + '.' + digits.slice(7, 10);
    }
  }
  return '';
}

/**
 * Tente d'extraire et valider un numéro de TVA belge depuis les métadonnées Stripe.
 * Format attendu : BE0xxxxxxxxx
 */
function extractTVABelge(cust) {
  if (!cust || !cust.metadata) return '';
  const meta = cust.metadata;
  const candidates = [meta.vat_number, meta.tva, meta.TVA, meta.tax_id];
  for (const c of candidates) {
    if (c && /^BE0\d{9}$/i.test(c.replace(/[\s\.]/g, ''))) {
      return c.replace(/[\s\.]/g, '').toUpperCase();
    }
  }
  // Stripe tax_ids (expand: ['customer.tax_ids']) si disponible
  if (cust.tax_ids && Array.isArray(cust.tax_ids.data)) {
    for (const tid of cust.tax_ids.data) {
      if (tid.type === 'eu_vat' && /^BE0\d{9}$/i.test((tid.value || '').replace(/[\s\.]/g, ''))) {
        return (tid.value || '').replace(/[\s\.]/g, '').toUpperCase();
      }
    }
  }
  return '';
}

function getClientFromInvoice(invoice) {
  const customer = invoice.customer;
  const cust = (customer && typeof customer === 'object') ? customer : {};

  // Si Stripe a un customer object, l'utiliser. Sinon, fallback sur invoice direct fields.
  const name = cust.name || invoice.customer_name || invoice.customer_email || 'Client';
  const email = cust.email || invoice.customer_email || '';
  const address = cust.address || invoice.customer_address || {};

  // Extraction BCE et TVA belge depuis les métadonnées Stripe
  const bce = extractBCE(cust);
  const tva = extractTVABelge(cust);

  return {
    name,
    email,
    address: address.line1 || '',
    line2: address.line2 || '',
    postcode: address.postal_code || '',
    city: address.city || '',
    state: address.state || '',
    country: address.country || '',
    // BCE (identifiant légal belge) — à renseigner dans Stripe metadata.bce
    bce: bce || '',
    // TVA belge BE0xxxxxxxxx — à renseigner dans Stripe metadata.vat_number ou tax_ids
    tva: tva || '',
    // Compatibilité : siren vide (pas de SIREN/SIRET en Belgique)
    siren: '',
  };
}

function convertInvoice(stripeInvoice, accountName, company, year) {
  const num = getNextNumber(company, year);
  const number = formatInvoiceNumber(company, year, num);

  const date = new Date(stripeInvoice.created * 1000).toISOString().slice(0, 10);
  const dueDate = stripeInvoice.due_date
    ? new Date(stripeInvoice.due_date * 1000).toISOString().slice(0, 10)
    : new Date(stripeInvoice.created * 1000 + 30 * 24 * 3600 * 1000).toISOString().slice(0, 10);

  const client = getClientFromInvoice(stripeInvoice);

  // Devise originale et conversion EUR
  const originalAmount = stripeInvoice.amount_paid / 100;
  const originalCurrency = (stripeInvoice.currency || 'eur').toLowerCase();
  const charge = stripeInvoice.charge;
  const balanceTx = (charge && typeof charge === 'object') ? charge.balance_transaction : null;
  const balanceTxObj = (balanceTx && typeof balanceTx === 'object') ? balanceTx : null;

  let eurAmount = originalAmount;
  let exchangeRate = null;
  if (balanceTxObj) {
    // balance_transaction.amount est en devise du compte Stripe (EUR pour un compte FR)
    eurAmount = balanceTxObj.amount / 100;
    exchangeRate = balanceTxObj.exchange_rate || null;
  } else if (originalCurrency !== 'eur') {
    console.warn(`   ⚠️  ${stripeInvoice.id} : balance_transaction non disponible, montant EUR non converti`);
  }

  // Lignes : utiliser les line items Stripe (en EUR pour la facture)
  // Si multi-devise, on rapporte le montant EUR total et on garde la quantite
  const stripeLines = (stripeInvoice.lines && stripeInvoice.lines.data) || [];
  const lines = stripeLines.length > 0 && originalCurrency === 'eur'
    ? stripeLines.map(line => ({
        description: line.description || (line.price && line.price.product && line.price.product.name) || 'Prestation',
        quantity: line.quantity || 1,
        unit: 'mois',
        unit_price: (line.amount / (line.quantity || 1)) / 100,
      }))
    : [{
        description: (stripeLines[0] && stripeLines[0].description) || stripeInvoice.description || `${accountName} - Abonnement`,
        quantity: 1,
        unit: 'mois',
        unit_price: eurAmount,
      }];

  // Taux TVA belge : 21% par defaut (taux standard belge)
  // Adapter si le produit bénéficie d'un taux réduit (6% ou 12%)
  const vatRate = stripeInvoice.default_tax_rates && stripeInvoice.default_tax_rates.length > 0
    ? stripeInvoice.default_tax_rates[0].percentage
    : 21; // Taux standard belge (art. 1 CTVA)

  const result = {
    number,
    date,
    due_date: dueDate,
    year,
    type: 'invoice',
    category: detectCategory(stripeInvoice),
    client,
    lines,
    // Taux TVA belge : 0, 6, 12 ou 21 (art. 1 CTVA)
    vat_rate: vatRate,
    payment: {
      terms: '30 jours date de facture',
      method: 'carte bancaire (Stripe)',
    },
    stripe_id: stripeInvoice.id,
    stripe_charge: typeof charge === 'string' ? charge : (charge && charge.id),
    stripe_product: accountName,
    stripe_original_amount: originalAmount,
    stripe_original_currency: originalCurrency,
    eur_amount: eurAmount,
  };

  if (exchangeRate) result.exchange_rate = exchangeRate;

  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const startIdx = args.indexOf('--start');
  const endIdx = args.indexOf('--end');
  const accountIdx = args.indexOf('--account');
  const outputIdx = args.indexOf('--output');
  const dryRun = args.includes('--dry-run');

  if (startIdx === -1 || endIdx === -1) {
    console.error('Usage: node scripts/import-stripe-invoices.js --start YYYY-MM-DD --end YYYY-MM-DD');
    console.error('Options:');
    console.error('  --account <id>    Filtrer sur un compte Stripe specifique');
    console.error('  --output <dir>    Dossier de sortie (defaut: data/invoices/)');
    console.error('  --dry-run         Ne pas ecrire les fichiers, ne pas modifier company.json');
    process.exit(1);
  }

  const startDate = args[startIdx + 1];
  const endDate = args[endIdx + 1];
  const accountFilter = accountIdx !== -1 ? args[accountIdx + 1] : null;
  const outputDir = outputIdx !== -1 ? args[outputIdx + 1] : path.join(process.cwd(), 'data', 'invoices');

  const company = loadCompany();
  const year = parseInt(startDate.slice(0, 4));

  if (!company.stripe_accounts || company.stripe_accounts.length === 0) {
    console.error('Aucun compte Stripe configure dans company.json.');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const indexPath = path.join(outputDir, 'index.json');
  const index = loadIndex(indexPath);

  let totalImported = 0;
  let totalSkipped = 0;
  const startNumber = (company.invoicing && company.invoicing.next_numbers && company.invoicing.next_numbers[year]) || 1;

  for (const account of company.stripe_accounts) {
    if (accountFilter && account.id !== accountFilter) continue;

    const stripe = getStripeClient(account);
    if (!stripe) continue;

    console.log(`\n📥 Import ${account.name} (${startDate} → ${endDate})...`);

    let invoices;
    try {
      invoices = await fetchInvoices(stripe, startDate, endDate);
    } catch (err) {
      console.error(`   ❌ Erreur Stripe : ${err.message}`);
      continue;
    }

    console.log(`   ${invoices.length} invoice(s) Stripe payees trouvees`);

    for (const stripeInvoice of invoices) {
      // Verifier si deja importee (par stripe_id via index)
      if (index.stripe_map[stripeInvoice.id]) {
        totalSkipped++;
        continue;
      }

      const invoice = convertInvoice(stripeInvoice, account.name, company, year);

      if (!dryRun) {
        const filePath = path.join(outputDir, `${invoice.number}.json`);
        fs.writeFileSync(filePath, JSON.stringify(invoice, null, 2) + '\n', 'utf8');

        const total = invoice.lines.reduce((s, l) => s + l.quantity * l.unit_price, 0);
        index.stripe_map[invoice.stripe_id] = invoice.number;
        index.invoices[invoice.number] = {
          date: invoice.date,
          client: invoice.client.name,
          product: invoice.stripe_product,
          total,
          stripe_id: invoice.stripe_id,
        };
      }

      console.log(`   ✓ ${invoice.number} : ${invoice.client.name} - ${invoice.eur_amount.toFixed(2)} EUR`);
      totalImported++;
    }
  }

  console.log(`\n📊 Resume :`);
  console.log(`   Importees : ${totalImported}`);
  console.log(`   Deja existantes (skipped) : ${totalSkipped}`);
  if (totalImported > 0) {
    console.log(`   Numero ${formatInvoiceNumber(company, year, startNumber)} → ${formatInvoiceNumber(company, year, (company.invoicing.next_numbers[year] - 1))}`);
  }

  if (!dryRun && totalImported > 0) {
    saveCompany(company);
    saveIndex(indexPath, index);
    console.log(`\n✅ company.json mis a jour : next_numbers[${year}] = ${company.invoicing.next_numbers[year]}`);
    console.log(`✅ index mis a jour : ${indexPath}`);
  }

  if (dryRun) {
    console.log('\n⚠️  DRY RUN : aucun fichier ecrit, company.json non modifie');
  }
}

main().catch(err => {
  console.error('Erreur:', err.message);
  console.error(err.stack);
  process.exit(1);
});
