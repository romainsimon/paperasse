#!/usr/bin/env node

/**
 * Generateur d'etats financiers (Bilan + Compte de Resultat)
 *
 * Lit data/journal-entries.json et company.json
 * Produit : output/bilan.md, output/compte-de-resultat.md, output/balance.md
 *
 * Usage:
 *   node scripts/generate-statements.js
 *   node scripts/generate-statements.js --output /chemin/sortie
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
    console.error('Copiez company.example.json vers company.json et remplissez vos informations.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
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
// Helpers
// ---------------------------------------------------------------------------

function round2(n) {
  return Math.round(n * 100) / 100;
}

function fmt(n) {
  return round2(n).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPeriod(company) {
  const start = new Date(company.fiscal_year.start);
  const end = new Date(company.fiscal_year.end);
  const fmtDate = (d) => d.toLocaleDateString('fr-FR');
  return fmtDate(start) + ' au ' + fmtDate(end);
}

function daysInPeriod(company) {
  const start = new Date(company.fiscal_year.start);
  const end = new Date(company.fiscal_year.end);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

// ---------------------------------------------------------------------------
// Account balances
// ---------------------------------------------------------------------------

function computeBalances(entries) {
  const accounts = {};
  for (const entry of entries) {
    for (const line of entry.lines) {
      const acct = String(line.account);
      if (!accounts[acct]) accounts[acct] = { debit: 0, credit: 0 };
      accounts[acct].debit += line.debit || 0;
      accounts[acct].credit += line.credit || 0;
    }
  }
  return accounts;
}

function solde(accounts, acct) {
  if (!accounts[acct]) return 0;
  return round2(accounts[acct].debit - accounts[acct].credit);
}

function soldeCrediteur(accounts, acct) {
  return -solde(accounts, acct);
}

/**
 * Collect all accounts whose number starts with the given prefix.
 * Returns the sum of debit balances (for class 2, 5, 6) or credit balances (for class 1, 4, 7).
 */
function sumAccountsStartingWith(accounts, prefix) {
  let totalDebit = 0;
  let totalCredit = 0;
  for (const [acct, bal] of Object.entries(accounts)) {
    if (acct.startsWith(prefix)) {
      totalDebit += bal.debit;
      totalCredit += bal.credit;
    }
  }
  return { debit: round2(totalDebit), credit: round2(totalCredit), solde: round2(totalDebit - totalCredit) };
}

// ---------------------------------------------------------------------------
// Compte de Resultat
// ---------------------------------------------------------------------------

function generatePL(accounts, company, pcgNames) {
  const period = formatPeriod(company);
  const firstYear = company.fiscal_year.is_first_year ? ' (premier exercice)' : '';

  let md = '# Compte de Resultat\n\n';
  md += 'Exercice : ' + period + firstYear + '\n\n';
  md += '---\n\n';

  // Collect all class 7 accounts (produits) and class 6 accounts (charges)
  const class7 = {};
  const class6 = {};
  for (const [acct, bal] of Object.entries(accounts)) {
    if (acct.startsWith('7')) class7[acct] = bal;
    if (acct.startsWith('6')) class6[acct] = bal;
  }

  // --- PRODUITS ---
  md += '## I. PRODUITS D\'EXPLOITATION\n\n';
  md += '| Poste | Montant |\n';
  md += '|-------|--------:|\n';

  // Chiffre d'affaires (70x)
  let totalCA = 0;
  const caAccounts = Object.entries(class7)
    .filter(([a]) => a.startsWith('70'))
    .sort(([a], [b]) => a.localeCompare(b));

  if (caAccounts.length > 0) {
    md += '| Chiffre d\'affaires net | |\n';
    for (const [acct, bal] of caAccounts) {
      const amount = round2(bal.credit - bal.debit);
      totalCA += amount;
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';
    }
    md += '| **Total chiffre d\'affaires** | **' + fmt(totalCA) + '** |\n';
    md += '| | |\n';
  }

  // Autres produits (71x-78x)
  let totalAutresProduits = 0;
  const autresProduitsAccounts = Object.entries(class7)
    .filter(([a]) => !a.startsWith('70'))
    .sort(([a], [b]) => a.localeCompare(b));

  if (autresProduitsAccounts.length > 0) {
    md += '| Autres produits | |\n';
    for (const [acct, bal] of autresProduitsAccounts) {
      const amount = round2(bal.credit - bal.debit);
      totalAutresProduits += amount;
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';
    }
  }

  const totalProduits = round2(totalCA + totalAutresProduits);
  md += '| **Total produits d\'exploitation** | **' + fmt(totalProduits) + '** |\n';
  md += '\n';

  // --- CHARGES ---
  md += '## II. CHARGES D\'EXPLOITATION\n\n';
  md += '| Poste | Montant |\n';
  md += '|-------|--------:|\n';

  // Group charges by category
  const chargeGroups = {
    '60': { label: 'Achats consommes', accounts: [] },
    '61': { label: 'Services exterieurs', accounts: [] },
    '62': { label: 'Autres services exterieurs', accounts: [] },
    '63': { label: 'Impots et taxes', accounts: [] },
    '64': { label: 'Charges de personnel', accounts: [] },
    '65': { label: 'Autres charges de gestion courante', accounts: [] },
    '66': { label: 'Charges financieres', accounts: [] },
    '67': { label: 'Charges exceptionnelles', accounts: [] },
    '68': { label: 'Dotations aux amortissements et provisions', accounts: [] },
    '69': { label: 'Impots sur les benefices', accounts: [] },
  };

  for (const [acct, bal] of Object.entries(class6).sort(([a], [b]) => a.localeCompare(b))) {
    const prefix = acct.substring(0, 2);
    if (chargeGroups[prefix]) {
      chargeGroups[prefix].accounts.push([acct, bal]);
    }
  }

  let totalCharges = 0;
  let isAmount = 0;

  for (const [prefix, group] of Object.entries(chargeGroups)) {
    if (group.accounts.length === 0) continue;

    md += '| **' + group.label + '** | |\n';
    let groupTotal = 0;

    for (const [acct, bal] of group.accounts) {
      const amount = round2(bal.debit - bal.credit);
      groupTotal += amount;
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';

      // Track IS separately
      if (acct.startsWith('695')) isAmount = amount;
    }

    md += '| &nbsp;&nbsp;*Sous-total* | *' + fmt(groupTotal) + '* |\n';
    md += '| | |\n';
    totalCharges += groupTotal;
  }

  totalCharges = round2(totalCharges);
  md += '| **Total charges** | **' + fmt(totalCharges) + '** |\n';
  md += '\n';

  // --- RESULTAT ---
  const resultatExploitation = round2(totalProduits - totalCharges + isAmount); // Hors IS
  const resultatNet = round2(totalProduits - totalCharges);

  md += '## III. RESULTAT\n\n';
  md += '| | Montant |\n';
  md += '|--|--------:|\n';
  md += '| Total produits | ' + fmt(totalProduits) + ' |\n';
  md += '| Total charges (hors IS) | ' + fmt(round2(totalCharges - isAmount)) + ' |\n';
  md += '| **Resultat avant impot** | **' + fmt(resultatExploitation) + '** |\n';
  md += '| Impot sur les societes (695) | ' + fmt(isAmount) + ' |\n';
  md += '| **Resultat net** | **' + fmt(resultatNet) + '** |\n';

  return { md, totalProduits, totalCharges, resultatExploitation, isAmount, resultatNet };
}

// ---------------------------------------------------------------------------
// Bilan
// ---------------------------------------------------------------------------

function generateBilan(accounts, company, pcgNames, plData) {
  const endDate = new Date(company.fiscal_year.end).toLocaleDateString('fr-FR');
  const firstYear = company.fiscal_year.is_first_year ? ' (premier exercice)' : '';

  let md = '# Bilan\n\n';
  md += 'Au ' + endDate + firstYear + '\n\n';
  md += '---\n\n';

  // ==================== ACTIF ====================
  md += '## ACTIF\n\n';
  md += '| Poste | Brut | Amort./Deprec. | Net |\n';
  md += '|-------|-----:|---------------:|----:|\n';

  // Immobilisations (class 2, excluding 28x amortissements and 29x depreciations)
  const immoAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('2') && !a.startsWith('28') && !a.startsWith('29'))
    .sort(([a], [b]) => a.localeCompare(b));

  const amortAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('28') || a.startsWith('29'))
    .sort(([a], [b]) => a.localeCompare(b));

  let totalImmoBrut = 0;
  let totalAmort = 0;

  if (immoAccounts.length > 0) {
    md += '| **ACTIF IMMOBILISE** | | | |\n';

    const matchedAmort = new Set();

    for (const [acct, bal] of immoAccounts) {
      const brut = round2(bal.debit - bal.credit);
      // Find corresponding amortization account (28 + suffix)
      const amortAcct = '28' + acct.substring(1);
      let amort = 0;
      if (accounts[amortAcct]) {
        matchedAmort.add(amortAcct);
        amort = round2(accounts[amortAcct].credit - accounts[amortAcct].debit);
      }
      const net = round2(brut - amort);
      const name = pcgNames[acct] || acct;

      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(brut) + ' | ' + fmt(amort) + ' | ' + fmt(net) + ' |\n';
      totalImmoBrut += brut;
      totalAmort += amort;
    }

    // 28x/29x accounts not matched above (subdivided charts use e.g. 281000 for
    // 210000, and 29x were counted nowhere): own line so the total stays exact
    for (const [acct, bal] of amortAccounts) {
      if (matchedAmort.has(acct)) continue;
      const amort = round2(bal.credit - bal.debit);
      if (Math.abs(amort) > 0.01) {
        const name = pcgNames[acct] || acct;
        md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | | ' + fmt(amort) + ' | ' + fmt(round2(-amort)) + ' |\n';
        totalAmort += amort;
      }
    }

    md += '| **Total actif immobilise** | **' + fmt(totalImmoBrut) + '** | **' + fmt(totalAmort) + '** | **' + fmt(round2(totalImmoBrut - totalAmort)) + '** |\n';
    md += '| | | | |\n';
  }

  // Actif circulant (class 3 stocks, class 41x creances)
  md += '| **ACTIF CIRCULANT** | | | |\n';

  // Stocks (class 3)
  const stockAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('3') && !a.startsWith('39'))
    .sort(([a], [b]) => a.localeCompare(b));

  let totalStocks = 0;
  for (const [acct, bal] of stockAccounts) {
    const amount = round2(bal.debit - bal.credit);
    if (Math.abs(amount) > 0.01) {
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' | | ' + fmt(amount) + ' |\n';
      totalStocks += amount;
    }
  }

  // Creances (411, 416, 418, 44566, etc.)
  const creanceAccounts = Object.entries(accounts)
    .filter(([a]) => {
      if (a.startsWith('41') && !a.startsWith('419')) return true;
      if (a.startsWith('44') && (a.startsWith('445') || a.startsWith('4456'))) return true;
      if (a.startsWith('486')) return true; // CCA
      return false;
    })
    .sort(([a], [b]) => a.localeCompare(b));

  let totalCreances = 0;
  for (const [acct, bal] of creanceAccounts) {
    const amount = round2(bal.debit - bal.credit);
    if (amount > 0.01) {
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' | | ' + fmt(amount) + ' |\n';
      totalCreances += amount;
    }
  }

  // Tresorerie (class 5)
  md += '| | | | |\n';
  md += '| **TRESORERIE** | | | |\n';

  const tresoAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('5'))
    .sort(([a], [b]) => a.localeCompare(b));

  let totalTreso = 0;
  for (const [acct, bal] of tresoAccounts) {
    const amount = round2(bal.debit - bal.credit);
    if (amount > 0.01) {
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' | | ' + fmt(amount) + ' |\n';
      totalTreso += amount;
    }
  }
  md += '| **Total tresorerie** | **' + fmt(totalTreso) + '** | | **' + fmt(totalTreso) + '** |\n';
  md += '| | | | |\n';

  const totalActif = round2(totalImmoBrut - totalAmort + totalStocks + totalCreances + totalTreso);
  md += '| **TOTAL ACTIF** | | | **' + fmt(totalActif) + '** |\n';
  md += '\n---\n\n';

  // ==================== PASSIF ====================
  md += '## PASSIF\n\n';
  md += '| Poste | Montant |\n';
  md += '|-------|--------:|\n';

  // Capitaux propres (class 1, excluding provisions 15x)
  md += '| **CAPITAUX PROPRES** | |\n';

  const cpAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('1') && !a.startsWith('15') && !a.startsWith('16'))
    .sort(([a], [b]) => a.localeCompare(b));

  let totalCP = 0;
  for (const [acct, bal] of cpAccounts) {
    const amount = round2(bal.credit - bal.debit);
    if (Math.abs(amount) > 0.01) {
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';
      totalCP += amount;
    }
  }

  // Add resultat net
  md += '| &nbsp;&nbsp;Resultat de l\'exercice | ' + fmt(plData.resultatNet) + ' |\n';
  totalCP = round2(totalCP + plData.resultatNet);
  md += '| **Total capitaux propres** | **' + fmt(totalCP) + '** |\n';
  md += '| | |\n';

  // Provisions (15x)
  const provAccounts = Object.entries(accounts)
    .filter(([a]) => a.startsWith('15'))
    .sort(([a], [b]) => a.localeCompare(b));

  let totalProvisions = 0;
  if (provAccounts.length > 0) {
    md += '| **PROVISIONS** | |\n';
    for (const [acct, bal] of provAccounts) {
      const amount = round2(bal.credit - bal.debit);
      if (Math.abs(amount) > 0.01) {
        const name = pcgNames[acct] || acct;
        md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';
        totalProvisions += amount;
      }
    }
    md += '| **Total provisions** | **' + fmt(totalProvisions) + '** |\n';
    md += '| | |\n';
  }

  // Dettes (class 4 credit balances, 16x emprunts, 455 compte courant, 487 PCA)
  md += '| **DETTES** | |\n';

  const detteAccounts = Object.entries(accounts)
    .filter(([a]) => {
      if (a.startsWith('16')) return true; // Emprunts
      if (a.startsWith('40')) return true; // Fournisseurs
      if (a.startsWith('455')) return true; // Compte courant associe
      if (a.startsWith('43')) return true; // Organismes sociaux
      if (a.startsWith('44') && !a.startsWith('445') && !a.startsWith('4456')) return true; // Etat (IS, TVA collectee)
      if (a.startsWith('487')) return true; // PCA
      return false;
    })
    .sort(([a], [b]) => a.localeCompare(b));

  let totalDettes = 0;
  for (const [acct, bal] of detteAccounts) {
    const amount = round2(bal.credit - bal.debit);
    if (amount > 0.01) {
      const name = pcgNames[acct] || acct;
      md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' | ' + fmt(amount) + ' |\n';
      totalDettes += amount;
    }
  }

  // Handle 411 credit balance (unusual, but possible)
  for (const [acct, bal] of Object.entries(accounts)) {
    if (acct.startsWith('41') && !acct.startsWith('419')) {
      const amount = round2(bal.credit - bal.debit);
      if (amount > 0.01) {
        const name = pcgNames[acct] || acct;
        md += '| &nbsp;&nbsp;' + acct + ' — ' + name + ' (solde crediteur) | ' + fmt(amount) + ' |\n';
        totalDettes += amount;
      }
    }
  }

  md += '| **Total dettes** | **' + fmt(totalDettes) + '** |\n';
  md += '| | |\n';

  const totalPassif = round2(totalCP + totalProvisions + totalDettes);
  md += '| **TOTAL PASSIF** | **' + fmt(totalPassif) + '** |\n';
  md += '\n---\n\n';

  // Verification
  md += '## Verification\n\n';
  const ecart = round2(totalActif - totalPassif);
  md += '| | Montant |\n';
  md += '|--|--------:|\n';
  md += '| Total Actif | ' + fmt(totalActif) + ' |\n';
  md += '| Total Passif | ' + fmt(totalPassif) + ' |\n';
  md += '| Ecart | ' + fmt(ecart) + ' |\n';
  md += '\n';

  if (Math.abs(ecart) < 0.01) {
    md += '**Le bilan est equilibre.**\n';
  } else {
    md += '**Ecart de ' + fmt(Math.abs(ecart)) + ' EUR. A investiguer.**\n';
  }

  return { md, totalActif, totalPassif, ecart };
}

// ---------------------------------------------------------------------------
// Balance Generale
// ---------------------------------------------------------------------------

function generateBalance(accounts, company, pcgNames) {
  const period = formatPeriod(company);
  let md = '# Balance Generale\n\n';
  md += 'Exercice : ' + period + '\n\n';
  md += '---\n\n';

  md += '| Compte | Libelle | Total Debit | Total Credit | Solde Debiteur | Solde Crediteur |\n';
  md += '|--------|---------|------------:|-------------:|--------------:|----------------:|\n';

  let grandTotalDebit = 0;
  let grandTotalCredit = 0;

  const sorted = Object.entries(accounts).sort(([a], [b]) => a.localeCompare(b));
  for (const [acct, bal] of sorted) {
    const name = pcgNames[acct] || acct;
    const s = round2(bal.debit - bal.credit);
    const soldeD = s > 0 ? s : 0;
    const soldeC = s < 0 ? Math.abs(s) : 0;

    md += '| ' + acct + ' | ' + name + ' | ' + fmt(bal.debit) + ' | ' + fmt(bal.credit) + ' | ' + fmt(soldeD) + ' | ' + fmt(soldeC) + ' |\n';

    grandTotalDebit += bal.debit;
    grandTotalCredit += bal.credit;
  }

  md += '| | **TOTAUX** | **' + fmt(grandTotalDebit) + '** | **' + fmt(grandTotalCredit) + '** | | |\n';
  md += '\n';

  const ecart = round2(grandTotalDebit - grandTotalCredit);
  if (Math.abs(ecart) < 0.01) {
    md += '**Balance equilibree.**\n';
  } else {
    md += '**Ecart : ' + fmt(ecart) + ' EUR. A investiguer.**\n';
  }

  return md;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const company = loadCompany();
  const pcgNames = loadPCG();

  let outputDir = path.join(ROOT, 'output');
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
      outputDir = args[i + 1];
      i++;
    }
  }

  const entriesPath = path.join(ROOT, 'data', 'journal-entries.json');
  if (!fs.existsSync(entriesPath)) {
    console.error('Erreur : data/journal-entries.json introuvable.');
    process.exit(1);
  }

  const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));
  const accounts = computeBalances(entries);

  console.log('Generation des etats financiers...\n');

  fs.mkdirSync(outputDir, { recursive: true });

  // Compte de Resultat
  const plResult = generatePL(accounts, company, pcgNames);
  fs.writeFileSync(path.join(outputDir, 'compte-de-resultat.md'), plResult.md);
  console.log('  Compte de Resultat -> output/compte-de-resultat.md');

  // Bilan
  const bilanResult = generateBilan(accounts, company, pcgNames, plResult);
  fs.writeFileSync(path.join(outputDir, 'bilan.md'), bilanResult.md);
  console.log('  Bilan -> output/bilan.md');

  // Balance
  const balanceMd = generateBalance(accounts, company, pcgNames);
  fs.writeFileSync(path.join(outputDir, 'balance.md'), balanceMd);
  console.log('  Balance -> output/balance.md');

  // Summary
  console.log('\nResume :');
  console.log('  Produits : ' + fmt(plResult.totalProduits) + ' EUR');
  console.log('  Charges  : ' + fmt(plResult.totalCharges) + ' EUR');
  console.log('  IS       : ' + fmt(plResult.isAmount) + ' EUR');
  console.log('  Resultat : ' + fmt(plResult.resultatNet) + ' EUR');
  console.log('  Actif    : ' + fmt(bilanResult.totalActif) + ' EUR');
  console.log('  Passif   : ' + fmt(bilanResult.totalPassif) + ' EUR');

  if (Math.abs(bilanResult.ecart) > 0.01) {
    console.log('\n  ATTENTION : bilan desequilibre de ' + fmt(bilanResult.ecart) + ' EUR');
  }
}

main();
