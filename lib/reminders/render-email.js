function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatAmount(event) {
  if (event.amount_eur == null) {
    return 'Montant : à déterminer';
  }
  const badge = event.amount_status === 'confirmed' ? 'confirmé' : 'estimé';
  return `Montant (${badge}) : ${event.amount_eur.toLocaleString('fr-FR')} €`;
}

function renderText(company, event) {
  const lines = [
    `${company.name} — ${event.title}`,
    `Échéance : ${event.due_date} (rappel J-15 : ${event.remind_on})`,
    event.form ? `Formulaire : ${event.form}` : '',
    '',
    formatAmount(event),
    '',
    'Justification du calcul :',
    ...(event.justification || []).map((j, i) => `  ${i + 1}. ${j}`),
    '',
    'Actions :',
    ...(event.actions || []).map((a) => `  - ${a}`),
    '',
    '— Rappel automatique Paperasse. Vérifier avec votre expert-comptable.',
  ];
  return lines.filter(Boolean).join('\n');
}

function renderHtml(company, event) {
  const just = (event.justification || [])
    .map((j) => `<li>${escapeHtml(j)}</li>`)
    .join('');
  const actions = (event.actions || [])
    .map((a) => `<li>${escapeHtml(a)}</li>`)
    .join('');
  const amount =
    event.amount_eur != null
      ? `<p><strong>${escapeHtml(formatAmount(event))}</strong></p>`
      : '<p><strong>Montant : à déterminer</strong></p>';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><title>${escapeHtml(event.title)}</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:16px;color:#111">
  <h1 style="font-size:1.25rem">${escapeHtml(company.name)}</h1>
  <h2 style="font-size:1.1rem;color:#333">${escapeHtml(event.title)}</h2>
  <p>Échéance : <strong>${escapeHtml(event.due_date)}</strong> — rappel envoyé le ${escapeHtml(event.remind_on)} (J-15)</p>
  ${event.form ? `<p>Formulaire : ${escapeHtml(event.form)}</p>` : ''}
  ${amount}
  <h3>Justification</h3>
  <ol>${just}</ol>
  <h3>À faire</h3>
  <ul>${actions}</ul>
  <p style="font-size:0.85rem;color:#666;margin-top:24px">Rappel automatique Paperasse — ne remplace pas un conseil fiscal.</p>
</body>
</html>`;
}

function buildSubject(company, event) {
  const amt =
    event.amount_eur != null ? ` — ${event.amount_eur.toLocaleString('fr-FR')} €` : '';
  return `[${company.name}] J-15 — ${event.title}${amt} — ${event.due_date}`;
}

module.exports = { renderHtml, renderText, buildSubject };
