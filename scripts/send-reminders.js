#!/usr/bin/env node
/**
 * Rappels fiscaux J-15 par e-mail (Resend).
 *
 * Usage:
 *   node scripts/send-reminders.js
 *   node scripts/send-reminders.js --dry-run
 *   node scripts/send-reminders.js --date 2026-02-28
 *   node scripts/send-reminders.js --force-id IS_ACOMPTE_1_20260315
 *   node scripts/send-reminders.js --stdout
 */

const { runReminders, parisToday } = require('../lib/reminders');

function parseArgs(argv) {
  const opts = { dryRun: false, stdout: false, forceId: null, date: parisToday() };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--dry-run') {
      opts.dryRun = true;
    } else if (a === '--stdout') {
      opts.stdout = true;
    } else if (a === '--date' && argv[i + 1]) {
      opts.date = argv[++i];
    } else if (a === '--force-id' && argv[i + 1]) {
      opts.forceId = argv[++i];
    }
  }
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const results = await runReminders(opts);
  if (results.errors.length) {
    process.exitCode = 1;
  }
  console.log(
    JSON.stringify({
      date: results.date,
      sent: results.sent.length,
      skipped: results.skipped.length,
      errors: results.errors.length,
    }),
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
