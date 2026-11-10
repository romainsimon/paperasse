#!/usr/bin/env node

/**
 * Generateur de FEC (Fichier des Ecritures Comptables)
 *
 * Format normalise article A 47 A-1 du LPF
 * 18 colonnes, separateur pipe (|)
 * Nom du fichier : SirenFECAAAAMMJJ.txt
 *
 * Usage:
 *   node scripts/generate-fec.js
 *   node scripts/generate-fec.js --output /chemin/sortie
 *
 * Prerequis:
 *   - company.json (copier company.example.json et remplir)
 *   - data/journal-entries.json (ecritures comptables au format standard)
 *
 * Format journal-entries.json attendu :
 * [
 *   {
 *     "num": 1,
 *     "date": "2025-03-06",
 *     "journal": "BQ",
 *     "ref": "QTO-001",
 *     "label": "Achat fournitures",
 *     "lines": [
 *       { "account": "606", "debit": 100.00, "credit": 0 },
 *       { "account": "5121", "debit": 0, "credit": 100.00 }
 *     ]
 *   }
 * ]
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ROOT = path.join(__dirname, '..');

function loadCompany() {
  const companyPath = path.join(ROOT, 'company.json');
  if (!fs.existsSync(companyPath)) {
    console.error('Erreur : company.json introuvable.');
    console.error('Copiez company.example.json vers company.json et remplissez vos informations.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(companyPath, 'utf8'));
}

function loadPCG() {
  const pcgFiles = fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.match(/^pcg_\d{4}\.json$/));
  if (pcgFiles.length === 0) return {};
  const pcg = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', pcgFiles[pcgFiles.length - 1]), 'utf8'));
  const map = {};
  for (const entry of (pcg.flat || [])) {
    map[String(entry.number)] = entry.label;
  }
  return map;
}

// ---------------------------------------------------------------------------
// Journal name mapping (extensible)
// ---------------------------------------------------------------------------

const DEFAULT_JOURNAL_NAMES = {
  'AC': 'Achats',
  'VE': 'Ventes',
  'BQ': 'Banque',
  'BN': 'Banque secondaire',
  'OD': 'Operations Diverses',
  'AN': 'A Nouveaux',
  'SA': 'Salaires',
  'CA': 'Caisse',
};

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatDate(isoDate) {
  return isoDate.replace(/-/g, '');
}

function formatAmount(amount) {
  if (amount === 0) return '0,00';
  return Math.abs(amount).toFixed(2).replace('.', ',');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const company = loadCompany();
  const pcgNames = loadPCG();

  const siren = company.siren.replace(/\s/g, '');
  const closingDate = company.fiscal_year.end.replace(/-/g, '');

  // Parse arguments
  let outputDir = path.join(ROOT, 'output');
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[i + 1];
      i++;
    }
  }

  // Load journal entries
  const entriesPath = path.join(ROOT, 'data', 'journal-entries.json');
  if (!fs.existsSync(entriesPath)) {
    console.error('Erreur : data/journal-entries.json introuvable.');
    console.error('Generez vos ecritures comptables et placez-les dans data/journal-entries.json');
    process.exit(1);
  }

  const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  console.log('Generation du FEC...');
  console.log('Ecritures en entree : ' + entries.length);

  // Load custom journal names if present
  const journalNames = { ...DEFAULT_JOURNAL_NAMES };

  // FEC header (18 columns)
  const header = [
    'JournalCode',
    'JournalLib',
    'EcritureNum',
    'EcritureDate',
    'CompteNum',
    'CompteLib',
    'CompteAuxNum',
    'CompteAuxLib',
    'PieceRef',
    'PieceDate',
    'EcritureLib',
    'Debit',
    'Credit',
    'EcritureLet',
    'DateLet',
    'ValidDate',
    'Montantdevise',
    'Idevise',
  ].join('|');

  const lines = [header];
  let lineCount = 0;

  // Sort entries by date, then by entry number
  entries.sort((a, b) => {
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return a.num - b.num;
  });

  // Validate entries
  let errors = 0;
  for (const entry of entries) {
    const totalDebit = entry.lines.reduce((s, l) => s + (l.debit || 0), 0);
    const totalCredit = entry.lines.reduce((s, l) => s + (l.credit || 0), 0);
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      console.warn('  ATTENTION : ecriture #' + entry.num + ' desequilibree (D=' + totalDebit.toFixed(2) + ' C=' + totalCredit.toFixed(2) + ')');
      errors++;
    }
  }

  for (const entry of entries) {
    const ecritureNum = String(entry.num).padStart(6, '0');
    const ecritureDate = formatDate(entry.date);
    const journalCode = entry.journal;
    const journalLib = journalNames[journalCode] || journalCode;
    const pieceRef = entry.ref || '';
    const pieceDate = ecritureDate;
    const ecritureLib = entry.label || '';
    const validDate = ecritureDate;

    for (const line of entry.lines) {
      const compteNum = String(line.account);
      const compteLib = line.account_name || pcgNames[compteNum] || compteNum;

      // FEC foreign currency fields
      const montantDevise = line.foreign_amount ? formatAmount(line.foreign_amount) : '';
      const iDevise = line.foreign_currency || '';

      const fecLine = [
        journalCode,
        journalLib,
        ecritureNum,
        ecritureDate,
        compteNum,
        compteLib,
        line.aux_account || '',
        line.aux_name || '',
        pieceRef,
        pieceDate,
        ecritureLib,
        formatAmount(line.debit || 0),
        formatAmount(line.credit || 0),
        line.lettrage || '',
        line.date_lettrage ? formatDate(line.date_lettrage) : '',
        validDate,
        montantDevise,
        iDevise,
      ].join('|');

      lines.push(fecLine);
      lineCount++;
    }
  }

  // Write FEC file
  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = siren + 'FEC' + closingDate + '.txt';
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');

  console.log('');
  console.log('FEC genere : ' + fileName);
  console.log('Lignes (hors en-tete) : ' + lineCount);
  if (errors > 0) {
    console.log('Ecritures desequilibrees : ' + errors);
  }
  console.log('Fichier : ' + outputPath);
}

main();
