const { loadEnv, PROJECT_ROOT } = require('../../integrations/core/load-env');
const { loadCompany } = require('../../integrations/core/provider');
const {
  generateInstances,
  instancesDueReminderOn,
  getProfile,
  subtractDays,
} = require('./schedule');
const { enrichInstance } = require('./enrich');
const { loadState, saveState, wasSent, markSent } = require('./state');
const { sendEmail } = require('./resend');
const { renderHtml, renderText, buildSubject } = require('./render-email');

loadEnv();

function parisToday() {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: process.env.REMINDER_TIMEZONE || 'Europe/Paris',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return fmt.format(new Date());
}

async function runReminders(options = {}) {
  const {
    date = parisToday(),
    dryRun = process.env.REMINDER_DRY_RUN === 'true',
    forceId = null,
    stdout = false,
  } = options;

  const company = loadCompany();
  if (!company) {
    throw new Error('company.json introuvable à la racine du projet');
  }

  const profileMatch = getProfile(company);
  if (!profileMatch) {
    throw new Error(
      `Aucun profil reminders pour ${company.legal_form} / ${company.tax?.regime_is} / ${company.tax?.regime_tva}`,
    );
  }

  const windowStart = subtractDays(date, 30);
  const windowEnd = subtractDays(date, -400);
  const { instances } = generateInstances(company, windowStart, windowEnd);
  const obligationMap = Object.fromEntries(profileMatch.profile.obligations.map((o) => [o.id, o]));

  let due = instancesDueReminderOn(instances, date);
  if (forceId) {
    due = instances.filter((i) => i.id === forceId || i.obligation_id === forceId);
  }

  const leadDays = Number(process.env.REMINDER_LEAD_DAYS) || 15;
  const state = loadState();
  const results = { date, sent: [], skipped: [], errors: [] };

  for (const inst of due) {
    const obligation = obligationMap[inst.obligation_id];
    if (!obligation) {
      continue;
    }

    if (!forceId && wasSent(state, inst.id, leadDays)) {
      results.skipped.push({ id: inst.id, reason: 'deja_envoye' });
      continue;
    }

    const event = enrichInstance(inst, obligation, company);

    if (stdout || dryRun) {
      console.log('\n---', event.id, '---');
      console.log(renderText(company, event));
      results.sent.push({ id: event.id, dryRun: true });
      continue;
    }

    try {
      const subject = buildSubject(company, event);
      const html = renderHtml(company, event);
      const text = renderText(company, event);
      const res = await sendEmail({ subject, html, text });
      markSent(state, inst.id, leadDays, { subject, resend_id: res.id });
      results.sent.push({ id: event.id, resend_id: res.id });
      console.log(`[ok] ${event.id} → ${process.env.REMINDER_EMAIL_TO}`);
    } catch (err) {
      results.errors.push({ id: inst.id, message: err.message });
      console.error(`[err] ${inst.id}:`, err.message);
    }
  }

  if (!dryRun && !stdout) {
    saveState(state);
  } else if (dryRun && results.sent.length) {
    console.log(`\n[dry-run] ${results.sent.length} rappel(s) — aucun e-mail envoyé`);
  }

  return results;
}

module.exports = { runReminders, parisToday };
