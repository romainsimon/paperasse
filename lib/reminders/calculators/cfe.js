function calcCfe(company) {
  const env = process.env.CFE_ANNUAL_OVERRIDE_EUR;
  const fromCompany = company.reminders?.cfe_annual_eur;
  const value = env !== undefined && env !== '' ? Number(env) : fromCompany;

  if (value != null && !Number.isNaN(value)) {
    return {
      amount_eur: value,
      amount_status: 'confirmed',
      justification: [
        `Montant CFE : ${value.toLocaleString('fr-FR')} €`,
        env ? 'Source : .env CFE_ANNUAL_OVERRIDE_EUR' : 'Source : company.json → reminders.cfe_annual_eur',
        'Issu de l’avis d’imposition CFE — mettre à jour chaque année',
      ],
    };
  }

  return {
    amount_eur: null,
    amount_status: 'unknown',
    justification: [
      'Montant non calculable automatiquement (dépend de la commune et de la valeur locative)',
      'Après réception de l’avis : CFE_ANNUAL_OVERRIDE_EUR=... dans .env ou reminders.cfe_annual_eur dans company.json',
      'Échéance : 15 décembre (2e échéance en janvier si > 3 000 €)',
    ],
  };
}

module.exports = { calcCfe };
