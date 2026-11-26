---
name: thunderone-ui
description: Use when building, editing or reviewing any screen, component or page of a ThunderOne product, in any Workspace (Media, Asset, Help, or a new one). Enforces the company design system (shadcn/ui + Tailwind tokens, app shell, components, lucide icons, Manrope/Anuphan type, brand, copy) and loads the matching Workspace profile for domain vocabulary, navigation, icons and status mapping.
---

# ThunderOne UI

One design system for every ThunderOne Workspace. Stack: **shadcn/ui + Tailwind (v4) + lucide-react**, built from the Lovable code.
Design source: Figma **"[DS] - Design System"** (`kW5RDAy0BZ4Muj9RU3dPgC`). The core below applies everywhere. Domain detail lives in a **Workspace profile**.

## Step 0: pick the Workspace profile

1. Find the Workspace this work belongs to: the project's `AGENTS.md` line `ThunderOne workspace: <key>`, the user's request, or the product docs.
2. Read `references/workspaces/<key>.md`. Available: `media`, `asset`, `help`.
3. No profile for that Workspace? Use the core only, say so in your reply, and copy `references/workspaces/_template.md` if the user wants one. Never borrow another Workspace's vocabulary, nav items, icons or status mapping.
4. A profile can add detail. It can never override a core rule (DS-xx). If it seems to, follow the core and report the conflict.

## Core rules (non-negotiable)

Each rule has an ID so reviews can cite it. Retired IDs are never reused.

- **DS-01 Tokens only.** Never hardcode colors, font sizes, radii or shadows. Use the theme classes (`bg-primary`, `text-muted-foreground`, `rounded-xl`, `shadow-panel`, `text-title-page`). Values live in `tokens.json`.
- **DS-02 Theme from the package.** Use `@rdthunderthailand/thunderone-theme`. Never ship stock shadcn colors (zinc/slate), the Tailwind default palette (`bg-blue-500`, `text-gray-600`) or arbitrary values (`bg-[#…]`, `text-[13px]`). Only exception: `rounded-[4px]` on checkbox and kbd.
- **DS-03 Platform shell.** Use the App shell exactly as in `references/shell.md`: Sidebar (Menu slot) + Top header + Page actions + content + Status bar. Do not invent new navigation. Menu **contents** come from the Workspace profile.
- **DS-04 Status system.** Every state uses one of five tones (success / warning / danger / info / neutral) through the core map or the profile's mapping. Never color-code status ad hoc, and never use status colors for taxonomy (categories, types, tags).
- **DS-05 Spacing.** Tailwind 4px scale only. Card gap is **16** everywhere (between cards in a row, between wrapped rows, between stacked cards). Content padding 24 / 20 top.
- **DS-06 Light theme only.** Dark values exist in Figma but are not approved (OD-07). Do not ship dark mode; delete shadcn's `.dark` block.
- **DS-07 Typography.** Manrope for Latin, **Anuphan** for Thai, through the text-style classes (`text-title-page`, `text-body`, `text-label-xs` …). Thai gets taller line heights automatically under `lang="th"`. Never Inter, SF Pro or the shadcn default.
- **DS-08 Reuse components.** Use the shadcn components in `src/components/ui/*` and the shared `design-system/*` components (`references/components.md`). If one is missing, name it in your reply instead of inventing a style.
- **DS-09** *Retired in 1.0* (was: Ant Design icons). See DS-15.
- **DS-10 Brand.** Logos only from the official SVGs (`assets/brand/`). Follow `references/brand.md`. Never redraw, recolor, stretch or retype the wordmark.
- **DS-11 States.** Every data surface has loading (skeleton), empty, and error-with-retry states, at card level so one card can fail without blanking the page. Never show empty or error while loading.
- **DS-12 Copy.** Sentence case, 24h time, UI terms exactly as the Workspace profile. See `references/patterns.md`.
- **DS-13 Accessibility.** Visible focus ring (`ring-ring`), hit height ≥ 32, `aria-label` on icon-only buttons and on collapsed sidebar items.
- **DS-14 Disputed values.** If a value is listed in `references/open-decisions.md`, use the `tokens.json` value and mention the open decision in your reply.
- **DS-15 Icons.** `lucide-react` only, from the Figma icon set (`references/icons.md`), through `T1Icon` or the profile's icon map. Size 16 by default (`size-4`), stroke 2. No other icon library.
- **DS-16 Responsive standard.** Design at 1920; 1280×800 must fully work. Content is fluid (no max-width container). Follow the breakpoint table in `references/foundations.md`.

## Token quick reference (Tailwind class → value)

| Use | Class | Value |
|---|---|---|
| App background | `bg-background` | #F9FAFB |
| Card / popover / sidebar surface | `bg-card` / `bg-popover` / `bg-sidebar` | #FFFFFF |
| Text / muted text | `text-foreground` / `text-muted-foreground` | #0F1727 / #5A6475 |
| Muted fill (tabs track, icon tile, skeleton row) | `bg-muted` | #F0F3F7 |
| Border / input border / subtle divider | `border-border` / `border-input` / `border-border-subtle` | #DCE2E9 / #DCE2E9 / #E8EBF1 |
| Brand, primary button, active nav text | `bg-primary` / `text-primary` | #286EF9 |
| Active nav background, soft brand fill | `bg-primary-soft` | #E9F4FF |
| Focus ring | `ring-ring` | #90A1B9 |
| Success / warning / danger / info | `text-success` + `bg-success-soft` … | #0FA44D / #E48300 / #E7000B / #0086CF |
| Destructive button, form error | `bg-destructive` / `border-destructive` | #E7000B (same red as `danger`) |
| Modal scrim | `bg-overlay/60` | #03060D |
| Radius: badge, input, nav item / button, icon tile / card | `rounded-md` / `rounded-lg` / `rounded-xl` | 10 / 12 / 16 |
| Shadow: card / popover, toast, hover / dialog | `shadow-panel` / `shadow-float` / `shadow-dialog` | 4% / 12% / 18% |
| Shell sizes | `w-sidebar` `w-sidebar-collapsed` `h-header` | 224 / 68 / 68 |

Full tables (charts, sidebar vars, type scale, grid): `references/foundations.md`.

## Theme: install the package, never write your own

Check `package.json`. If `@rdthunderthailand/thunderone-theme` is missing, install it with `lucide-react` (the project's `.npmrc` must map `@rdthunderthailand` to `https://npm.pkg.github.com`).

| Stack | Wire it |
|---|---|
| **Tailwind v4** (Lovable today) | Main CSS: `@import "tailwindcss";` then `@import "@rdthunderthailand/thunderone-theme/tailwind/v4.css";`. Delete the project's own `:root` / `.dark` / `@theme` color blocks. |
| **Tailwind v3** (older projects) | `presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]` + `@import '@rdthunderthailand/thunderone-theme/tailwind/shadcn.css';` first in `src/index.css`. |

| Import | Contents |
|---|---|
| `…/icons` | `T1Icon` (platform concept → lucide icon), `t1IconSize` |
| `…/status` | `statusTone(state, extra?)`, `t1Status` (tone → badge classes + colors) |
| `…/tokens` | `t1Tokens`: raw values for charts and canvas |
| `…/workspaces/<key>` | Workspace extras, e.g. `…/workspaces/media`: `mediaNav`, `mediaStatusTone`, `channelTypeIcon`; `…/workspaces/asset`: `assetNav`, `AssetIcon` |
| `…/brand/*.svg` | ThunderOne logos |

**Can't install packages** (Lovable without registry access, a quick prototype): copy the same files from `assets/code/`. They are identical copies, synced automatically. Setup details: `references/tailwind.md`.

**Changing a token:** edit `tokens.json` in the design system repo, run `npm run build:tokens`, commit and release. Never edit generated files or the copies in a project.

## Shell at a glance (details: `references/shell.md`)

| Region | Spec |
|---|---|
| Sidebar | 224 expanded (≥ 1280) / 68 icon rail (1024–1279) / 256 drawer (< 1024). Brand header 68 + Nav (scrolls, Menu slot) + footer collapse toggle (pinned). |
| Top header | 68, sticky, `bg-background/95` + blur, border-b. Title + subtitle · search (md+) · date/period · notifications · help · user chip (xl+, button → Account / Sign out). |
| Main | `px-6 py-5` (`px-4` below sm). Page actions row (left slot + Create) → content → Status bar (fixed bottom, every Workspace). Only the content area scrolls. |

## Workflow

1. Step 0: load the Workspace profile.
2. Pick the page pattern (`references/patterns.md`, then the profile).
3. Build with existing components (`references/components.md`) inside the shell (`references/shell.md`).
4. Run `references/review-checklist.md` before finishing. List anything that fails or is missing.
