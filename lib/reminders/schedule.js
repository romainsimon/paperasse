const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('../../integrations/core/load-env');
const { secondBusinessDayAfterMayFirst, addDays, toDateStr } = require('./business-days');

const CONFIG_PATH = path.join(PROJECT_ROOT, 'config', 'reminders.json');

function loadRemindersConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function matchProfile(company, profile) {
  const m = profile.match || {};
  if (m['legal_form'] && !m['legal_form'].includes(company.legal_form)) {
    return false;
  }
  if (m['tax.regime_is'] && !m['tax.regime_is'].includes(company.tax?.regime_is)) {
    return false;
  }
  if (m['tax.regime_tva'] && !m['tax.regime_tva'].includes(company.tax?.regime_tva)) {
    return false;
  }
  return true;
}

function getProfile(company) {
  const config = loadRemindersConfig();
  for (const [key, profile] of Object.entries(config.profiles)) {
    if (matchProfile(company, profile)) {
      return { key, profile, config };
    }
  }
  return null;
}

function parseFiscalEnd(company) {
  const end = company.fiscal_year?.end || '2025-12-31';
  return end;
}

function agDateForYear(company, year) {
  const aff = company.fiscal_affectation;
  if (aff?.ag_date && aff?.ag_year === year) {
    return aff.ag_date;
  }
  const end = parseFiscalEnd(company);
  const [, m, d] = end.split('-').map(Number);
  const ag = new Date(year, m - 1, d);
  ag.setMonth(ag.getMonth() + 6);
  return toDateStr(ag);
}

function dueYearly(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function subtractDays(dateStr, days) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() - days);
  return toDateStr(d);
}

function buildInstance(obligation, dueDate, year, extra = {}) {
  const lead = Number(process.env.REMINDER_LEAD_DAYS) || 15;
  const remindOn = subtractDays(dueDate, lead);
  const instanceId = `${obligation.id}_${dueDate.replace(/-/g, '')}`;

  return {
    id: instanceId,
    obligation_id: obligation.id,
    title: obligation.title,
    type: obligation.type,
    form: obligation.form,
    due_date: dueDate,
    remind_on: remindOn,
    year,
    ...extra,
  };
}

function generateForYear(company, profile, year) {
  const instances = [];
  const fiscalEnd = parseFiscalEnd(company);
  const [, , fiscalEndDay] = fiscalEnd.split('-').map(Number);
  const agDate = agDateForYear(company, year);

  for (const ob of profile.obligations) {
    if (ob.schedule === 'monthly_day') {
      for (let month = 1; month <= 12; month += 1) {
        const due = dueYearly(year, month, ob.day);
        instances.push(buildInstance(ob, due, year, { period_month: month }));
      }
      if (ob.day <= 15) {
        const dueJanNext = dueYearly(year + 1, 1, ob.day);
        instances.push(buildInstance(ob, dueJanNext, year + 1, { period_month: 12, period_year: year }));
      }
    } else if (ob.schedule === 'yearly') {
      const due = dueYearly(year, ob.month, ob.day);
      instances.push(buildInstance(ob, due, year));
    } else if (ob.schedule === 'second_business_day_after') {
      const due = secondBusinessDayAfterMayFirst(year);
      instances.push(buildInstance(ob, due, year));
    } else if (ob.schedule === 'months_after_fiscal_end') {
      const endYear = year - 1;
      const end = `${endYear}-${fiscalEnd.slice(5)}`;
      const d = new Date(`${end}T12:00:00`);
      d.setMonth(d.getMonth() + ob.months);
      instances.push(buildInstance(ob, toDateStr(d), year, { fiscal_year_closed: endYear }));
    } else if (ob.schedule === 'days_after_ag') {
      const due = subtractDays(agDate, -ob.days);
      instances.push(buildInstance(ob, due, year, { ag_date: agDate }));
    }
  }

  return instances;
}

function generateInstances(company, windowStart, windowEnd) {
  const matched = getProfile(company);
  if (!matched) {
    return { instances: [], profile: null };
  }

  const startYear = new Date(windowStart).getFullYear();
  const endYear = new Date(windowEnd).getFullYear();
  const all = [];

  for (let y = startYear; y <= endYear + 1; y += 1) {
    all.push(...generateForYear(company, matched.profile, y));
  }

  const filtered = all.filter((i) => i.due_date >= windowStart && i.due_date <= windowEnd);
  return { instances: filtered, profile: matched.profile, config: matched.config };
}

function instancesDueReminderOn(instances, dateStr, options = {}) {
  const { catchUp = true } = options;
  return instances.filter((i) => {
    if (i.remind_on === dateStr) {
      return true;
    }
    if (catchUp && i.remind_on < dateStr && i.due_date > dateStr) {
      return true;
    }
    return false;
  });
}

module.exports = {
  loadRemindersConfig,
  getProfile,
  generateInstances,
  generateForYear,
  instancesDueReminderOn,
  subtractDays,
  agDateForYear,
};
