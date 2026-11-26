# ThunderOne design system

One source of truth for the UI of **every ThunderOne Workspace** (Media, Asset, Help, and the ones that come next), shared by every coding agent the team uses (Claude Code, Codex, Antigravity, Cursor, Lovable, the Claude app) and by the code itself.

| Part | Path | Used by |
|---|---|---|
| Agent skill `thunderone-ui` | `skills/thunderone-ui/` | Agents: core rules (DS-xx), foundations, shell, components, icons, brand, review checklist |
| Workspace profiles | `skills/thunderone-ui/references/workspaces/` | Agents: per-Workspace vocabulary, nav, status mapping, icons, pages |
| Theme package `@rdthunderthailand/thunderone-theme` | `packages/thunderone-theme/` | Code: Tailwind v4/v3 + shadcn/ui theme, lucide icon map, status tones, tokens, logos, Workspace extras |
| Setup CLI | `bin/setup.mjs` | People: one command per project |
| Design tokens | `skills/thunderone-ui/tokens.json` | Everything above is generated from this file |
| Product workflow skills | `skills/spec-design-conformance/`, `skills/figjam-read-via-chrome/`, `skills/workspace-design-dev-plan/` | Agents: PO / UX / Dev work around the design (see below). Not part of the UI core |

Design source: Figma **"[DS] - Design System"** (`kW5RDAy0BZ4Muj9RU3dPgC`), "Design System Thunder One — v2 (Lovable)", built from the Lovable code (Tailwind v4 + shadcn/ui new-york). Stack: **shadcn/ui + Tailwind + lucide-react**. Ant Design is no longer supported (1.0).

## How it is organized

```
core (every Workspace)                 Workspace profile (one per Workspace)
─────────────────────────              ─────────────────────────────────────
tokens.json, theme package             vocabulary, nav groups and order
platform shell (sidebar, header)       status mapping → semantic status tokens
platform components and states         icon map for domain concepts
platform icons (T1Icon, lucide)        page layouts, table column drop order
copy, language, accessibility rules    domain components
review checklist (DS-01 … DS-16)       open items
```

A profile adds detail. It never overrides a core rule.

Profiles today: `media` (Media Workspace), `asset` (Asset Workspace), `help` (Help, a platform utility). New one: copy `references/workspaces/_template.md`.

## Use it in a project

### 1. One-time machine setup (GitHub Packages)

Create a GitHub token with `read:packages` (or use `gh auth token`) and run once:

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### 2. In the project root

```bash
npx github:rdThunderThailand/-thunder-design-system --workspace media   # or asset, help, …
```

This will:
- add a managed design-system section to `AGENTS.md` naming the project's Workspace (your own content stays untouched)
- make `CLAUDE.md` import `AGENTS.md`
- install the skill into `.agents/skills/` for Claude Code, Codex and Antigravity (telemetry off)
- map the `@rdthunderthailand` scope to GitHub Packages in `.npmrc`
- print the wiring for your stack (Tailwind v4 or v3, detected from `package.json`)

Options: `--workspace <key>` · `--agents claude-code,codex,antigravity,cursor` · `--stack tailwind4|tailwind` · `--no-skill` · `--no-agents-md` · `--no-npmrc` · `--dry-run`

### 3. Install and wire the theme

```bash
npm i @rdthunderthailand/thunderone-theme lucide-react
```

**Tailwind v4 (Lovable today)**
```css
@import "tailwindcss";
@import "@rdthunderthailand/thunderone-theme/tailwind/v4.css";
/* delete the project's own :root / .dark / @theme color blocks */
```

**Tailwind v3**
```js
// tailwind.config.ts
presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]
```
```css
/* src/index.css — first line; delete the old :root / .dark variables */
@import '@rdthunderthailand/thunderone-theme/tailwind/shadcn.css';
```

**Icons, status, Workspace extras**
```ts
import { T1Icon } from '@rdthunderthailand/thunderone-theme/icons';
import { statusTone, t1Status } from '@rdthunderthailand/thunderone-theme/status';
import { mediaStatusTone, channelTypeIcon } from '@rdthunderthailand/thunderone-theme/workspaces/media';
import { assetNav, AssetIcon } from '@rdthunderthailand/thunderone-theme/workspaces/asset';
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

Upgrading from 0.x (Ant Design theme, `--t1-*` variables) or from `mw-theme`: see [MIGRATION.md](MIGRATION.md).

## Product workflow skills

Three skills for the product process around the design system. They are separate from `thunderone-ui`: the setup CLI does not install them, and the core rules (DS-xx) do not apply to them.

| Skill | Use it to |
|---|---|
| `spec-design-conformance` | Check a FigJam/Figma design or a built screen against the latest Product Definition + Specification; report P0/P1 gaps and CONFLICTs traced to UC/AC, with gate states PASS / PARTIAL / MISSING / CONFLICT |
| `figjam-read-via-chrome` | Read a FigJam board (text, tables, mockup images) through the user's logged-in Chrome when Figma MCP credits or rate limits run out. Read-only |
| `workspace-design-dev-plan` | Compare a new Workspace design with the `thunder-one-prj` code: reuse matrix, phased dev plan, Definition/Specification drafts |

They follow the ThunderOne Product Development Playbook v1.1 and the Roles, DoD & Performance Framework v0.3, and are written in Thai.

**Install**

- Claude Code / Codex / Antigravity, in the project root (same `skills` CLI the setup uses; repeat per skill, add `-a codex -a antigravity` as needed):
  ```bash
  npx -y skills@1.7.0 add rdThunderThailand/-thunder-design-system --skill spec-design-conformance -a claude-code -y
  npx -y skills@1.7.0 add rdThunderThailand/-thunder-design-system --skill figjam-read-via-chrome -a claude-code -y
  npx -y skills@1.7.0 add rdThunderThailand/-thunder-design-system --skill workspace-design-dev-plan -a claude-code -y
  ```
- Claude app: zip the skill folder (`cd skills && zip -r spec-design-conformance.zip spec-design-conformance`), then an org owner uploads it in Organization settings → Plugins & skills, or a member uploads it in Settings → Capabilities → Skills.

`figjam-read-via-chrome` needs Claude in Chrome. `workspace-design-dev-plan` expects the `thunder-one-prj` repo as a connected folder.

## Change the design system

1. Edit `skills/thunderone-ui/tokens.json` (colors, radius, sizes), the core docs, or a Workspace profile.
2. `npm run build:tokens` regenerates the theme files and the copies inside the skill.
3. `npm test` checks that everything is in sync, that no color is used that is not a token, and that the core stays Workspace-neutral.
4. Open a PR. CI builds the package, compiles Tailwind v3 and v4, and runs the setup CLI in a fresh project.
5. Release: bump `packages/thunderone-theme/package.json` version, merge, then `git tag vX.Y.Z && git push origin vX.Y.Z`. The release workflow publishes the package and attaches `thunderone-ui.zip`.

Hand-written: `packages/thunderone-theme/src/status.ts` (status tones), `src/icons.tsx` (platform icon map), `src/workspaces/*` (Workspace extras). Everything else in `packages/thunderone-theme/src` and `skills/thunderone-ui/assets/code` is generated.

## Reviews and QC

Every core rule has an ID (DS-01 … DS-16; DS-09 retired) and every open design question has one (OD-01 …). `skills/thunderone-ui/references/review-checklist.md` lists what to check, with P0/P1/P2 severity, so QC reports can cite design-system rules the same way they cite UC/AC IDs in the Product Specification.

## Open design decisions

See `skills/thunderone-ui/references/open-decisions.md`. Agents follow `tokens.json` until design decides. Notable: OD-07 dark mode not approved, OD-08 checkbox radius, OD-09 margin at 1024.
