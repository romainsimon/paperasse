#!/usr/bin/env node
/**
 * Pipeline Qonto complet : fetch API → catégorisation PCG → journal BQ.
 *
 * Usage:
 *   npm run journal:qonto
 *   npm run journal:qonto -- --start 2026-01-01 --end 2026-04-30
 *   npm run journal:qonto -- --dry-run
 *
 * Suite recommandée : npm run journal:an  puis  npm run fec / reminders:preview
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { loadEnv, PROJECT_ROOT } = require('../integrations/core/load-env');
const { loadCompany } = require('../integrations/core/provider');

loadEnv();

function parseArgs(argv) {
  const opts = { dryRun: false, passthrough: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--dry-run') {
      opts.dryRun = true;
    } else if ((a === '--start' || a === '--end') && argv[i + 1]) {
      opts.passthrough.push(a, argv[++i]);
    }
  }
  return opts;
}

function journalStatus() {
  const journalPath = path.join(PROJECT_ROOT, 'data', 'journal-entries.json');
  if (!fs.existsSync(journalPath)) {
    return { exists: false, entries: 0, tvaLines: 0, bqOnly: 0 };
  }
  const entries = JSON.parse(fs.readFileSync(journalPath, 'utf-8'));
  let tvaLines = 0;
  let bqOnly = 0;
  for (const entry of entries) {
    if (entry.journal === 'BQ') {
      bqOnly += 1;
    }
    for (const line of entry.lines || []) {
      const acc = String(line.account || '');
      if (
        acc.startsWith('44571') ||
        acc.startsWith('44566') ||
        acc.startsWith('44562') ||
        acc === '4457' ||
        acc === '4456'
      ) {
        tvaLines += 1;
      }
    }
  }
  return { exists: true, entries: entries.length, tvaLines, bqOnly };
}

function runNode(scriptRel, extraArgs = []) {
  const script = path.join(PROJECT_ROOT, scriptRel);
  const result = spawnSync(process.execPath, [script, ...extraArgs], {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
    env: process.env,
  });
  return result.status ?? 1;
}

function main() {
  const company = loadCompany();
  if (!company) {
    console.error('Erreur : company.json introuvable.');
    process.exit(1);
  }
  if (company.qonto?.enabled === false) {
    console.error('Qonto désactivé dans company.json.');
    process.exit(1);
  }
  if (!process.env.QONTO_ID || !process.env.QONTO_API_SECRET) {
    console.error('Variables QONTO_ID / QONTO_API_SECRET manquantes (.env).');
    process.exit(1);
  }

  const opts = parseArgs(process.argv.slice(2));
  const bilanOk =
    fs.existsSync(path.join(PROJECT_ROOT, 'data', 'bilan-closing.json')) ||
    fs
      .readdirSync(path.join(PROJECT_ROOT, 'data'))
      .some((f) => /^bilan-closing-\d{4}\.json$/.test(f));

  console.log(`Pipeline journal Qonto — ${company.name || 'société'}\n`);

  console.log('1/2 Synchronisation Qonto → data/transactions/\n');
  if (runNode('integrations/qonto/fetch.js', opts.passthrough) !== 0) {
    process.exit(1);
  }

  const journalArgs = opts.dryRun ? ['--dry-run'] : [];
  console.log('\n2/2 Catégorisation PCG → data/journal-entries.json\n');
  if (runNode('scripts/qonto-to-journal.js', journalArgs) !== 0) {
    process.exit(1);
  }

  const journal = journalStatus();
  console.log('\n--- État ---');
  if (journal.exists) {
    console.log(
      `Journal : ${journal.entries} écriture(s) (${journal.bqOnly} BQ), ${journal.tvaLines} ligne(s) TVA`,
    );
  }
  console.log(`Bilan Dougs : ${bilanOk ? 'présent (data/bilan-closing*.json)' : 'absent'}`);

  console.log('\n--- Suite ---');
  console.log('  npm run journal:an     # à-nouveaux bilan + affectation AG + fusion BQ');
  console.log('  npm run fec            # FEC');
  console.log('  npm run reminders:preview');
  if (!bilanOk) {
    console.log('\nPlacez le bilan de clôture dans data/bilan-closing.json pour les à-nouveaux complets.');
  }
  if (journal.tvaLines === 0 && !opts.dryRun) {
    console.log('Aucune ligne TVA détectée — vérifier config/qonto-label-rules.local.json ou TVA_OVERRIDE_EUR.');
  }
}

main();
