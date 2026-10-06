# ThunderOne design system

One source of truth for the UI of **every ThunderOne Workspace** (Media, Help, and the ones that come next), shared by every coding agent the team uses (Claude Code, Codex, Antigravity, Cursor, Lovable, the Claude app) and by the code itself.

| Part | Path | Used by |
|---|---|---|
| Agent skill `thunderone-ui` | `skills/thunderone-ui/` | Agents: core rules (DS-xx), shell, components, icons, brand, review checklist |
| Workspace profiles | `skills/thunderone-ui/references/workspaces/` | Agents: per-Workspace vocabulary, nav, status mapping, icons, pages |
| Theme package `@rdthunderthailand/thunderone-theme` | `packages/thunderone-theme/` | Code: Ant Design theme, Tailwind v3/v4 + shadcn theme, platform icons, tokens, logos, Workspace extras |
| Setup CLI | `bin/setup.mjs` | People: one command per project |
| Design tokens | `skills/thunderone-ui/tokens.json` | Everything above is generated from this file |

Token values were first extracted from Figma **Rev.2 - Media Workspace**, the first Workspace built on this system.

## How it is organized

```
core (every Workspace)                 Workspace profile (one per Workspace)
─────────────────────────              ─────────────────────────────────────
tokens.json, theme package             vocabulary, nav groups and order
platform shell (sidebar, header)       status mapping → semantic status tokens
platform components and states         icon map for domain concepts
platform icons (T1Icon)                page layouts, table column drop order
copy, language, accessibility rules    domain components
review checklist (DS-01 … DS-14)       open items
```

A profile adds detail. It never overrides a core rule.

Profiles today: `media` (Media Workspace), `help` (Help, a platform utility). New one: copy `references/workspaces/_template.md`.

## Use it in a project

### 1. One-time machine setup (GitHub Packages)

Create a GitHub token with `read:packages` (or use `gh auth token`) and run once:

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### 2. In the project root

```bash
npx github:rdThunderThailand/-thunder-design-system --workspace media   # or help, …
```

This will:
- add a managed design-system section to `AGENTS.md` naming the project's Workspace (your own content stays untouched)
- make `CLAUDE.md` import `AGENTS.md`
- install the skill into `.agents/skills/` for Claude Code, Codex and Antigravity (telemetry off)
- map the `@rdthunderthailand` scope to GitHub Packages in `.npmrc`
- print the wiring for your stack (Ant Design or Tailwind is detected from `package.json`)

Options: `--workspace <key>` · `--agents claude-code,codex,antigravity,cursor` · `--stack antd|tailwind|tailwind4` · `--no-skill` · `--no-agents-md` · `--no-npmrc` · `--dry-run`

### 3. Install and wire the theme

```bash
npm i @rdthunderthailand/thunderone-theme
```

**Ant Design**
```tsx
import { ConfigProvider, App } from 'antd';
import { t1Theme } from '@rdthunderthailand/thunderone-theme/antd';
import '@rdthunderthailand/thunderone-theme/global.css';

<ConfigProvider theme={t1Theme}><App>{/* app */}</App></ConfigProvider>
```

**Tailwind v3 / shadcn (Lovable)**
```js
// tailwind.config.ts
presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]
```
```css
/* src/index.css — first line; delete the old :root / .dark variables */
@import '@rdthunderthailand/thunderone-theme/tailwind/shadcn.css';
```

**Tailwind v4**
```css
@import "tailwindcss";
@import "@rdthunderthailand/thunderone-theme/tailwind/v4.css";
```

**Workspace extras**
```ts
import { mediaStatus, MediaIcon, channelTypeIcon } from '@rdthunderthailand/thunderone-theme/workspaces/media';
```

### Tools without a terminal

| Tool | How |
|---|---|
| **Lovable** | Workspace settings → Skills → upload `thunderone-ui.zip` from the latest release. Paste `skills/thunderone-ui/AGENTS.snippet.md` into Project Knowledge with `{{WORKSPACE}}` replaced by the Workspace key. |
| **Claude app** | An org owner uploads `thunderone-ui.zip` (latest release) as an organization skill. Tell Claude which Workspace you are working on. |

### Updating

```bash
npx github:rdThunderThailand/-thunder-design-system   # refreshes AGENTS.md section and skill; keeps the Workspace already set
npm update @rdthunderthailand/thunderone-theme
```

Coming from `@rdthunderthailand/mw-theme` / `media-workspace-ui`: see [MIGRATION.md](MIGRATION.md).

## Change the design system

1. Edit `skills/thunderone-ui/tokens.json` (colors, radius, sizes), the core docs, or a Workspace profile.
2. `npm run build:tokens` regenerates the theme files and the copies inside the skill.
3. `npm test` checks that everything is in sync, that no color is used that is not a token, and that the core stays Workspace-neutral.
4. Open a PR. CI builds the package, compiles Tailwind v3 and v4, and runs the setup CLI in a fresh project.
5. Release: bump `packages/thunderone-theme/package.json` version, merge, then `git tag vX.Y.Z && git push origin vX.Y.Z`. The release workflow publishes the package and attaches `thunderone-ui.zip`.

Hand-written: `packages/thunderone-theme/src/antd.ts` (token → antd mapping), `src/icons.tsx` (platform icon map), `src/workspaces/*` (Workspace extras). Everything else in `packages/thunderone-theme/src` and `skills/thunderone-ui/assets/code` is generated.

## Reviews and QC

Every core rule has an ID (DS-01 … DS-14) and every open design question has one (OD-01 …). `skills/thunderone-ui/references/review-checklist.md` lists what to check, with P0/P1/P2 severity, so QC reports can cite design-system rules the same way they cite UC/AC IDs in the Product Specification.

## Open design decisions

See `skills/thunderone-ui/references/open-decisions.md`. Agents follow `tokens.json` until design decides. Notable: OD-05, no Thai typeface yet (blocking for TH content).
