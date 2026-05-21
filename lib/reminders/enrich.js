const { calcAcompte, calcSolde } = require('./calculators/is');
const { calcTva } = require('./calculators/tva');
const { calcCfe } = require('./calculators/cfe');
const { calcGreffe } = require('./calculators/greffe');

const DEFAULT_ACTIONS = {
  payment: ['Vérifier le montant sur impots.gouv.fr ou via votre expert-comptable', 'Télépayer avant l’échéance'],
  declaration: ['Préparer les pièces via Dougs / logiciel comptable', 'Télédéclarer avant l’échéance'],
  legal: ['Rédiger le PV / décision de l’associé unique', 'Archiver avec les comptes annuels'],
  personal: ['Déclarer sur impots.gouv.fr (espace particulier)', 'Vérifier les cases pré-remplies'],
};

function enrichInstance(instance, obligation, company) {
  const event = { ...instance, actions: [...(DEFAULT_ACTIONS[obligation.type] || ['Traiter avant l’échéance'])] };

  const calc = obligation.calculator;
  if (calc === 'tva') {
    Object.assign(event, calcTva(instance.due_date));
    event.actions.unshift(`Période TVA : ${event.period || 'voir justification'}`);
    event.actions.push('npm run journal:qonto si le journal est incomplet');
  } else if (calc === 'is_acompte') {
    Object.assign(event, calcAcompte(company, obligation.acompte_index));
    event.actions.push('Formulaire 2571 — impots.gouv.fr');
  } else if (calc === 'is_solde') {
    Object.assign(event, calcSolde(company, instance.due_date));
    event.actions.push('Formulaire 2572 — impots.gouv.fr');
  } else if (calc === 'cfe') {
    Object.assign(event, calcCfe(company));
  } else if (calc === 'greffe') {
    Object.assign(event, calcGreffe(company));
    event.actions.push('https://www.infogreffe.fr');
  } else if (obligation.id === 'DAS2') {
    event.justification = [
      'Déclarer les honoraires versés > 1 200 € par bénéficiaire (consultants, avocats, etc.)',
      'Contrôler les comptes 604, 622 et tiers 401',
    ];
    event.amount_eur = null;
    event.amount_status = 'n/a';
  } else if (obligation.id === 'LIASSE_IS') {
    event.justification = [
      'Liasse 2065 + annexes 2033 ou 2050 selon seuils',
      'FEC à tenir à disposition (npm run fec)',
      '2e jour ouvré après le 1er mai pour clôture au 31/12',
    ];
    event.amount_eur = null;
    event.amount_status = 'n/a';
  } else if (obligation.id === 'AG_APPROBATION') {
    event.justification = [
      `Délai légal : 6 mois après clôture (${company.fiscal_year?.end || '31/12'})`,
      'Approbation des comptes, affectation du résultat, quitus président',
    ];
    event.amount_eur = null;
    event.amount_status = 'n/a';
  } else if (obligation.id === 'IR_PERSO') {
    event.justification = [
      'Déclaration 2042 — revenus 2025 à déclarer au printemps 2026',
      'Dividendes : PFU par défaut ou option barème globale',
    ];
    event.amount_eur = null;
    event.amount_status = 'n/a';
  }

  return event;
}

module.exports = { enrichInstance };
