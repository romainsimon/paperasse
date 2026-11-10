#!/usr/bin/env node
// Fails if a SKILL.md `description` is longer than 1024 characters.
// The Claude app refuses longer descriptions when it syncs the marketplace
// (issue #128), while `claude plugin validate` and the CLI do not check it.
// No dependency: reads the YAML front matter for `description: |` (literal
// block, clip chomping) or a single-line `description:` value.

const fs = require('fs');
const path = require('path');

const MAX = 1024;
const root = path.join(__dirname, '..');

function readDescription(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error('no YAML front matter');
  const lines = m[1].split('\n');
  const start = lines.findIndex((l) => /^description:/.test(l));
  if (start === -1) throw new Error('no description field');
  const head = lines[start].replace(/^description:\s*/, '');

  if (head === '|' || head === '|-') {
    const block = [];
    for (let i = start + 1; i < lines.length; i++) {
      const l = lines[i];
      if (l.trim() !== '' && !/^\s/.test(l)) break; // next top-level key
      block.push(l);
    }
    while (block.length && block[block.length - 1].trim() === '') block.pop();
    const indent = Math.min(...block.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
    const body = block.map((l) => l.slice(indent)).join('\n');
    return head === '|' ? body + '\n' : body; // clip keeps one final newline
  }
  if (head && !/^[>|]/.test(head)) return head.replace(/^(['"])(.*)\1$/, '$2');
  throw new Error(`unsupported description style "${head}"`);
}

const skills = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, d.name, 'SKILL.md')))
  .map((d) => d.name)
  .sort();

let failed = 0;
for (const skill of skills) {
  const file = path.join(root, skill, 'SKILL.md');
  try {
    const length = [...readDescription(file)].length;
    const ok = length <= MAX;
    if (!ok) failed++;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${skill.padEnd(26)} ${length} / ${MAX}`);
  } catch (err) {
    failed++;
    console.log(`FAIL ${skill.padEnd(26)} ${err.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} SKILL.md description(s) over ${MAX} characters or unreadable.`);
  process.exit(1);
}
console.log('\nAll SKILL.md descriptions fit the 1024-character limit.');
