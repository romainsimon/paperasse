const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('../../../integrations/core/load-env');

function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}

function loadJournal() {
  const p = path.join(PROJECT_ROOT, 'data', 'journal-entries.json');
  if (!fs.existsSync(p)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function tvaForPeriod(entries, periodYm) {
  let collected = 0;
  let deductible = 0;

  for (const entry of entries) {
    if (!entry.date || monthKey(entry.date) !== periodYm) {
      continue;
    }
    for (const line of entry.lines || []) {
      const acc = String(line.account || '');
      const debit = Number(line.debit) || 0;
      const credit = Number(line.credit) || 0;
      if (acc.startsWith('44571') || acc === '4457') {
        collected += credit - debit;
      }
      if (acc.startsWith('44566') || acc.startsWith('44562') || acc === '4456') {
        deductible += debit - credit;
      }
    }
  }

  const net = Math.round((collected - deductible) * 100) / 100;
  return { collected, deductible, net };
}

/**
 * @param {string} dueDate YYYY-MM-DD (échéance CA3, ex. 2026-02-25)
 */
function calcTva(dueDate) {
  const d = new Date(`${dueDate}T12:00:00`);
  d.setMonth(d.getMonth() - 1);
  const periodYm = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

  const override = process.env.TVA_OVERRIDE_EUR;
  if (override !== undefined && override !== '') {
    return {
      amount_eur: Number(override),
      amount_status: 'confirmed',
      period: periodYm,
      justification: [
        `Période TVA : ${periodYm}`,
        `Montant forcé via .env TVA_OVERRIDE_EUR = ${override} €`,
      ],
    };
  }

  const journal = loadJournal();
  if (!journal?.length) {
    return {
      amount_eur: null,
      amount_status: 'unknown',
      period: periodYm,
      justification: [
        `Période TVA : ${periodYm} (mois précédant l'échéance du ${dueDate})`,
        'Journal introuvable : lancer npm run journal:qonto puis npm run fec',
        'TVA due ≈ max(0, TVA collectée 44571 − TVA déductible 44566/44562)',
      ],
    };
  }

  const { collected, deductible, net } = tvaForPeriod(journal, periodYm);
  const due = Math.max(0, Math.round(net));

  return {
    amount_eur: due,
    amount_status: 'estimated',
    period: periodYm,
    justification: [
      `Période : ${periodYm}`,
      `TVA collectée (comptes 44571*) : ${collected.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`,
      `TVA déductible (comptes 44566*, 44562*) : ${deductible.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`,
      `Solde = ${net.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € → à payer : ${due.toLocaleString('fr-FR')} €`,
      'Crédit de TVA (44567) non imputé automatiquement — vérifier sur CA3',
    ],
    raw: { collected, deductible, net },
  };
}

module.exports = { calcTva, tvaForPeriod };
