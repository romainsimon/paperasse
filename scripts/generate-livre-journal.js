#!/usr/bin/env node

/**
 * Générateur de Livre-Journal belge
 *
 * En Belgique, il n'existe pas de format normalisé équivalent au FEC français
 * (art. A 47 A-1 LPF). L'obligation belge est de tenir un livre-journal
 * probant (loi du 17 juillet 1975, AR du 12 septembre 1983).
 *
 * Ce script génère un export CSV du livre-journal compatible avec:
 * - Les exigences de la loi comptable belge (art. 3 loi 17 juillet 1975)
 * - Le contrôle fiscal belge (art. 315 CIR 92 — communication des livres)
 * - Les logiciels comptables belges standard (Winbooks, Exact, Octopus)
 *
 * Format de sortie: CSV avec séparateur point-virgule
 * Colonnes: Date;Journal;Référence;Libellé;CompteDebit;CompteCredit;Montant;Devise
 *
 * Usage:
 *   node scripts/generate-livre-journal.js
 *   node scripts/generate-livre-journal.js --output /chemin/sortie
 *
 * Prérequis:
 *   - company.json (copier company.example.json et remplir)
 *   - data/journal-entries.json (écritures comptables)
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

function loadPCMN() {
  // Chercher un fichier pcmn_*.json dans data/ (Plan Comptable Minimum Normalisé belge)
  const dataDir = path.join(ROOT, 'data');
  if (!fs.existsSync(dataDir)) return {};

  const pcmnFiles = fs.readdirSync(dataDir).filter(f => f.match(/^pcmn_\d{4}\.json$/));
  if (pcmnFiles.length > 0) {
    const pcmn = JSON.parse(fs.readFileSync(path.join(dataDir, pcmnFiles[pcmnFiles.length - 1]), 'utf8'));
    const map = {};
    for (const entry of (pcmn.flat || [])) {
      map[String(entry.number)] = entry.label;
    }
    return map;
  }

  // Fallback : chercher aussi pcg_*.json (compatibilité) si pas de PCMN
  const pcgFiles = fs.readdirSync(dataDir).filter(f => f.match(/^pcg_\d{4}\.json$/));
  if (pcgFiles.length === 0) return {};
  const pcg = JSON.parse(fs.readFileSync(path.join(dataDir, pcgFiles[pcgFiles.length - 1]), 'utf8'));
  const map = {};
  for (const entry of (pcg.flat || [])) {
    map[String(entry.number)] = entry.label;
  }
  return map;
}

// ---------------------------------------------------------------------------
// Noms de journaux (extensible)
// ---------------------------------------------------------------------------

const DEFAULT_JOURNAL_NAMES = {
  'AC': 'Achats',
  'VE': 'Ventes',
  'BQ': 'Banque',
  'BN': 'Banque secondaire',
  'OD': 'Opérations Diverses',
  'AN': 'A Nouveaux',
  'SA': 'Salaires',
  'CA': 'Caisse',
};

// ---------------------------------------------------------------------------
// Formatage
// ---------------------------------------------------------------------------

function formatDate(isoDate) {
  // Format DD/MM/YYYY — standard belge
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

function formatAmount(amount) {
  if (amount === 0) return '0,00';
  return Math.abs(amount).toFixed(2).replace('.', ',');
}

function escapeCsv(str) {
  const s = String(str || '');
  if (s.includes(';') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// ---------------------------------------------------------------------------
// Validation PCMN belge
// Comptes belges: classes 1 à 7 (actif, passif, charges, produits)
// Classe 8 et 9 : comptes d'ordre (facultatifs)
// ---------------------------------------------------------------------------

function validatePCMNAccount(accountStr) {
  const first = String(accountStr).charAt(0);
  return ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(first);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const company = loadCompany();
  const pcmnNames = loadPCMN();

  // BCE — identifiant légal belge (remplace SIREN français)
  const bce = (company.bce || '').replace(/\./g, '').replace(/\s/g, '');
  const nomSociete = (company.name || 'Societe').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
  const closingDate = (company.fiscal_year && company.fiscal_year.end || '').replace(/-/g, '');

  // Parse arguments
  let outputDir = path.join(ROOT, 'output');
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[i + 1];
      i++;
    }
  }

  // Chargement des écritures
  const entriesPath = path.join(ROOT, 'data', 'journal-entries.json');
  if (!fs.existsSync(entriesPath)) {
    console.error('Erreur : data/journal-entries.json introuvable.');
    console.error('Generez vos ecritures comptables et placez-les dans data/journal-entries.json');
    process.exit(1);
  }

  const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  console.log('Generation du livre-journal belge...');
  console.log('Ecritures en entree : ' + entries.length);

  const journalNames = { ...DEFAULT_JOURNAL_NAMES };

  // En-tête CSV (colonnes livre-journal belge)
  // Compatible Winbooks, Exact Online Belgique, Octopus
  const header = [
    'Date',
    'Journal',
    'Reference',
    'Libelle',
    'CompteDebit',
    'CompteCredit',
    'Montant',
    'Devise',
  ].join(';');

  const csvLines = [header];
  let lineCount = 0;
  let pcmnWarnings = 0;

  // Tri chronologique, puis par numéro d'écriture
  entries.sort((a, b) => {
    const dateComp = a.date.localeCompare(b.date);
    if (dateComp !== 0) return dateComp;
    return (a.num || 0) - (b.num || 0);
  });

  // Vérification équilibre des écritures
  let errors = 0;
  for (const entry of entries) {
    const totalDebit = entry.lines.reduce((s, l) => s + (l.debit || 0), 0);
    const totalCredit = entry.lines.reduce((s, l) => s + (l.credit || 0), 0);
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      console.warn('  ATTENTION : ecriture #' + entry.num + ' desequilibree (D=' + totalDebit.toFixed(2) + ' C=' + totalCredit.toFixed(2) + ')');
      errors++;
    }
  }

  // Génération des lignes CSV
  // Format livre-journal belge : une ligne par couple débit/crédit par écriture
  for (const entry of entries) {
    const dateFormatted = formatDate(entry.date);
    const journalCode = entry.journal;
    const journalLib = journalNames[journalCode] || journalCode;
    const reference = entry.ref || String(entry.num || '').padStart(6, '0');
    const libelle = entry.label || '';

    // Vérification PCMN pour chaque compte
    for (const line of entry.lines) {
      const compteNum = String(line.account);
      if (!validatePCMNAccount(compteNum)) {
        console.warn(`  ATTENTION : compte "${compteNum}" hors plage PCMN belge (classes 1-9)`);
        pcmnWarnings++;
      }
    }

    // Pour chaque ligne de débit non nulle, chercher la contrepartie crédit
    const debitLines = entry.lines.filter(l => (l.debit || 0) > 0.001);
    const creditLines = entry.lines.filter(l => (l.credit || 0) > 0.001);

    if (debitLines.length > 0 && creditLines.length > 0) {
      // Lignes croisées débit/crédit : une ligne CSV par débit avec le premier crédit
      // (simplifié — pour des écritures complexes, exporter chaque débit séparément)
      for (const debitLine of debitLines) {
        const compteDebit = String(debitLine.account);
        // Pour la contrepartie, prendre le premier compte crédit de l'écriture
        const compteCredit = String(creditLines[0].account);
        const montant = formatAmount(debitLine.debit || 0);
        const devise = debitLine.foreign_currency || 'EUR';

        const csvLine = [
          escapeCsv(dateFormatted),
          escapeCsv(journalLib),
          escapeCsv(reference),
          escapeCsv(libelle),
          escapeCsv(compteDebit),
          escapeCsv(compteCredit),
          montant,
          escapeCsv(devise),
        ].join(';');

        csvLines.push(csvLine);
        lineCount++;
      }
    } else {
      // Écriture avec seulement des débits ou crédits (inhabituel mais géré)
      for (const line of entry.lines) {
        const montant = formatAmount((line.debit || 0) + (line.credit || 0));
        const compteDebit = (line.debit || 0) > 0 ? String(line.account) : '';
        const compteCredit = (line.credit || 0) > 0 ? String(line.account) : '';
        const devise = line.foreign_currency || 'EUR';

        const csvLine = [
          escapeCsv(dateFormatted),
          escapeCsv(journalLib),
          escapeCsv(reference),
          escapeCsv(libelle),
          escapeCsv(compteDebit),
          escapeCsv(compteCredit),
          montant,
          escapeCsv(devise),
        ].join(';');

        csvLines.push(csvLine);
        lineCount++;
      }
    }
  }

  // Nom du fichier : [NomSociete]_LivreJournal_YYYYMMDD.csv
  fs.mkdirSync(outputDir, { recursive: true });
  const fileName = `${nomSociete}_LivreJournal_${closingDate}.csv`;
  const outputPath = path.join(outputDir, fileName);

  // BOM UTF-8 pour compatibilité Excel belge (séparateur ;)
  fs.writeFileSync(outputPath, '﻿' + csvLines.join('\r\n') + '\r\n', 'utf8');

  console.log('');
  console.log('Livre-journal belge genere : ' + fileName);
  console.log('Lignes (hors en-tete) : ' + lineCount);
  console.log('BCE societe : ' + (company.bce || '(non renseigne dans company.json)'));
  if (errors > 0) {
    console.log('Ecritures desequilibrees : ' + errors);
  }
  if (pcmnWarnings > 0) {
    console.log('Comptes hors PCMN : ' + pcmnWarnings + ' (verifier la conformite)');
  }
  console.log('Fichier : ' + outputPath);
  console.log('');
  console.log('Note : Ce fichier repond a l\'obligation belge de livre-journal (loi 17 juillet 1975,');
  console.log('       art. 315 CIR 92). Il n\'existe pas de format normalise FEC en Belgique.');
}

main();
