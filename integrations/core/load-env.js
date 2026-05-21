const fs = require('fs');
const path = require('path');

/** Racine du dépôt Paperasse (parent de integrations/). */
const PROJECT_ROOT = path.join(__dirname, '..', '..');

let loaded = false;

/**
 * Charge .env à la racine du projet (sans écraser les variables déjà définies).
 */
function loadEnv() {
  if (loaded) {
    return;
  }
  loaded = true;

  const envPath = path.join(PROJECT_ROOT, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

module.exports = { loadEnv, PROJECT_ROOT };
