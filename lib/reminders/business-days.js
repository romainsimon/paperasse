/**
 * Jours ouvrés France métropole (jours fériés fixes + Pâques).
 */

const EASTER_MONDAY = {
  2025: '2025-04-21',
  2026: '2026-04-06',
  2027: '2027-03-29',
};

const FIXED_HOLIDAYS = ['-01-01', '-05-01', '-05-08', '-07-14', '-08-15', '-11-01', '-11-11', '-12-25'];

function toDateStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isHoliday(dateStr) {
  const y = dateStr.slice(0, 4);
  if (FIXED_HOLIDAYS.some((s) => dateStr.endsWith(s))) {
    return true;
  }
  const easterMonday = EASTER_MONDAY[Number(y)];
  if (easterMonday === dateStr) {
    return true;
  }
  const ascension = addDays(easterMonday, 39);
  const pentecote = addDays(easterMonday, 50);
  return dateStr === ascension || dateStr === pentecote;
}

function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + n);
  return toDateStr(d);
}

function isWeekend(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  const w = d.getDay();
  return w === 0 || w === 6;
}

function isBusinessDay(dateStr) {
  return !isWeekend(dateStr) && !isHoliday(dateStr);
}

function nthBusinessDayAfter(anchorDateStr, n) {
  let count = 0;
  let cur = anchorDateStr;
  while (count < n) {
    cur = addDays(cur, 1);
    if (isBusinessDay(cur)) {
      count += 1;
    }
  }
  return cur;
}

function secondBusinessDayAfterMayFirst(year) {
  const anchor = `${year}-05-01`;
  return nthBusinessDayAfter(anchor, 2);
}

module.exports = {
  isBusinessDay,
  nthBusinessDayAfter,
  secondBusinessDayAfterMayFirst,
  addDays,
  toDateStr,
};
