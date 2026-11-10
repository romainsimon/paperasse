#!/usr/bin/env node

/**
 * Generateur de PDFs professionnels pour documents comptables.
 *
 * Convertit les fichiers Markdown en PDFs avec en-tete societe,
 * pagination, et mise en forme professionnelle A4.
 *
 * Usage:
 *   node scripts/generate-pdfs.js
 *   node scripts/generate-pdfs.js --input /chemin/md --output /chemin/pdf
 *
 * Prerequis:
 *   npm install (marked, puppeteer)
 *   company.json rempli
 *
 * Fichiers traites (dans le dossier input) :
 *   - bilan.md
 *   - compte-de-resultat.md
 *   - balance.md
 *   - grand-livre.md
 *   - liasse-fiscale-2033.md
 *   - is-declaration.md
 *   - approbation-comptes.md
 *   - declaration-confidentialite (template HTML)
 *   - Tout fichier .md present dans le dossier input
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

function loadCompany() {
  const p = path.join(ROOT, 'company.json');
  if (!fs.existsSync(p)) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// CSS
// ---------------------------------------------------------------------------

const CSS = `
  @page { size: A4; margin: 20mm; }
  * { box-sizing: border-box; }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    color: #1a1a1a;
    margin: 0; padding: 0;
  }

  /* ---- Company header block ---- */
  .doc-header {
    border: 1.5pt solid #222;
    padding: 16px 24px;
    margin-bottom: 30px;
    text-align: center;
  }
  .doc-header .company-name {
    font-size: 17pt;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }
  .doc-header .company-details {
    font-size: 8.5pt;
    color: #444;
    line-height: 1.8;
  }

  /* ---- Headings ---- */
  h1 {
    font-size: 15pt;
    font-weight: bold;
    border-bottom: 2pt solid #222;
    padding-bottom: 5px;
    margin-top: 28px;
    margin-bottom: 14px;
    page-break-after: avoid;
  }
  h2 {
    font-size: 11.5pt;
    font-weight: bold;
    color: #222;
    margin-top: 22px;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    page-break-after: avoid;
  }
  h3 {
    font-size: 10.5pt;
    font-weight: bold;
    color: #333;
    margin-top: 16px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }

  /* ---- Tables ---- */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }
  th {
    background-color: #eaeaea;
    border-top: 1.5pt solid #333;
    border-bottom: 1.5pt solid #333;
    border-left: 0.5pt solid #ccc;
    border-right: 0.5pt solid #ccc;
    padding: 7px 12px;
    text-align: left;
    font-weight: bold;
    font-size: 9pt;
  }
  td {
    border-bottom: 0.5pt solid #ddd;
    border-left: 0.5pt solid #e5e5e5;
    border-right: 0.5pt solid #e5e5e5;
    padding: 6px 12px;
    vertical-align: top;
  }
  tr:last-child td {
    border-bottom: 1.5pt solid #333;
  }
  td:nth-child(n+2), th:nth-child(n+2) { text-align: right; }
  td:first-child, th:first-child { text-align: left; }
  tr:nth-child(even) { background-color: #f7f7f7; }

  /* ---- Prose ---- */
  blockquote {
    border-left: 2.5pt solid #aaa;
    margin: 12px 0;
    padding: 8px 16px;
    color: #444;
    font-size: 9.5pt;
    background-color: #f8f8f8;
  }
  code, pre { font-family: 'Courier New', monospace; font-size: 8.5pt; }
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border: 0.75pt solid #ccc;
    page-break-inside: avoid;
  }
  hr { border: none; border-top: 0.75pt solid #bbb; margin: 18px 0; }
  ul, ol { margin: 8px 0; padding-left: 24px; }
  li { margin: 4px 0; }
  p { margin: 8px 0; }

  .page-break { page-break-before: always; }

  /* ---- Table cells: wrapping ---- */
  td, th { white-space: nowrap; }
  td:first-child, th:first-child { white-space: normal; min-width: 180px; }

  /* ---- Compact mode ---- */
  body.compact { font-size: 9pt; line-height: 1.3; }
  body.compact h1 { font-size: 13pt; margin-top: 10px; margin-bottom: 6px; }
  body.compact h2 { font-size: 10.5pt; margin-top: 8px; margin-bottom: 4px; }
  body.compact hr { margin: 6px 0; }
  body.compact table { font-size: 8.5pt; margin: 4px 0; }
  body.compact td { padding: 3px 8px; }
  body.compact th { padding: 4px 8px; font-size: 8pt; }
  body.compact .doc-header { padding: 8px 16px; margin-bottom: 10px; }
  body.compact .doc-header .company-name { font-size: 14pt; margin-bottom: 4px; }
  body.compact .doc-header .company-details { font-size: 7.5pt; line-height: 1.5; }
  body.compact p { margin: 3px 0; }
  body.compact blockquote { margin: 4px 0; padding: 4px 10px; font-size: 8.5pt; }
`;

// ---------------------------------------------------------------------------
// HTML builders
// ---------------------------------------------------------------------------

function buildHeader(company) {
  const form = company.legal_form + ' au capital de ' + company.capital.toLocaleString('fr-FR') + ' \u20ac';
  return `
    <div class="doc-header">
      <div class="company-name">${company.name}</div>
      <div class="company-details">
        ${form}<br>
        ${company.address}<br>
        SIREN ${company.siren} &middot; ${company.rcs}
      </div>
    </div>`;
}

function wrapHtml(bodyHtml, title, company, { compact = false } = {}) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>${CSS}</style>
</head>
<body${compact ? ' class="compact"' : ''}>
  ${buildHeader(company)}
  ${bodyHtml}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Content processing
// ---------------------------------------------------------------------------

function cleanMarkdown(md) {
  // Remove common emojis
  md = md.replace(/[\u2705\u2B1C\u274C\u2753\u26A0\uFE0F\u2611\u2610\u2612\u2714\u2716\u25A0\u25B6\u25C0\u2B50\u{1F4A1}\u{1F4DD}\u{1F4CB}\u{1F4CA}\u{1F4C8}\u{1F4B0}\u{1F4B5}\u{1F50D}\u{1F6A8}\u{1F6E0}\u{1F527}\u{1F389}\u{1F680}]/gu, '');
  // Convert checkboxes to plain bullets
  md = md.replace(/- \[x\] /g, '- ');
  md = md.replace(/- \[ \] /g, '- \u25A1 ');
  return md;
}

/**
 * Add the euro symbol to monetary amounts in HTML table cells.
 */
function addEuroSymbol(html) {
  return html.replace(
    /(<td[^>]*>)((?:<(?:strong|em)>)?)\s*(-?\d[\d\u00a0 ]*,\d{2})\s*((?:<\/(?:strong|em)>)?)<\/td>/g,
    (match, tdOpen, tagOpen, amount, tagClose) => {
      if (match.includes('\u20ac') || match.includes('%')) return match;
      return `${tdOpen}${tagOpen}${amount}\u00a0\u20ac${tagClose}</td>`;
    }
  );
}

// ---------------------------------------------------------------------------
// Document definitions
// ---------------------------------------------------------------------------

function getDocuments(inputDir) {
  // Auto-discover markdown files in the input directory
  if (!fs.existsSync(inputDir)) return [];

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md')).sort();
  const docs = [];

  // Known documents with specific settings
  const KNOWN = {
    'comptes-annuels.md': { title: 'Comptes Annuels' },
    'bilan.md': { title: 'Bilan' },
    'compte-de-resultat.md': { title: 'Compte de Resultat' },
    'balance.md': { title: 'Balance Generale', compact: true },
    'grand-livre.md': { title: 'Grand Livre' },
    'liasse-fiscale-2033.md': { title: 'Liasse Fiscale 2033' },
    'is-declaration.md': { title: 'Declaration IS' },
    'approbation-comptes.md': { title: "Decision de l'Associe Unique" },
    'depot-greffe-checklist.md': { title: 'Depot Greffe - Checklist' },
    'etat-actes-accomplis.md': { title: 'Etat des Actes Accomplis' },
  };

  for (const file of files) {
    const known = KNOWN[file] || {};
    docs.push({
      source: file,
      output: file.replace('.md', '.pdf'),
      title: known.title || file.replace('.md', '').replace(/-/g, ' '),
      compact: known.compact || false,
    });
  }

  return docs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { marked } = await import('marked');
  const puppeteer = await import('puppeteer');

  marked.setOptions({ gfm: true, breaks: false });

  const company = loadCompany();

  // Parse arguments
  let inputDir = path.join(ROOT, 'output');
  let pdfDir = path.join(ROOT, 'output', 'pdf');
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' && args[i + 1]) { inputDir = args[i + 1]; i++; }
    if (args[i] === '--output' && args[i + 1]) { pdfDir = args[i + 1]; i++; }
  }

  const documents = getDocuments(inputDir);
  if (documents.length === 0) {
    console.log('Aucun fichier .md trouve dans ' + inputDir);
    console.log('Generez d\'abord les etats financiers avec : node scripts/generate-statements.js');
    process.exit(0);
  }

  fs.mkdirSync(pdfDir, { recursive: true });

  console.log('Lancement du navigateur...');
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox'],
  });

  const footerFont = "'Helvetica Neue', Helvetica, Arial, sans-serif";
  const footerHtml = `
    <div style="width:100%; text-align:center; font-size:7.5px; color:#888; font-family:${footerFont}; padding:0 20mm;">
      ${company.name} &middot; SIREN ${company.siren} &middot; ${company.rcs}
      <span style="margin-left:16px;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`;

  let generated = 0;
  let errors = 0;

  for (const doc of documents) {
    console.log('  ' + doc.output);

    try {
      const mdPath = path.join(inputDir, doc.source);
      let md = fs.readFileSync(mdPath, 'utf-8');
      md = cleanMarkdown(md);

      let bodyHtml = marked.parse(md);
      bodyHtml = addEuroSymbol(bodyHtml);

      const html = wrapHtml(bodyHtml, doc.title, company, { compact: doc.compact });
      const outputPath = path.join(pdfDir, doc.output);

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '20mm', right: '20mm', bottom: '22mm', left: '20mm' },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: footerHtml,
      });
      await page.close();

      const stats = fs.statSync(outputPath);
      console.log('    OK (' + Math.round(stats.size / 1024) + ' KB)');
      generated++;
    } catch (err) {
      console.error('    ERREUR : ' + err.message);
      errors++;
    }
  }

  // Also generate declaration-confidentialite from HTML template if it exists
  const confTemplatePath = path.join(ROOT, 'templates', 'declaration-confidentialite.html');
  if (fs.existsSync(confTemplatePath)) {
    console.log('  declaration-confidentialite.pdf');
    try {
      let html = fs.readFileSync(confTemplatePath, 'utf-8');
      // Replace placeholders with company data
      html = html.replace(/\{\{company\.name\}\}/g, company.name);
      html = html.replace(/\{\{company\.rcs\}\}/g, company.siren.replace(/\s/g, ' ') + ' ' + company.rcs);
      html = html.replace(/\{\{company\.president\}\}/g,
        company.president.civility + ' ' + company.president.first_name + ' ' + company.president.last_name + ', ' + company.president.title
      );
      html = html.replace(/\{\{company\.fiscal_year\.end_formatted\}\}/g,
        new Date(company.fiscal_year.end).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      );
      html = html.replace(/\{\{company\.city\}\}/g, company.city || '');

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: path.join(pdfDir, 'declaration-confidentialite.pdf'),
        format: 'A4',
        margin: { top: '25mm', right: '30mm', bottom: '25mm', left: '30mm' },
        printBackground: true,
      });
      await page.close();

      const stats = fs.statSync(path.join(pdfDir, 'declaration-confidentialite.pdf'));
      console.log('    OK (' + Math.round(stats.size / 1024) + ' KB)');
      generated++;
    } catch (err) {
      console.error('    ERREUR : ' + err.message);
      errors++;
    }
  }

  await browser.close();
  console.log('\n  ' + generated + ' PDFs generes -> ' + pdfDir);
  if (errors > 0) console.log('  ' + errors + ' erreur(s)');
}

main().catch((err) => {
  console.error('Erreur fatale :', err);
  process.exit(1);
});
