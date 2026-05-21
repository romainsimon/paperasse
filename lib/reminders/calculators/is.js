const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('../../../integrations/core/load-env');

const ACOMPTE_RATE = 0.25;
const ACOMPTE_DISPENSE_IS_N1 = 3000;
const PME_CAP_15 = 42500;
const RATE_REDUCED = 0.15;
const RATE_NORMAL = 0.25;

function roundEur(n) {
  return Math.round(n);
}

/** YYYY-MM-DD → JJ/MM pour libellés d'échéance */
function formatDueDayMonth(dueDate) {
  if (!dueDate || dueDate.length < 10) {
    return "l'échéance";
  }
  const [, month, day] = dueDate.split('-');
  return `${day}/${month}`;
}

function estimateIsFromResult(resultEur) {
  if (resultEur <= 0) {
    return 0;
  }
  const reducedBase = Math.min(resultEur, PME_CAP_15);
  const excess = Math.max(0, resultEur - PME_CAP_15);
  return roundEur(reducedBase * RATE_REDUCED + excess * RATE_NORMAL);
}

function getIsN1(company) {
  const env = process.env.IS_N1_EUR;
  if (env !== undefined && env !== '') {
    return { value: Number(env), source: 'variable .env IS_N1_EUR' };
  }
  if (company.reminders?.is_n1_eur != null) {
    return { value: Number(company.reminders.is_n1_eur), source: 'company.json → reminders.is_n1_eur' };
  }
  const bilanCandidates = [
    path.join(PROJECT_ROOT, 'data', 'bilan-closing.json'),
    path.join(PROJECT_ROOT, 'data', 'examples', 'bilan-closing.sample.json'),
  ];
  const bilanPath = bilanCandidates.find((p) => fs.existsSync(p));
  if (bilanPath) {
    const bilan = JSON.parse(fs.readFileSync(bilanPath, 'utf-8'));
    const resultLine = bilan.accounts?.find((a) => a.account === '129');
    if (resultLine?.credit) {
      const result = resultLine.credit;
      const est = estimateIsFromResult(result);
      return {
        value: est,
        source: `bilan ${bilan.as_of} → résultat ${result.toLocaleString('fr-FR')} € × barème PME 15 %/25 %`,
        result,
      };
    }
  }
  const ob = company.opening_balances || {};
  const result = ob.result_pending ?? ob.result_2025_pending;
  if (result != null) {
    const est = estimateIsFromResult(result);
    return {
      value: est,
      source: `company.opening_balances (résultat N-1) = ${result.toLocaleString('fr-FR')} €`,
      result,
    };
  }
  return { value: null, source: null };
}

function calcAcompte(company, acompteIndex) {
  const isN1 = getIsN1(company);
  if (isN1.value == null) {
    return {
      amount_eur: null,
      amount_status: 'unknown',
      justification: [
        'IS N-1 inconnu : renseigner IS_N1_EUR dans .env ou reminders.is_n1_eur dans company.json',
        `Acompte n°${acompteIndex} = 25 % × IS N-1 (CGI art. 1668)`,
      ],
    };
  }
  if (isN1.value < ACOMPTE_DISPENSE_IS_N1) {
    return {
      amount_eur: 0,
      amount_status: 'confirmed',
      justification: [
        `IS N-1 = ${isN1.value.toLocaleString('fr-FR')} € (${isN1.source})`,
        `Dispense d'acomptes : IS N-1 < ${ACOMPTE_DISPENSE_IS_N1.toLocaleString('fr-FR')} €`,
      ],
    };
  }
  const amount = roundEur(isN1.value * ACOMPTE_RATE);
  return {
    amount_eur: amount,
    amount_status: 'estimated',
    justification: [
      `IS exercice N-1 estimé : ${isN1.value.toLocaleString('fr-FR')} € — ${isN1.source}`,
      `Acompte trimestriel n°${acompteIndex} = 25 % × ${isN1.value.toLocaleString('fr-FR')} = ${amount.toLocaleString('fr-FR')} €`,
      'À ajuster si le solde IS réel (liasse) diffère de l’estimation',
    ],
  };
}

function calcSolde(company, dueDate) {
  const isN1 = getIsN1(company);
  if (isN1.value == null) {
    return {
      amount_eur: null,
      amount_status: 'unknown',
      justification: ['IS N-1 inconnu — voir acomptes IS'],
    };
  }
  const acomptes = roundEur(isN1.value * ACOMPTE_RATE) * 4;
  const solde = Math.max(0, roundEur(isN1.value) - acomptes);
  const paid444 = company.opening_balances?.is_acomptes_paid_n1;
  const dueLabel = formatDueDayMonth(dueDate);
  const lines = [
    `IS N-1 estimé : ${isN1.value.toLocaleString('fr-FR')} €`,
    `4 acomptes théoriques : 4 × ${roundEur(isN1.value * ACOMPTE_RATE).toLocaleString('fr-FR')} = ${acomptes.toLocaleString('fr-FR')} €`,
    `Solde au ${dueLabel} (${dueDate || 'échéance'}) = IS N-1 − acomptes versés = ${solde.toLocaleString('fr-FR')} €`,
  ];
  if (paid444 != null) {
    lines.push(`Acomptes déjà comptabilisés (info company) : ${paid444.toLocaleString('fr-FR')} €`);
  }
  return {
    amount_eur: solde,
    amount_status: solde === 0 ? 'estimated' : 'estimated',
    justification: lines,
  };
}

module.exports = { calcAcompte, calcSolde, getIsN1, estimateIsFromResult };
