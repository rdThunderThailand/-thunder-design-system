#!/usr/bin/env node
/**
 * Single build step for the design system.
 *
 *   node scripts/build.mjs          generate + sync all derived files
 *   node scripts/build.mjs --check  fail (exit 1) if any derived file is out of date (used by CI)
 *
 * Source of truth: skills/thunderone-ui/tokens.json
 * Hand-written:    packages/thunderone-theme/src/status.ts, icons.tsx, index.ts, workspaces/*
 * Generated:       packages/thunderone-theme/src/tokens.ts, tailwind/*
 * Synced copies:   skills/thunderone-ui/assets/code/* (for tools that cannot install the npm package)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = join(ROOT, 'skills/thunderone-ui');
const PKG = join(ROOT, 'packages/thunderone-theme/src');
const CHECK = process.argv.includes('--check');
const T = JSON.parse(readFileSync(join(SKILL, 'tokens.json'), 'utf8'));
const stale = [];

function emit(path, content) {
  const cur = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (cur === content) return;
  if (CHECK) { stale.push(relative(ROOT, path)); return; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log('wrote', relative(ROOT, path));
}
const GEN = 'GENERATED from skills/thunderone-ui/tokens.json by scripts/build.mjs. Do not edit by hand.';
const real = (o) => Object.entries(o).filter(([k]) => !k.startsWith('$'));
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, x) => x.toUpperCase());
const camelObj = (o) => Object.fromEntries(real(o).map(([k, v]) => [camel(k), v && typeof v === 'object' && !Array.isArray(v) ? camelObj(v) : v]));
const px = (v) => (typeof v === 'string' && v.endsWith('px') ? parseFloat(v) : v);
const pxObj = (o) => Object.fromEntries(real(o).map(([k, v]) => [camel(k), px(v)]));

const colors = Object.fromEntries(real(T.color));
const text = Object.fromEntries(real(T.text));
const R = Object.fromEntries(real(T.radius));
const S = Object.fromEntries(real(T.shadow));
const L = T.layout;

/* ------------------------------------------------------------------ tokens.ts */
const tokensTs = {
  color: camelObj(colors),
  status: camelObj(T.status),
  statusMap: camelObj(T['status-map']),
  font: { sans: T.font.family.sans, weight: T.font.weight },
  text: Object.fromEntries(Object.entries(text).map(([k, v]) => [camel(k), v])),
  radius: pxObj(R),
  shadow: S,
  layout: pxObj(L),
  breakpoint: pxObj(T.breakpoint),
  z: camelObj(T.z),
  motion: camelObj(T.motion),
};
const tokensSrc = `/* ThunderOne design tokens.\n   ${GEN} */\n\nexport const t1Tokens = ${JSON.stringify(tokensTs, null, 2)} as const;\n\nexport type T1Tokens = typeof t1Tokens;\nexport type T1Tone = keyof typeof t1Tokens.status;\n`;
emit(join(PKG, 'tokens.ts'), tokensSrc);

/* ------------------------------------------------------------------ shared CSS bits */
const FONT_IMPORT = `@import url('${T.font['google-fonts']}');`;
const header = (what) => `/* ${what}\n   ${GEN} */\n`;
const helpers = (thumb, thumbHover) => `
/* Scrollbars: thin, token-colored, everywhere */
* { scrollbar-width: thin; scrollbar-color: ${thumb} transparent; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner { background: transparent; }
::-webkit-scrollbar-thumb { background: ${thumb}; border-radius: 9999px; border: 3px solid transparent; background-clip: padding-box; }
::-webkit-scrollbar-thumb:hover { background: ${thumbHover}; background-clip: padding-box; }
/* Sidebar nav: scrollbar hidden until hover. Put .t1-scroll-quiet on the nav scroll area. */
.t1-scroll-quiet { scrollbar-gutter: stable; scrollbar-color: transparent transparent; overscroll-behavior: contain; }
.t1-scroll-quiet:hover, .t1-scroll-quiet:focus-within { scrollbar-color: ${thumb} transparent; }
.t1-scroll-quiet::-webkit-scrollbar-thumb { background: transparent; background-clip: padding-box; }
.t1-scroll-quiet:hover::-webkit-scrollbar-thumb, .t1-scroll-quiet:focus-within::-webkit-scrollbar-thumb { background: ${thumb}; background-clip: padding-box; }
/* Horizontal chip / segmented rows on phones: swipe, no visible scrollbar */
.t1-scroll-x { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.t1-scroll-x::-webkit-scrollbar { display: none; }
/* Numbers that line up */
.t1-num, td, th { font-variant-numeric: tabular-nums; }
/* Thai has no capitals: caps labels drop uppercase and tracking */
:lang(th) .text-label-section, :lang(th) .text-label-type { text-transform: none; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }
`;

/* Text-style variables: shared by v3 and v4. English values on :root, Thai overrides on :lang(th). */
const textVars = (indent) => Object.entries(text).map(([k, v]) => [
  `${indent}--text-${k}: ${v.size};`,
  `${indent}--text-${k}--line-height: ${v.lineHeight};`,
  `${indent}--text-${k}--font-weight: ${v.weight};`,
  `${indent}--text-${k}--letter-spacing: ${v.letterSpacing || '0em'};`,
].join('\n')).join('\n');
const textVarsTh = (indent) => Object.entries(text).map(([k, v]) => [
  `${indent}--text-${k}--line-height: ${v.lineHeightTh};`,
  v.weightTh ? `${indent}--text-${k}--font-weight: ${v.weightTh};` : null,
  v.letterSpacing ? `${indent}--text-${k}--letter-spacing: 0em;` : null,
].filter(Boolean).join('\n')).join('\n');

/* ------------------------------------------------------------------ Tailwind v4 (primary: Lovable stack) */
const radiusV4 = {
  sm: 'calc(var(--radius) - 4px)', md: 'calc(var(--radius) - 2px)', lg: 'var(--radius)', xl: 'calc(var(--radius) + 4px)',
  '2xl': R['2xl'], '3xl': R['3xl'], '4xl': R['4xl'],
};
const v4Css = header('ThunderOne — Tailwind v4 + shadcn/ui theme (light).\n   Main CSS: @import "tailwindcss"; then @import this file. Delete the project\'s own :root / .dark / @theme color blocks.') + `
${FONT_IMPORT}

:root {
  --radius: 0.75rem;
${Object.entries(colors).map(([k, v]) => `  --${k}: ${v};`).join('\n')}
  color-scheme: light;
}

@theme inline {
${Object.keys(colors).map((k) => `  --color-${k}: var(--${k});`).join('\n')}
  --font-sans: ${T.font.family.sans};
${Object.entries(radiusV4).map(([k, v]) => `  --radius-${k}: ${v};`).join('\n')}
${Object.entries(S).map(([k, v]) => `  --shadow-${k}: ${v};`).join('\n')}
  --breakpoint-xs: ${T.breakpoint.xs};
  --spacing-sidebar: ${L.sidebar}; --spacing-sidebar-collapsed: ${L['sidebar-collapsed']}; --spacing-sidebar-drawer: ${L['sidebar-drawer']};
  --spacing-header: ${L.header}; --spacing-summary-card: ${T.spacing['summary-card']};
  --container-search: ${L['search-max']}; --container-measure: ${L['text-measure']};
}

@theme {
${textVars('  ')}
}

:lang(th) {
${textVarsTh('  ')}
}

@layer base {
  * { border-color: var(--color-border); }
  body { background: var(--color-background); color: var(--color-foreground); font-family: var(--font-sans); }
}
${helpers('var(--border)', 'var(--muted-foreground)')}`;
emit(join(PKG, 'tailwind/v4.css'), v4Css);

/* ------------------------------------------------------------------ Tailwind v3 (older Lovable projects) */
function hsl(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  const f = (x) => Math.round(x * 10) / 10;
  return `${f(h)} ${f(s * 100)}% ${f(l * 100)}%`;
}
const v3name = (k) => (k === 'sidebar' ? 'sidebar-background' : k);
const shadcnCss = header('ThunderOne — shadcn/ui theme for Tailwind v3 (light).\n   First line of src/index.css, then the @tailwind lines. Delete the old :root / .dark blocks.') + `
${FONT_IMPORT}

@layer base {
  :root {
    --radius: 0.75rem;
${Object.entries(colors).map(([k, v]) => `    --${v3name(k)}: ${hsl(v)}; /* ${v} */`).join('\n')}
${textVars('    ')}
    color-scheme: light;
  }
  :lang(th) {
${textVarsTh('    ')}
  }
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans antialiased; }
}
${helpers('hsl(var(--border))', 'hsl(var(--muted-foreground))')}`;
emit(join(PKG, 'tailwind/shadcn.css'), shadcnCss);

const slot = (k) => `hsl(var(--${v3name(k)}) / <alpha-value>)`;
const nest = {};
for (const k of Object.keys(colors)) {
  const [head, ...rest] = k.split('-');
  const groups = ['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive', 'border', 'success', 'warning', 'danger', 'info', 'surface', 'chart', 'sidebar', 'brand'];
  if (groups.includes(head) && (rest.length || Object.keys(colors).some((o) => o.startsWith(head + '-')))) {
    nest[head] = nest[head] || {};
    nest[head][rest.length ? rest.join('-') : 'DEFAULT'] = slot(k);
  } else nest[k] = slot(k);
}
const preset = {
  theme: {
    extend: {
      colors: nest,
      fontFamily: { sans: T.font.family.sans.split(',').map((s) => s.trim().replace(/'/g, '')) },
      borderRadius: { sm: 'calc(var(--radius) - 4px)', md: 'calc(var(--radius) - 2px)', lg: 'var(--radius)', xl: 'calc(var(--radius) + 4px)', '2xl': R['2xl'], '3xl': R['3xl'], '4xl': R['4xl'] },
      boxShadow: S,
      screens: { xs: T.breakpoint.xs },
      spacing: { sidebar: L.sidebar, 'sidebar-collapsed': L['sidebar-collapsed'], 'sidebar-drawer': L['sidebar-drawer'], header: L.header, 'summary-card': T.spacing['summary-card'] },
      maxWidth: { search: L['search-max'], measure: L['text-measure'] },
      fontSize: Object.fromEntries(Object.keys(text).map((k) => [k, [`var(--text-${k})`, {
        lineHeight: `var(--text-${k}--line-height)`, fontWeight: `var(--text-${k}--font-weight)`, letterSpacing: `var(--text-${k}--letter-spacing)`,
      }]])),
    },
  },
};
const presetSrc = `// ThunderOne — Tailwind v3 preset (pair it with tailwind/shadcn.css).\n// ${GEN}\n// tailwind.config: presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]\n/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
emit(join(PKG, 'tailwind/preset.cjs'), presetSrc);

/* ------------------------------------------------------------------ sync copies into the skill */
const A = join(SKILL, 'assets/code');
const note = (file) => `/* Copy of packages/thunderone-theme/src/${file}, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/thunderone-theme */\n`;
const local = (s) => s.replace("from './tokens.js'", "from './t1-tokens'").replace("from '../tokens.js'", "from '../t1-tokens'")
  .replace("from '../status.js'", "from '../t1-status'").replace("from '../icons.js'", "from '../t1-icons'");
emit(join(A, 't1-tokens.ts'), tokensSrc);
emit(join(A, 't1-status.ts'), note('status.ts') + local(readFileSync(join(PKG, 'status.ts'), 'utf8')));
emit(join(A, 't1-icons.tsx'), note('icons.tsx') + local(readFileSync(join(PKG, 'icons.tsx'), 'utf8')));
for (const f of readdirSync(join(PKG, 'workspaces'))) {
  emit(join(A, 'workspaces', f), note(`workspaces/${f}`) + local(readFileSync(join(PKG, 'workspaces', f), 'utf8')));
}
emit(join(A, 'tailwind/t1-tailwind-v4.css'), v4Css);
emit(join(A, 'tailwind/t1-shadcn.css'), shadcnCss);
emit(join(A, 'tailwind/t1-tailwind-preset.js'), presetSrc.replace("require('@rdthunderthailand/thunderone-theme/tailwind/preset')", "require('./t1-tailwind-preset.js')"));

if (CHECK) {
  if (stale.length) {
    console.error('Out of date (run `npm run build:tokens` and commit):\n  ' + stale.join('\n  '));
    process.exit(1);
  }
  console.log('All derived files are up to date.');
}
