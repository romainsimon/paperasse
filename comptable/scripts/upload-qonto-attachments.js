#!/usr/bin/env node

/**
 * Upload des recapitulatifs de factures Stripe sur les transactions Qonto.
 *
 * Stripe regroupe plusieurs charges dans un seul payout bancaire. Ce script :
 * 1. Recupere les transactions Qonto credits Stripe sans justificatif
 * 2. Les matche avec les factures generees (date window + produit)
 * 3. Genere un PDF recapitulatif listant les factures du payout
 * 4. L'uploade comme piece jointe sur la transaction Qonto (max 5, 30 MB)
 *
 * Prerequis :
 *   - data/invoices/index.json (genere par import-stripe-invoices.js)
 *   - QONTO_ID et QONTO_API_SECRET dans l'env
 *   - puppeteer pour la generation PDF (npm i puppeteer)
 *
 * Usage :
 *   node scripts/upload-qonto-attachments.js                         # dry-run
 *   node scripts/upload-qonto-attachments.js --upload                # upload reel
 *   node scripts/upload-qonto-attachments.js --upload --since 2026-01-01 --until 2026-04-01
 *   node scripts/upload-qonto-attachments.js --upload --limit 3
 *
 * API Qonto : POST /v2/transactions/{uuid}/attachments (multipart/form-data).
 * Limite : 5 pieces jointes max par transaction, 30 MB par piece.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const QONTO_API_BASE = 'https://thirdparty.qonto.com/v2';

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ---------------------------------------------------------------------------
// Company config
// ---------------------------------------------------------------------------

function getCompanyPath() {
  const candidates = [
    path.join(process.cwd(), 'company.json'),
    path.join(ROOT, 'company.json'),
  ];
  return candidates.find(p => fs.existsSync(p));
}

function loadCompany() {
  const p = getCompanyPath();
  if (!p) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// Qonto API
// ---------------------------------------------------------------------------

function qontoAuth() {
  const id = process.env.QONTO_ID;
  const secret = process.env.QONTO_API_SECRET;
  if (!id || !secret) throw new Error('Variables QONTO_ID et QONTO_API_SECRET requises.');
  return `${id}:${secret}`;
}

async function getQontoIban() {
  const r = await fetch(`${QONTO_API_BASE}/organization`, {
    headers: { 'Authorization': qontoAuth(), 'Content-Type': 'application/json' },
  });
  if (!r.ok) throw new Error(`Qonto /organization : ${r.status}`);
  const data = await r.json();
  return data.organization.bank_accounts[0].iban;
}

async function getQontoTransactions(iban, since, until) {
  const auth = qontoAuth();
  const all = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      iban, status: 'completed', per_page: '100', current_page: String(page),
    });
    if (since) params.append('settled_at_from', since);
    if (until) params.append('settled_at_to', until);

    const r = await fetch(`${QONTO_API_BASE}/transactions?${params}`, {
      headers: { 'Authorization': auth, 'Content-Type': 'application/json' },
    });
    if (!r.ok) throw new Error(`Qonto /transactions : ${r.status}`);
    const data = await r.json();
    all.push(...data.transactions);

    const totalPages = Math.ceil(data.meta.total_count / data.meta.per_page);
    hasMore = page < totalPages;
    page++;
    if (hasMore) await sleep(200);
  }
  return all;
}

async function uploadAttachment(txId, pdfPath, filename) {
  const pdfBuffer = fs.readFileSync(pdfPath);
  const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
  const formData = new FormData();
  formData.append('file', blob, filename);

  const r = await fetch(`${QONTO_API_BASE}/transactions/${txId}/attachments`, {
    method: 'POST',
    headers: { 'Authorization': qontoAuth() },
    body: formData,
  });
  return { status: r.status, ok: r.ok };
}

// ---------------------------------------------------------------------------
// Summary PDF generation
// ---------------------------------------------------------------------------

async function generateSummaryPdf(payout, invoices, productName, company, outputPath) {
  const arrivalDate = new Date(payout.arrival_date * 1000).toISOString().slice(0, 10);
  const payoutAmount = (payout.amount / 100).toFixed(2);

  const totalBrut = invoices.reduce((s, inv) => s + inv.total, 0);
  const fees = totalBrut - payout.amount / 100;

  const rows = invoices.map(inv =>
    `<tr><td>${inv.number}</td><td>${inv.date}</td><td>${(inv.client || '').slice(0, 35)}</td><td>${inv.total.toFixed(2)} EUR</td></tr>`
  ).join('');

  const html = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><title>Recapitulatif payout ${payout.id}</title>
<style>
@page { size: A4; margin: 15mm; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 9pt; color: #1a1a1a; }
.header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.company { font-size: 8pt; color: #555; }
.company-name { font-size: 14pt; font-weight: bold; margin-bottom: 4px; }
.title { font-size: 12pt; font-weight: bold; text-align: center; margin: 16px 0; border-top: 1.5pt solid #333; border-bottom: 1.5pt solid #333; padding: 8px; }
.meta { display: flex; gap: 24px; margin-bottom: 16px; font-size: 9pt; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 8.5pt; }
thead th { background: #f0f0f0; border-top: 1.5pt solid #333; border-bottom: 1.5pt solid #333; padding: 6px 8px; text-align: left; font-size: 7.5pt; text-transform: uppercase; }
thead th:last-child { text-align: right; }
tbody td { padding: 4px 8px; border-bottom: 0.5pt solid #e0e0e0; }
tbody td:last-child { text-align: right; }
.totals { margin-top: 12px; text-align: right; }
.totals table { width: 280px; margin-left: auto; }
.totals td { padding: 3px 0; font-size: 9pt; }
.totals td:last-child { text-align: right; font-weight: bold; }
.totals .net td { border-top: 1.5pt solid #333; font-size: 11pt; padding-top: 6px; }
.footer { position: fixed; bottom: 0; left: 0; right: 0; text-align: center; font-size: 7pt; color: #999; padding: 6px 15mm; border-top: 0.5pt solid #eee; }
</style></head><body>

<div class="header">
  <div>
    <div class="company-name">${company.name}</div>
    <div class="company">${company.legal_form} au capital de ${company.capital} EUR<br>
    ${company.address}<br>SIRET : ${company.siret} &middot; RCS ${company.rcs}</div>
  </div>
</div>

<div class="title">R\u00e9capitulatif Payout Stripe</div>

<div class="meta">
  <div><strong>Produit :</strong> ${productName}</div>
  <div><strong>Date arriv\u00e9e :</strong> ${arrivalDate}</div>
  <div><strong>Montant net :</strong> ${payoutAmount} EUR</div>
</div>

<table>
<thead><tr><th>Facture</th><th>Date</th><th>Client</th><th>Montant</th></tr></thead>
<tbody>${rows}</tbody>
</table>

<div class="totals"><table>
  <tr><td>Total brut (${invoices.length} factures)</td><td>${totalBrut.toFixed(2)} EUR</td></tr>
  <tr><td>Frais Stripe</td><td>-${fees.toFixed(2)} EUR</td></tr>
  <tr class="net"><td>Net vers\u00e9</td><td>${payoutAmount} EUR</td></tr>
</table></div>

<div class="footer">${company.name} &middot; SIRET ${company.siret} &middot; G\u00e9n\u00e9r\u00e9 le ${new Date().toISOString().slice(0, 10)}</div>

</body></html>`;

  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.default.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outputPath, format: 'A4', margin: { top: '15mm', right: '15mm', bottom: '18mm', left: '15mm' }, printBackground: true });
  await page.close();
  await browser.close();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  let doUpload = false;
  let since = null;
  let until = null;
  let limit = 0;
  let invoicesDir = path.join(process.cwd(), 'data', 'invoices');
  let outputDir = path.join(process.cwd(), 'output', 'recaps');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--upload') doUpload = true;
    else if (args[i] === '--since' && args[i + 1]) since = args[++i];
    else if (args[i] === '--until' && args[i + 1]) until = args[++i];
    else if (args[i] === '--limit' && args[i + 1]) limit = parseInt(args[++i], 10);
    else if (args[i] === '--invoices-dir' && args[i + 1]) invoicesDir = args[++i];
    else if (args[i] === '--output' && args[i + 1]) outputDir = args[++i];
  }

  console.log('Upload recapitulatifs Stripe -> Qonto');
  console.log('======================================');
  console.log(`Mode : ${doUpload ? 'UPLOAD' : 'DRY-RUN (ajouter --upload pour uploader)'}`);

  const company = loadCompany();
  const indexPath = path.join(invoicesDir, 'index.json');
  if (!fs.existsSync(indexPath)) {
    console.error(`Index introuvable : ${indexPath}`);
    console.error('Lance d\'abord : node scripts/import-stripe-invoices.js --start YYYY-MM-DD --end YYYY-MM-DD');
    process.exit(1);
  }
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

  // 1. Fetch Qonto transactions
  const iban = await getQontoIban();
  const sinceDate = since ? `${since}T00:00:00Z` : undefined;
  const untilDate = until ? `${until}T23:59:59Z` : undefined;
  const qontoTxs = await getQontoTransactions(iban, sinceDate, untilDate);

  const stripeTxs = qontoTxs.filter(t =>
    t.side === 'credit' && /stripe/i.test(t.label || t.clean_counterparty_name || '')
  );
  const needsAttachment = stripeTxs.filter(t => !t.attachment_ids || t.attachment_ids.length === 0);
  console.log(`${stripeTxs.length} transactions Stripe dans Qonto, ${needsAttachment.length} sans justificatif`);

  if (needsAttachment.length === 0) {
    console.log('Tous les payouts Stripe ont deja un justificatif.');
    return;
  }

  // 2. Match Qonto Stripe credits to invoices by date window
  // Strategy : pour chaque credit Stripe Qonto, recuperer les factures dont la
  // date tombe entre le credit precedent et le credit courant.
  const allInvoices = Object.entries(index.invoices || {})
    .map(([num, inv]) => ({ number: num, ...inv }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const sortedQonto = [...needsAttachment].sort((a, b) =>
    (a.settled_at || '').localeCompare(b.settled_at || '')
  );

  const matched = [];
  for (let i = 0; i < sortedQonto.length; i++) {
    const qt = sortedQonto[i];
    const qtDate = (qt.settled_at || qt.emitted_at || '').slice(0, 10);
    const prevDate = i > 0
      ? (sortedQonto[i - 1].settled_at || sortedQonto[i - 1].emitted_at || '').slice(0, 10)
      : '2020-01-01';

    const windowInvoices = allInvoices.filter(inv =>
      inv.date > prevDate && inv.date <= qtDate
    );
    if (windowInvoices.length === 0) continue;

    const products = [...new Set(windowInvoices.map(inv => inv.product).filter(Boolean))].join(', ');
    matched.push({
      payout: {
        id: `qonto-${qt.id}`,
        amount: Math.round(qt.amount * 100),
        arrival_date: new Date(qtDate).getTime() / 1000,
      },
      qontoTx: qt,
      invoices: windowInvoices,
      product: products || 'Stripe',
    });
  }

  console.log(`\n${matched.length} payouts matches avec factures`);

  if (limit > 0) matched.length = Math.min(matched.length, limit);

  fs.mkdirSync(outputDir, { recursive: true });
  let uploaded = 0;

  for (const m of matched) {
    const arrivalDate = new Date(m.payout.arrival_date * 1000).toISOString().slice(0, 10);
    const payoutAmount = (m.payout.amount / 100).toFixed(2);
    const label = `${arrivalDate} | ${m.product} | ${m.invoices.length} factures | ${payoutAmount} EUR`;

    if (!doUpload) {
      console.log(`  [DRY-RUN] ${label}`);
      m.invoices.slice(0, 3).forEach(inv =>
        console.log(`    ${inv.number} | ${(inv.client || '').slice(0, 25)} | ${inv.total.toFixed(2)} EUR`)
      );
      if (m.invoices.length > 3) console.log(`    ... +${m.invoices.length - 3} autres`);
      continue;
    }

    const filename = `recap-${m.product.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${arrivalDate}.pdf`;
    const pdfPath = path.join(outputDir, filename);
    await generateSummaryPdf(m.payout, m.invoices, m.product, company, pdfPath);

    const result = await uploadAttachment(m.qontoTx.id, pdfPath, filename);
    if (result.ok) {
      console.log(`  [OK] ${label}`);
      uploaded++;
    } else {
      console.log(`  [ERR ${result.status}] ${label}`);
    }
    await sleep(300);
  }

  console.log(`\n${doUpload ? uploaded + ' recapitulatif(s) uploade(s)' : matched.length + ' a uploader'}. Termine.`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('Erreur:', err.message);
    process.exit(1);
  });
}
