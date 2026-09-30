---
name: media-workspace-ui
description: Use when building or editing any screen, component or page for the Media Workspace product (channels, screens, TV, PA/audio, kiosks, programs, playlists, media library, monitoring, alerts). Enforces the company design system from Figma "Rev.2 - Media Workspace / DS Media Workspace".
---

# Media Workspace UI

Source of truth: Figma file `opERvqzEvbeU8uuwMQmc4v`, page "DS Media Workspace" (node 2019:3303).
Reference screen: "1920w light" (node 2019:3868), status **DESIGN APPROVED**.

## Non-negotiable rules

1. Never hardcode colors, font sizes, radii or shadows. Use tokens from `tokens.json` (CSS variables `--mw-*`).
2. Reuse the app shell (sidebar + header) exactly as specified below. Do not invent new navigation.
3. Every status must use the status system (online / warning / offline / live). Never color-code status ad hoc.
4. Spacing uses the 4px scale. Allowed gaps: 4, 8, 12, 16, 24. Default gap between cards is **12px**.
5. Light theme first. Only add dark mode if dark tokens exist in `tokens.json`.
6. Time is shown in 24h format (`09:00`, `10:15`) and the footer states the time zone (default `Asia/Bangkok (UTC+7)`).
7. If a component exists in the shared library, import it. Do not rebuild it inline.
8. Font is **Manrope** everywhere. Never fall back to Inter, SF Pro or the Ant Design default.
9. If a value is disputed in `references/token-conflicts.md`, use the tokens.json value and mention the conflict in your reply.
10. Icons come only from `@ant-design/icons` (Outlined by default). Use the concept → icon map in `references/icons.md`.
11. Logos come only from the SVG files in `assets/brand/`. Follow `references/brand.md`. Never recolor, stretch or retype the wordmark.

## Token quick reference

| Use | Token | Value |
|---|---|---|
| App background | `color.bg.primary` | #F9FAFB |
| Card / sidebar surface | `color.surface.default` | #FFFFFF |
| Muted fill (segmented track, icon box) | `color.bg.primary-strong` | #F3F4F6 |
| Primary / secondary / muted text | `color.text.primary / secondary / tertiary` | #111827 / #374151 / #9CA3AF |
| Borders | `color.border.default` | #D1D5DB |
| Brand, primary button, active nav text | `color.action.primary` | #286EF9 (hover #0551DE, pressed #0444BB) |
| Active nav background | `color.action.subdued-menu` | #E9F4FF |
| Focus ring | `color.border.focus` | #0444BB |
| Online / Live | `color.status.success` (+ `-bg`) | #10B981 / #ECFDF5 |
| Warning | `color.status.warning` (+ `-bg`) | #F59E0B / #FFFBEB |
| Offline / error | `color.status.error` (+ `-bg`) | #EF4444 / #FEF2F2 |
| Card radius | `radius.xl` | 16px |
| Input, search, icon box, primary nav | `radius.lg` | 12px |
| Nav item, segmented item | `radius.md` | 10px |
| Badges and tags | `radius.pill` | 9999px |
| Card shadow | `shadow.card` | 0 1px 2px rgba(15,23,39,.04) |

### Theme: install the package, never write your own

The theme ships as **`@rdthunderthailand/mw-theme`** (GitHub Packages). Check `package.json`; if it is missing, install it (`npm i @rdthunderthailand/mw-theme`, the project's `.npmrc` must map `@rdthunderthailand` to `https://npm.pkg.github.com`). Never ship the stock Ant Design #1677FF theme or the Tailwind default palette.

| Stack | Wire it at the app root |
|---|---|
| **Ant Design v5** (Figma component library) | `import { mwTheme } from '@rdthunderthailand/mw-theme/antd'` → `<ConfigProvider theme={mwTheme}><App>…</App></ConfigProvider>`, plus `import '@rdthunderthailand/mw-theme/global.css'` |
| **Tailwind v3 / shadcn** (Lovable default) | `presets: [require('@rdthunderthailand/mw-theme/tailwind/preset')]` + `@import '@rdthunderthailand/mw-theme/tailwind/shadcn.css'` at the top of `src/index.css`. See `references/tailwind.md` |
| **Tailwind v4** | `@import "tailwindcss";` then `@import "@rdthunderthailand/mw-theme/tailwind/v4.css";` |

What the package exports:

| Import | Contents |
|---|---|
| `@rdthunderthailand/mw-theme/antd` | `mwTheme` (ConfigProvider theme), `mwStatus` (channel state → Badge status + colors), `mwTokens` |
| `@rdthunderthailand/mw-theme/icons` | `MwIcon` concept → icon map, `channelTypeIcon`. Import icons from here |
| `@rdthunderthailand/mw-theme/tokens` | `mwTokens`: raw values for charts and custom CSS |
| `@rdthunderthailand/mw-theme/global.css` | Manrope, `--mw-*` CSS variables, scrollbars, `.mw-scroll-quiet`, `.mw-scroll-x` |
| `@rdthunderthailand/mw-theme/brand/*.svg` | ThunderOne logos |

**Can't install packages** (Lovable without registry access, a quick prototype): copy the same files from `assets/code/` (`antd-theme.ts` + `mw-tokens.ts`, `mw-icons.tsx`, `mw-global.css`, `tailwind/`). They are identical copies, synced automatically.

**Changing a token:** edit `tokens.json` in the design system repo, run `npm run build:tokens`, commit, and release. Never edit generated files or the copies in a project.

## App shell (desktop 1920w)

| Region | Spec |
|---|---|
| Sidebar (`aside`) | width 224 (223 + 1px right border). Logo block height 68 with bottom border. Collapse button pinned bottom (block height 57). |
| Nav item | height 32, inset 8px left/right (width 207), icon 16 at x12, label at x40. Primary item ("Overview") height 40. |
| Nav group label | uppercase, bold, muted (`text.secondary`), 20px left inset, 20px above first item. Groups: Content, Programming, Channels, Monitoring, Reports & analytics, Settings. |
| Nav count badge | pill, height ~15, right-aligned (e.g. Alerts "12"). |
| Header | height 69, horizontal padding 24. Left: H1 title + one-line muted subtitle. Center: search 448×36 with `⌘K` hint. Right: date-range button (h32), notifications icon button 36×36 with 8px dot, help icon, user block (32 avatar with initials + name + role). |
| Main content | padding 24 left/right, 20 top. Max content width 1648 at 1920w. |
| Footer bar | small muted text: auto-refresh state with status dot, "Last updated: HH:MM:SS", time zone right-aligned. |

See `references/patterns.md` for page-level patterns and `references/components.md` for component specs.

## Grid

- KPI row: 5 cards × 320px, gap 12, height 140.
- Main dashboard grid: 3 columns (≈ 566 / 467 / 590 at 1648 wide), gap 12. Use CSS grid with `fr` units, not fixed pixels.
- Below 1280px: collapse to 2 columns; below 768px: 1 column, sidebar becomes a drawer.

## Card (base surface)

- White surface, radius 16, `shadow.card`, padding 16 + 1px border (content starts at 17).
- Header is translucent: `rgba(249,250,251,.95)` with `backdrop-filter: blur(4px)`, sticky on scroll.
- Card title (H2) top-left; optional "View all … →" link button top-right, aligned to title baseline.
- Content starts 12px below title row (y≈45).
- Lists inside cards use full-width rows separated by 1px horizontal borders.

## Scrolling

- Only the page scrolls vertically. The sidebar is sticky with its own nav scroll area; hide that scrollbar until hover (`scrollbar-gutter: stable` so items don't shift).
- All scrollbars are thin and token-colored: thumb `color.border.default`, hover `color.text.tertiary`, transparent track, pill radius. Never leave the OS default scrollbar.
- Tables must not scroll sideways on desktop. Hide lower-priority columns based on the **card's** width (ResizeObserver), not the window width, because the sidebar takes 224px. Suggested order to drop: Uptime (<1040px) → Now playing (<880px) → Type (<600px) → Status and heartbeat fold under the channel name (<520px).
- Horizontal chip/segmented rows on phones scroll with the scrollbar hidden and a fade mask on the right edge.

## Workflow for the agent

1. Identify which page pattern applies (`references/patterns.md`).
2. Load tokens from `tokens.json`; map to Tailwind/CSS variables if the stack uses them.
3. Build with existing components first; list any missing component in your reply instead of silently inventing one.
4. Before finishing, run the checklist below.

## Pre-merge checklist

- [ ] No raw hex/rgb, no arbitrary px font sizes
- [ ] Status colors come from `status.*` tokens
- [ ] Cards: 16px padding, 12px gap, 1px border
- [ ] Sidebar 224 / header 69 unchanged
- [ ] Empty, loading and error states exist for every data card
- [ ] Icons are 16 (nav, buttons), 14 (inline rows), 12 (link arrows), 20 (type tiles), all from `@ant-design/icons`
- [ ] Logo is an imported SVG from `assets/brand/` with the correct light/dark variant
- [ ] Interactive elements have visible focus states and ≥ 32px hit height
