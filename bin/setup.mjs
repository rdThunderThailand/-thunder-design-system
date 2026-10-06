#!/usr/bin/env node
/**
 * ThunderOne design system setup. Run in the root of a project:
 *
 *   npx github:rdThunderThailand/-thunder-design-system
 *
 * What it does (each step can be skipped):
 *   1. Adds/updates the design-system section in AGENTS.md (between markers, never touches the rest),
 *      including which ThunderOne Workspace this project belongs to (--workspace media|help|…)
 *   2. Makes CLAUDE.md import AGENTS.md so Claude Code reads the same rules
 *   3. Installs the thunderone-ui skill for your agents via `npx skills` (telemetry off)
 *   4. Points the @rdthunderthailand npm scope at GitHub Packages in .npmrc
 *   5. Prints how to install and wire the theme for your stack (antd or Tailwind)
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = 'rdThunderThailand/-thunder-design-system';
const SCOPE = '@rdthunderthailand';
const PKG = `${SCOPE}/thunderone-theme`;
const SKILL = 'thunderone-ui';
const OLD_SKILL = 'media-workspace-ui';
const SKILLS_CLI = 'skills@1.7.0';
const START = '<!-- thunder-design-system:start (managed by thunderone-setup, edit the design system repo instead) -->';
const END = '<!-- thunder-design-system:end -->';

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i >= 0 && args[i + 1] ? args[i + 1] : d; };

if (has('-h') || has('--help')) {
  console.log(`Usage: npx github:${REPO} [options]

Options
  --workspace <key>  ThunderOne Workspace of this project (e.g. media, help). Picks the skill's Workspace profile
  --agents <list>    Agents to install the skill for (default: claude-code,codex,antigravity)
  --stack <name>     antd | tailwind (default: detected from package.json)
  --source <src>     Where to install the skill from (default: ${REPO}; a local path works too)
  --no-skill         Skip installing the skill
  --no-agents-md     Skip AGENTS.md / CLAUDE.md
  --no-npmrc         Skip .npmrc
  --dry-run          Show what would change, write nothing
  -h, --help         Show this help`);
  process.exit(0);
}

const cwd = process.cwd();
const dry = has('--dry-run');
const agents = val('--agents', 'claude-code,codex,antigravity').split(',').map((s) => s.trim()).filter(Boolean);
const source = val('--source', REPO);
const profilesDir = join(HERE, '../skills', SKILL, 'references/workspaces');
const profiles = existsSync(profilesDir) ? readdirSync(profilesDir).filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => f.slice(0, -3)) : [];
const prev = (() => { try { return readFileSync(join(process.cwd(), 'AGENTS.md'), 'utf8').match(/^ThunderOne workspace: ([a-z0-9-]+)\s*$/m)?.[1]; } catch { return undefined; } })();
const workspace = val('--workspace', prev || '');
const log = (icon, msg) => console.log(`${icon} ${msg}`);
const write = (path, content, what) => {
  if (dry) return log('~', `would ${what} ${path.replace(cwd + '/', '')}`);
  writeFileSync(path, content);
  log('✓', `${what} ${path.replace(cwd + '/', '')}`);
};

console.log(`\nThunderOne design system setup${dry ? ' (dry run)' : ''}\n`);
if (!workspace) log('!', `no --workspace given. Available profiles: ${profiles.join(', ') || '(none)'}. The AGENTS.md section will say the Workspace is not set.`);
else if (!profiles.includes(workspace)) log('!', `no profile "${workspace}" yet (available: ${profiles.join(', ')}). Agents will use the core rules; add references/workspaces/${workspace}.md in the design system repo.`);

/* 1 + 2. AGENTS.md and CLAUDE.md */
if (!has('--no-agents-md')) {
  const snippetPath = join(HERE, '../skills', SKILL, 'AGENTS.snippet.md');
  const snippet = readFileSync(snippetPath, 'utf8').trim()
    .replace('ThunderOne workspace: {{WORKSPACE}}', `ThunderOne workspace: ${workspace || '(not set: re-run setup with --workspace <key>)'}`)
    .replaceAll('{{WORKSPACE}}', workspace || '<key>');
  const block = `${START}\n${snippet}\n${END}`;
  const agentsPath = join(cwd, 'AGENTS.md');
  if (!existsSync(agentsPath)) {
    write(agentsPath, `# Agent instructions\n\n${block}\n`, 'created');
  } else {
    const cur = readFileSync(agentsPath, 'utf8');
    const s = cur.indexOf(START.slice(0, 36)), e = cur.indexOf(END);
    const next = s >= 0 && e > s ? cur.slice(0, s) + block + cur.slice(e + END.length) : cur.replace(/\s*$/, '') + `\n\n${block}\n`;
    if (next === cur) log('·', 'AGENTS.md already up to date');
    else write(agentsPath, next, s >= 0 ? 'updated design-system section in' : 'appended design-system section to');
  }
  const claudePath = join(cwd, 'CLAUDE.md');
  if (!existsSync(claudePath)) write(claudePath, '@AGENTS.md\n', 'created');
  else if (!/^@AGENTS\.md\s*$/m.test(readFileSync(claudePath, 'utf8'))) {
    write(claudePath, readFileSync(claudePath, 'utf8').replace(/\s*$/, '') + '\n\n@AGENTS.md\n', 'added @AGENTS.md import to');
  } else log('·', 'CLAUDE.md already imports AGENTS.md');
}

/* 3. Skill */
if (!has('--no-skill')) {
  const cmd = ['-y', SKILLS_CLI, 'add', source, '--skill', SKILL, ...agents.flatMap((a) => ['-a', a]), '-y'];
  if (dry) log('~', `would run: npx ${cmd.join(' ')}`);
  else {
    log('…', `installing skill ${SKILL} for ${agents.join(', ')}`);
    const r = spawnSync('npx', cmd, { stdio: 'inherit', cwd, env: { ...process.env, DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1' }, shell: process.platform === 'win32' });
    if (r.status !== 0) {
      log('✗', `skill install failed. For a private repo, check that git can reach it: git ls-remote https://github.com/${REPO}`);
      process.exitCode = 1;
    } else log('✓', `skill installed in .agents/skills/${SKILL}`);
  }
  if (existsSync(join(cwd, '.agents/skills', OLD_SKILL))) log('!', `old skill .agents/skills/${OLD_SKILL} is still installed. Remove it so agents do not load both: npx skills remove ${OLD_SKILL}`);
}

/* 4. .npmrc */
if (!has('--no-npmrc')) {
  const npmrc = join(cwd, '.npmrc');
  const line = `${SCOPE}:registry=https://npm.pkg.github.com`;
  const cur = existsSync(npmrc) ? readFileSync(npmrc, 'utf8') : '';
  if (cur.includes(line)) log('·', '.npmrc already points the scope at GitHub Packages');
  else write(npmrc, (cur ? cur.replace(/\s*$/, '') + '\n' : '') + line + '\n', cur ? 'added scope to' : 'created');
}

/* 5. Stack-specific next steps */
let stack = val('--stack', '');
if (!stack) {
  try {
    const pj = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8'));
    const deps = { ...pj.dependencies, ...pj.devDependencies };
    stack = deps.antd ? 'antd' : deps.tailwindcss ? (/^[\^~]?4/.test(deps.tailwindcss) ? 'tailwind4' : 'tailwind') : '';
  } catch { /* no package.json */ }
}
const steps = {
  antd: `  import { ConfigProvider, App } from 'antd';
  import { t1Theme } from '${PKG}/antd';
  import '${PKG}/global.css';

  <ConfigProvider theme={t1Theme}><App>{/* your app */}</App></ConfigProvider>`,
  tailwind: `  // tailwind.config.ts
  presets: [require('${PKG}/tailwind/preset')],
  // src/index.css: keep the @tailwind lines, remove the old :root/.dark variables, then add
  @import '${PKG}/tailwind/shadcn.css';`,
  tailwind4: `  /* main CSS */
  @import "tailwindcss";
  @import "${PKG}/tailwind/v4.css";`,
};
console.log(`
Next: install the theme package
  export NODE_AUTH_TOKEN=<GitHub token with read:packages>   (or: gh auth token)
  echo "//npm.pkg.github.com/:_authToken=\\\${NODE_AUTH_TOKEN}" >> ~/.npmrc   (once per machine)
  npm i ${PKG}
${stack ? `\nThen wire it (${stack === 'antd' ? 'Ant Design' : stack === 'tailwind4' ? 'Tailwind v4' : 'Tailwind v3 / shadcn'} detected):\n${steps[stack]}\n` : `\nThen wire it for your stack (see the repo README):\n${steps.antd}\n`}
Update later: re-run this command, then npm update ${PKG}
Moving from @rdthunderthailand/mw-theme? See MIGRATION.md in the design system repo.
`);
