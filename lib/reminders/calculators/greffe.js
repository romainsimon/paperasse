const DEFAULT_GREFFE_EUR = 45;
const CONFIDENTIALITE_EUR = 10;

function calcGreffe(company) {
  const base = Number(process.env.GREFFE_FEE_EUR) || company.reminders?.greffe_fee_eur || DEFAULT_GREFFE_EUR;
  const conf = company.reminders?.depot_confidentialite ? CONFIDENTIALITE_EUR : 0;
  const total = base + conf;

  return {
    amount_eur: total,
    amount_status: 'estimated',
    justification: [
      `Dépôt comptes annuels Infogreffe : ~${base.toLocaleString('fr-FR')} €`,
      conf ? `Déclaration de confidentialité : +${conf.toLocaleString('fr-FR')} €` : 'Pas de déclaration de confidentialité configurée',
      `Total estimé : ${total.toLocaleString('fr-FR')} €`,
      'Délai : 1 mois après approbation des comptes (30 jours après AG)',
    ],
  };
}

module.exports = { calcGreffe };
