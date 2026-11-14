#!/usr/bin/env node
// Keeps the copies inside skill folders identical to their source at the repo root.
//
// Why: the Claude plugin directory refuses symbolic links inside skill folders
// (ARCHIVE_SYMLINK_EXEC_SURFACE), so each skill ships real files. The repo root
// stays the single source: edit `data/`, `scripts/`, `integrations/`,
// `templates/`, `company.example.json` and `fiscaliste/data/*.json`, then run
// `npm run sync:skills`. `npm run test:skills` fails if a copy has drifted.
//
//   node scripts/sync-skill-copies.js           check, exit 1 on any difference
//   node scripts/sync-skill-copies.js --write   rewrite the copies
//
// Only files tracked by git are copied, so local data (transactions, invoices,
// company.json) never ends up in a skill folder.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const WRITE = process.argv.includes('--write');

// Whole folders mirrored into a skill folder: [source, destination]
const MIRRORS = [
  ['data', 'comptable/data'],
  ['data', 'commissaire-aux-comptes/data'],
  ['data', 'controleur-fiscal/data'],
  ['scripts', 'comptable/scripts'],
  ['integrations', 'comptable/integrations'],
  ['templates', 'comptable/templates'],
];
// Never copied by a mirror (repo tooling, not skill content)
const MIRROR_SKIP = new Set(['scripts/sync-skill-copies.js', 'scripts/test-syndic-plan.js']);

// Single files: [source, destination]
const FILES = [
  ['company.example.json', 'comptable/company.example.json'],
  ['company.example.json', 'commissaire-aux-comptes/company.example.json'],
  ['company.example.json', 'controleur-fiscal/company.example.json'],
  ['scripts/fetch_notaire_data.py', 'notaire/scripts/fetch_notaire_data.py'],
  ['scripts/test_fetch_notaire_data.py', 'notaire/scripts/test_fetch_notaire_data.py'],
  // The 2025 vintage of the fiscaliste data is the root of fiscaliste/data
  ...[
    ['bareme-ir-2025.json', 'bareme-ir.json'],
    ['equity-salarial.json'],
    ['ifi-bareme.json'],
    ['niches-fiscales.json'],
    ['pea-assurance-vie.json'],
    ['per-plafonds.json'],
    ['pfu-prelevements-sociaux.json'],
    ['plus-values-immo-abattements.json'],
    ['plus-values-mobilieres-crypto.json'],
    ['regimes-fonciers-lmnp.json'],
  ].map(([src, dst]) => [`fiscaliste/data/${src}`, `fiscaliste/data/revenus-2025/${dst || src}`]),
];

function tracked(dir) {
  const out = execFileSync('git', ['ls-files', '-z', '--', dir], { cwd: ROOT, encoding: 'utf8' });
  return out.split('\0').filter(Boolean);
}

// Build the expected destination -> source map
const expected = new Map();
for (const [src, dst] of MIRRORS) {
  for (const file of tracked(src)) {
    if (MIRROR_SKIP.has(file)) continue;
    expected.set(path.join(dst, path.relative(src, file)), file);
  }
}
for (const [src, dst] of FILES) expected.set(dst, src);

const problems = [];
let written = 0;

function read(rel) {
  return fs.readFileSync(fs.realpathSync(path.join(ROOT, rel)));
}

// A destination folder (or file) must not be a symbolic link
for (const dst of new Set([...MIRRORS.map(([, d]) => d), ...FILES.map(([, d]) => d)])) {
  const abs = path.join(ROOT, dst);
  let st;
  try { st = fs.lstatSync(abs); } catch { continue; }
  if (st.isSymbolicLink()) {
    if (WRITE) fs.unlinkSync(abs);
    else problems.push(`${dst} is a symbolic link`);
  }
}

for (const [dst, src] of expected) {
  const abs = path.join(ROOT, dst);
  const want = read(src);
  let have = null;
  try { if (!fs.lstatSync(abs).isSymbolicLink()) have = fs.readFileSync(abs); } catch { /* missing */ }
  if (have && have.equals(want)) continue;
  if (WRITE) {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    try { fs.unlinkSync(abs); } catch { /* missing */ }
    fs.writeFileSync(abs, want);
    fs.chmodSync(abs, fs.statSync(fs.realpathSync(path.join(ROOT, src))).mode & 0o777);
    written++;
  } else {
    problems.push(`${dst} ${have ? 'differs from' : 'is missing, copy of'} ${src}`);
  }
}

// Tracked files inside a mirrored folder that no longer exist at the source
for (const [, dst] of MIRRORS) {
  for (const file of tracked(dst)) {
    if (expected.has(file)) continue;
    let st;
    try { st = fs.lstatSync(path.join(ROOT, file)); } catch { continue; }
    if (!st.isFile()) continue; // the folder itself used to be a link: handled above
    if (WRITE) { fs.unlinkSync(path.join(ROOT, file)); written++; }
    else problems.push(`${file} has no source any more`);
  }
}

if (WRITE) {
  console.log(`${written} file(s) written. ${expected.size} copies in skill folders.`);
} else if (problems.length) {
  console.error(problems.map((p) => `FAIL ${p}`).join('\n'));
  console.error(`\n${problems.length} skill copy problem(s). Run: npm run sync:skills`);
  process.exit(1);
} else {
  console.log(`All ${expected.size} skill copies match their source.`);
}
