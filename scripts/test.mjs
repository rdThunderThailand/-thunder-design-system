#!/usr/bin/env node
/* Repo checks run by CI (and `npm test`). No dependencies beyond Node. */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = join(ROOT, 'skills/media-workspace-ui');
let failed = 0;
const ok = (m) => console.log('✓ ' + m);
const fail = (m) => { console.error('✗ ' + m); failed++; };

// 1. Derived files are in sync with tokens.json
const r = spawnSync(process.execPath, [join(ROOT, 'scripts/build.mjs'), '--check'], { encoding: 'utf8' });
r.status === 0 ? ok('derived files match tokens.json') : fail(r.stderr.trim());

// 2. SKILL.md frontmatter follows the Agent Skills spec
const md = readFileSync(join(SKILL, 'SKILL.md'), 'utf8');
const fm = md.match(/^---\n([\s\S]*?)\n---/);
const name = fm && fm[1].match(/^name:\s*(.+)$/m)?.[1].trim();
const desc = fm && fm[1].match(/^description:\s*(.+)$/m)?.[1].trim();
if (!fm) fail('SKILL.md has no frontmatter');
else if (name !== 'media-workspace-ui') fail(`SKILL.md name "${name}" must match folder "media-workspace-ui"`);
else if (!desc || desc.length > 1024) fail('SKILL.md description missing or over 1024 chars');
else ok('SKILL.md frontmatter valid');

// 3. Every file the skill references exists
const refs = [...md.matchAll(/`((?:references|assets)\/[^`*]+?)`/g)].map((m) => m[1]);
const missing = refs.filter((p) => !existsSync(join(SKILL, p)));
missing.length ? fail('SKILL.md references missing files: ' + missing.join(', ')) : ok(`SKILL.md references resolve (${refs.length})`);

// 4. No color in theme outputs that is not a token
const tokens = JSON.parse(readFileSync(join(SKILL, 'tokens.json'), 'utf8'));
const allowed = new Set(JSON.stringify(tokens).match(/#[0-9A-Fa-f]{6}\b/g).map((h) => h.toUpperCase()));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const themeFiles = [...walk(join(ROOT, 'packages/mw-theme/src')), ...walk(join(SKILL, 'assets/code'))].filter((p) => /\.(ts|tsx|css|cjs|js)$/.test(p));
const stray = themeFiles.flatMap((p) => (readFileSync(p, 'utf8').match(/#[0-9A-Fa-f]{6}\b/g) || []).filter((h) => !allowed.has(h.toUpperCase())).map((h) => `${relative(ROOT, p)} ${h}`));
stray.length ? fail('colors not in tokens.json:\n  ' + stray.join('\n  ')) : ok(`all colors come from tokens.json (${themeFiles.length} files)`);

// 5. Brand SVGs are well-formed enough to render
for (const f of readdirSync(join(SKILL, 'assets/brand'))) {
  const s = readFileSync(join(SKILL, 'assets/brand', f), 'utf8');
  if (!/^<svg[\s\S]*<\/svg>\s*$/.test(s) || !/viewBox="/.test(s)) fail(`brand/${f} is not a complete SVG`);
}
ok('brand SVGs present');

if (failed) { console.error(`\n${failed} check(s) failed`); process.exit(1); }
console.log('\nAll checks passed');
