# ThunderOne design system

One source of truth for the **Media Workspace** UI, shared by every coding agent the team uses (Claude Code, Codex, Antigravity, Cursor, Lovable, the Claude app) and by the code itself.

| Part | Path | Used by |
|---|---|---|
| Agent skill `media-workspace-ui` | `skills/media-workspace-ui/` | Agents: rules, layout, components, icons, brand |
| Theme package `@rdthunderthailand/mw-theme` | `packages/mw-theme/` | Code: Ant Design theme, Tailwind v3/v4 + shadcn theme, icons, tokens, logos |
| Setup CLI | `bin/mw-setup.mjs` | People: one command per project |
| Design tokens | `skills/media-workspace-ui/tokens.json` | Everything above is generated from this file |

Source design: Figma **Rev.2 - Media Workspace**.

## Use it in a project

### 1. One-time machine setup (GitHub Packages)

Create a GitHub token with `read:packages` (or use `gh auth token`) and run once:

```bash
echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc
```

### 2. In the project root

```bash
npx github:rdThunderThailand/-thunder-design-system
```

This will:
- add a managed design-system section to `AGENTS.md` (your own content stays untouched)
- make `CLAUDE.md` import `AGENTS.md`
- install the skill into `.agents/skills/` for Claude Code, Codex and Antigravity (telemetry off)
- map the `@rdthunderthailand` scope to GitHub Packages in `.npmrc`
- print the wiring for your stack (Ant Design or Tailwind is detected from `package.json`)

Options: `--agents claude-code,codex,antigravity,cursor` · `--stack antd|tailwind|tailwind4` · `--no-skill` · `--no-agents-md` · `--no-npmrc` · `--dry-run`

### 3. Install and wire the theme

```bash
npm i @rdthunderthailand/mw-theme
```

**Ant Design**
```tsx
import { ConfigProvider, App } from 'antd';
import { mwTheme } from '@rdthunderthailand/mw-theme/antd';
import '@rdthunderthailand/mw-theme/global.css';

<ConfigProvider theme={mwTheme}><App>{/* app */}</App></ConfigProvider>
```

**Tailwind v3 / shadcn (Lovable)**
```js
// tailwind.config.ts
presets: [require('@rdthunderthailand/mw-theme/tailwind/preset')]
```
```css
/* src/index.css — first line; delete the old :root / .dark variables */
@import '@rdthunderthailand/mw-theme/tailwind/shadcn.css';
```

**Tailwind v4**
```css
@import "tailwindcss";
@import "@rdthunderthailand/mw-theme/tailwind/v4.css";
```

### Tools without a terminal

| Tool | How |
|---|---|
| **Lovable** | Workspace settings → Skills → upload `media-workspace-ui.zip` from the latest release. Paste `skills/media-workspace-ui/AGENTS.snippet.md` into Workspace Knowledge. |
| **Claude app** | An org owner uploads `media-workspace-ui.zip` (latest release) as an organization skill. |

### Updating

```bash
npx github:rdThunderThailand/-thunder-design-system   # refreshes AGENTS.md section and skill
npm update @rdthunderthailand/mw-theme
```

## Change the design system

1. Edit `skills/media-workspace-ui/tokens.json` (colors, radius, sizes) or the skill docs.
2. `npm run build:tokens` regenerates the theme files and the copies inside the skill.
3. `npm test` checks that everything is in sync and that no color is used that is not a token.
4. Open a PR. CI builds the package, compiles Tailwind v3 and v4, and runs the setup CLI in a fresh project.
5. Release: bump `packages/mw-theme/package.json` version, merge, then `git tag vX.Y.Z && git push origin vX.Y.Z`. The release workflow publishes the package and attaches `media-workspace-ui.zip`.

Hand-written: `packages/mw-theme/src/antd.ts` (token → antd mapping) and `src/icons.tsx` (concept → icon map). Everything else in `packages/mw-theme/src` and `skills/media-workspace-ui/assets/code` is generated.

## Open design decisions

See `skills/media-workspace-ui/references/token-conflicts.md`. The approved Overview screen uses colors that differ from the Semantic Colors page; agents follow `tokens.json` until design decides.
