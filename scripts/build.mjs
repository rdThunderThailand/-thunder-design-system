#!/usr/bin/env node
/**
 * Single build step for the design system.
 *
 *   node scripts/build.mjs          generate + sync all derived files
 *   node scripts/build.mjs --check  fail (exit 1) if any derived file is out of date (used by CI)
 *
 * Source of truth: skills/thunderone-ui/tokens.json
 * Hand-written:    packages/thunderone-theme/src/antd.ts, icons.tsx, index.ts, workspaces/*
 * Generated:       packages/thunderone-theme/src/tokens.ts, global.css, tailwind/*
 * Synced copies:   skills/thunderone-ui/assets/code/* (for tools that cannot install the npm package)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILL = join(ROOT, 'skills/thunderone-ui');
const PKG = join(ROOT, 'packages/thunderone-theme/src');
const CHECK = process.argv.includes('--check');
const T = JSON.parse(readFileSync(join(SKILL, 'tokens.json'), 'utf8'));
const c = T.color;
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
const camel = (s) => s.replace(/-([a-z0-9])/g, (_, x) => x.toUpperCase());
const camelObj = (o) => Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [camel(k), typeof v === 'object' ? camelObj(v) : v]));
const px = (v) => parseInt(v, 10);

/* ------------------------------------------------------------------ tokens.ts */
const tokensTs = {
  ...camelObj({ bg: c.bg, surface: c.surface, text: c.text, border: c.border, action: c.action, status: c.status }),
  primitive: T.primitive,
  radius: Object.fromEntries(Object.entries(T.radius).filter(([k]) => !k.startsWith('$')).map(([k, v]) => [k, px(v)])),
  shadow: T.shadow,
  font: T.font.family.sans,
  layout: {
    sidebar: px(T.size.sidebar), header: px(T.size.header),
    contentPaddingX: px(T.layout['content-padding-x']), contentPaddingTop: px(T.layout['content-padding-top']),
    cardPadding: px(T.layout['card-padding']), gridGap: px(T.layout['grid-gap']),
  },
};
const tokensSrc = `/* ThunderOne design tokens.\n   ${GEN} */\n\nexport const t1Tokens = ${JSON.stringify(tokensTs, null, 2)} as const;\n\nexport type T1Tokens = typeof t1Tokens;\n`;
emit(join(PKG, 'tokens.ts'), tokensSrc);

/* ------------------------------------------------------------------ shared CSS bits */
const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');";
const scrollbars = (thumb) => `
/* Scrollbars: thin, token-colored, everywhere */
* { scrollbar-width: thin; scrollbar-color: ${thumb} transparent; }
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track, ::-webkit-scrollbar-corner { background: transparent; }
::-webkit-scrollbar-thumb { background: ${thumb}; border-radius: 9999px; border: 3px solid transparent; background-clip: padding-box; }
::-webkit-scrollbar-thumb:hover { background: ${c.text.tertiary}; background-clip: padding-box; }
/* Sidebar nav: scrollbar hidden until hover. Put .t1-scroll-quiet on the nav scroll area. (.mw-* = deprecated alias) */
.t1-scroll-quiet, .mw-scroll-quiet { scrollbar-gutter: stable; scrollbar-color: transparent transparent; overscroll-behavior: contain; }
.t1-scroll-quiet:hover, .t1-scroll-quiet:focus-within, .mw-scroll-quiet:hover, .mw-scroll-quiet:focus-within { scrollbar-color: ${thumb} transparent; }
.t1-scroll-quiet::-webkit-scrollbar-thumb, .mw-scroll-quiet::-webkit-scrollbar-thumb { background: transparent; background-clip: padding-box; }
.t1-scroll-quiet:hover::-webkit-scrollbar-thumb, .t1-scroll-quiet:focus-within::-webkit-scrollbar-thumb, .mw-scroll-quiet:hover::-webkit-scrollbar-thumb, .mw-scroll-quiet:focus-within::-webkit-scrollbar-thumb { background: ${thumb}; background-clip: padding-box; }
/* Horizontal chip / segmented rows on phones: swipe, no visible scrollbar */
.t1-scroll-x, .mw-scroll-x { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.t1-scroll-x::-webkit-scrollbar, .mw-scroll-x::-webkit-scrollbar { display: none; }
`;

/* ------------------------------------------------------------------ global.css (antd projects) */
const cssVar = (prefix, obj) => Object.entries(obj).filter(([k]) => !k.startsWith('$')).map(([k, v]) => `  --t1-${prefix}-${k}: ${v};`).join('\n');
const legacyVars = [...globalVarNames()].map((n) => `  --mw-${n}: var(--t1-${n});`).join('\n');
function globalVarNames() {
  const groups = { bg: c.bg, surface: c.surface, text: c.text, border: c.border, action: c.action, status: c.status, radius: T.radius, shadow: T.shadow };
  const names = Object.entries(groups).flatMap(([p, o]) => Object.keys(o).filter((k) => !k.startsWith('$')).map((k) => `${p}-${k}`));
  return [...names, 'font', 'sidebar', 'header', 'content-px', 'content-pt', 'card-padding', 'gap'];
}
const globalCss = `/* ThunderOne global CSS for Ant Design projects. Import once at the app root.
   ${GEN} */
${FONT_IMPORT}

:root {
${cssVar('bg', c.bg)}
${cssVar('surface', c.surface)}
${cssVar('text', c.text)}
${cssVar('border', c.border)}
${cssVar('action', c.action)}
${cssVar('status', c.status)}
${cssVar('radius', T.radius)}
${cssVar('shadow', T.shadow)}
  --t1-font: ${T.font.family.sans};
  --t1-sidebar: ${T.size.sidebar}; --t1-header: ${T.size.header};
  --t1-content-px: ${T.layout['content-padding-x']}; --t1-content-pt: ${T.layout['content-padding-top']};
  --t1-card-padding: ${T.layout['card-padding']}; --t1-gap: ${T.layout['grid-gap']};
  color-scheme: light;
}

/* Deprecated --mw-* aliases for projects migrating from mw-theme 0.1. Removed in the next major. */
:root {
${legacyVars}
}

body { margin: 0; background: var(--t1-bg-primary); color: var(--t1-text-primary); font-family: var(--t1-font); }
${scrollbars('var(--t1-border-default)')}
/* Sidebar menu group titles: uppercase labels as in Figma */
.ant-menu-item-group-title { font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
/* Numbers that line up */
.t1-num, .mw-num, .ant-statistic-content { font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
`;
emit(join(PKG, 'global.css'), globalCss);

/* ------------------------------------------------------------------ Tailwind / shadcn */
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
const shadcn = {
  background: c.bg.primary, foreground: c.text.primary,
  card: c.surface.default, 'card-foreground': c.text.primary,
  popover: c.surface.default, 'popover-foreground': c.text.primary,
  primary: c.action.primary, 'primary-foreground': c.text.inverse,
  secondary: c.bg['primary-strong'], 'secondary-foreground': c.text.primary,
  muted: c.bg['primary-strong'], 'muted-foreground': c.text.secondary,
  accent: c.action['subdued-menu'], 'accent-foreground': c.text.brand,
  destructive: c.action.destructive, 'destructive-foreground': c.text.inverse,
  border: c.border.subtle, input: c.border.default, ring: c.border.focus,
  'sidebar-background': c.surface.default, 'sidebar-foreground': c.text.secondary,
  'sidebar-primary': c.action.primary, 'sidebar-primary-foreground': c.text.inverse,
  'sidebar-accent': c.action['subdued-menu'], 'sidebar-accent-foreground': c.action.primary,
  'sidebar-border': c.border.subtle, 'sidebar-ring': c.border.focus,
  success: c.status.success, 'success-foreground': c.text.inverse, 'success-muted': c.status['success-bg'],
  warning: c.status.warning, 'warning-foreground': c.text.primary, 'warning-muted': c.status['warning-bg'],
  error: c.status.error, 'error-foreground': c.text.inverse, 'error-muted': c.status['error-bg'],
  info: c.status.info, 'info-foreground': c.text.inverse, 'info-muted': c.status['info-bg'],
  'in-progress': c.status['in-progress'], 'in-progress-muted': c.status['in-progress-bg'],
};
const R = T.radius;
const scale = T.font['scale-on-approved-screen'];
const vars = Object.entries(shadcn).map(([k, v]) => `    --${k}: ${hsl(v)}; /* ${v} */`).join('\n');
const header = (what) => `/* ${what}\n   ${GEN} */\n`;

const shadcnCss = header('ThunderOne — shadcn/ui theme for Tailwind v3 (Lovable default stack).\n   Paste below the @tailwind lines in src/index.css, replacing the old :root / .dark blocks.') + `
${FONT_IMPORT}

@layer base {
  :root {
${vars}
    --radius: ${R.lg};
    color-scheme: light;
  }
  * { @apply border-border; }
  body { @apply bg-background text-foreground font-sans antialiased; }
  .num, td, th { font-variant-numeric: tabular-nums; }
}
${scrollbars('hsl(var(--input))')}`;
emit(join(PKG, 'tailwind/shadcn.css'), shadcnCss);

const slot = (k) => `hsl(var(--${k}) / <alpha-value>)`;
const preset = {
  theme: {
    extend: {
      colors: {
        border: slot('border'), input: slot('input'), ring: slot('ring'),
        background: slot('background'), foreground: slot('foreground'),
        primary: { DEFAULT: slot('primary'), foreground: slot('primary-foreground') },
        secondary: { DEFAULT: slot('secondary'), foreground: slot('secondary-foreground') },
        muted: { DEFAULT: slot('muted'), foreground: slot('muted-foreground') },
        accent: { DEFAULT: slot('accent'), foreground: slot('accent-foreground') },
        destructive: { DEFAULT: slot('destructive'), foreground: slot('destructive-foreground') },
        card: { DEFAULT: slot('card'), foreground: slot('card-foreground') },
        popover: { DEFAULT: slot('popover'), foreground: slot('popover-foreground') },
        sidebar: {
          DEFAULT: slot('sidebar-background'), foreground: slot('sidebar-foreground'),
          primary: slot('sidebar-primary'), 'primary-foreground': slot('sidebar-primary-foreground'),
          accent: slot('sidebar-accent'), 'accent-foreground': slot('sidebar-accent-foreground'),
          border: slot('sidebar-border'), ring: slot('sidebar-ring'),
        },
        success: { DEFAULT: slot('success'), foreground: slot('success-foreground'), muted: slot('success-muted') },
        warning: { DEFAULT: slot('warning'), foreground: slot('warning-foreground'), muted: slot('warning-muted') },
        error: { DEFAULT: slot('error'), foreground: slot('error-foreground'), muted: slot('error-muted') },
        info: { DEFAULT: slot('info'), foreground: slot('info-foreground'), muted: slot('info-muted') },
        'in-progress': { DEFAULT: slot('in-progress'), muted: slot('in-progress-muted') },
        t1: T.primitive,
      },
      fontFamily: { sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'] },
      borderRadius: { xs: R.xs, sm: R.sm, md: R.md, lg: 'var(--radius)', xl: R.xl, card: R.xl, control: R.lg, nav: R.md, pill: R.pill },
      boxShadow: { panel: T.shadow.card, control: T.shadow.control, dropdown: T.shadow.dropdown },
      spacing: { sidebar: T.size.sidebar, header: T.size.header },
      width: { sidebar: T.size.sidebar, search: T.size.search.width },
      height: { header: T.size.header, nav: T.size['nav-item'], control: T.size.button },
      fontSize: {
        'page-title': [scale['page-title'].size, { lineHeight: scale['page-title'].lineHeight, letterSpacing: scale['page-title'].letterSpacing, fontWeight: String(scale['page-title'].weight) }],
        kpi: [scale['kpi-value'].size, { lineHeight: scale['kpi-value'].lineHeight, letterSpacing: scale['kpi-value'].letterSpacing, fontWeight: String(scale['kpi-value'].weight) }],
        label: [T.font.style['label-lg-regular'].size, { lineHeight: T.font.style['label-lg-regular'].lineHeight, letterSpacing: T.font.style['label-lg-regular'].letterSpacing }],
      },
    },
  },
};
const presetSrc = `// ThunderOne — Tailwind v3 preset.\n// ${GEN}\n// tailwind.config: presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]\n/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
emit(join(PKG, 'tailwind/preset.cjs'), presetSrc);

const v4colors = Object.keys(shadcn).map((k) => `  --color-${k.replace('sidebar-background', 'sidebar')}: hsl(var(--${k}));`).join('\n');
const v4prim = Object.entries(T.primitive).flatMap(([name, v]) =>
  typeof v === 'string' ? [`  --color-t1-${name}: ${v};`] : Object.entries(v).map(([s, hex]) => `  --color-t1-${name}-${s}: ${hex};`)).join('\n');
const v4Css = header('ThunderOne — Tailwind v4 theme. Main CSS: @import "tailwindcss"; then import this file.') + `
${FONT_IMPORT}

:root {
${vars.replace(/^ {4}/gm, '  ')}
  --radius: ${R.lg};
  color-scheme: light;
}

@theme inline {
${v4colors}
${v4prim}
  --font-sans: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --radius-xs: ${R.xs}; --radius-sm: ${R.sm}; --radius-md: ${R.md}; --radius-lg: ${R.lg}; --radius-xl: ${R.xl};
  --radius-card: ${R.xl}; --radius-control: ${R.lg}; --radius-nav: ${R.md}; --radius-pill: ${R.pill};
  --shadow-panel: ${T.shadow.card}; --shadow-control: ${T.shadow.control}; --shadow-dropdown: ${T.shadow.dropdown};
  --spacing-sidebar: ${T.size.sidebar}; --spacing-header: ${T.size.header};
  --spacing-nav: ${T.size['nav-item']}; --spacing-control: ${T.size.button}; --spacing-search: ${T.size.search.width};
  --text-page-title: ${scale['page-title'].size}; --text-page-title--line-height: ${scale['page-title'].lineHeight};
  --text-kpi: ${scale['kpi-value'].size}; --text-kpi--line-height: ${scale['kpi-value'].lineHeight};
}

@layer base {
  * { border-color: var(--color-border); }
  body { background: var(--color-background); color: var(--color-foreground); font-family: var(--font-sans); }
}
${scrollbars('hsl(var(--input))')}`;
emit(join(PKG, 'tailwind/v4.css'), v4Css);

/* ------------------------------------------------------------------ sync copies into the skill */
const A = join(SKILL, 'assets/code');
const note = (file) => `/* Copy of packages/thunderone-theme/src/${file}, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/thunderone-theme */\n`;
emit(join(A, 't1-tokens.ts'), tokensSrc);
emit(join(A, 'antd-theme.ts'), note('antd.ts') + readFileSync(join(PKG, 'antd.ts'), 'utf8').replace("from './tokens.js'", "from './t1-tokens'"));
emit(join(A, 't1-icons.tsx'), note('icons.tsx') + readFileSync(join(PKG, 'icons.tsx'), 'utf8'));
emit(join(A, 'workspaces/media.tsx'), note('workspaces/media.tsx') + readFileSync(join(PKG, 'workspaces/media.tsx'), 'utf8')
  .replace("from '../antd.js'", "from '../antd-theme'").replace("from '../icons.js'", "from '../t1-icons'"));
emit(join(A, 't1-global.css'), globalCss);
emit(join(A, 'tailwind/t1-shadcn.css'), shadcnCss);
emit(join(A, 'tailwind/t1-tailwind-preset.js'), presetSrc.replace("require('@rdthunderthailand/thunderone-theme/tailwind/preset')", "require('./t1-tailwind-preset.js')"));
emit(join(A, 'tailwind/t1-tailwind-v4.css'), v4Css);

if (CHECK) {
  if (stale.length) {
    console.error('Out of date (run `npm run build:tokens` and commit):\n  ' + stale.join('\n  '));
    process.exit(1);
  }
  console.log('All derived files are up to date.');
}
