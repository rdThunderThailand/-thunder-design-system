# Migrating to 1.0

1.0 rebuilds the design system from Figma **"[DS] - Design System"** (`kW5RDAy0BZ4Muj9RU3dPgC`), which was built from the Lovable code. It is a breaking release: the stack is **shadcn/ui + Tailwind + lucide-react** only, and token names follow shadcn.

## 1. Re-run setup and update the package

```bash
npx github:rdThunderThailand/-thunder-design-system --workspace <media|asset|help>
npm i @rdthunderthailand/thunderone-theme@^1 lucide-react
```

## 2. Removed

| 0.x | 1.0 |
|---|---|
| `…/antd` (`t1Theme`, `t1Status`, `mwTheme`, `mwTokens`) | Removed. Ant Design is not supported. Move screens to shadcn/ui components. |
| `…/global.css`, `--t1-*` / `--mw-*` variables | Removed. Use the Tailwind theme (`…/tailwind/v4.css` or preset + `shadcn.css`); raw values in JS from `t1Tokens`. |
| `T1Icon` with `@ant-design/icons` | `T1Icon` with `lucide-react` (keys changed, see below). |
| `MediaIcon`, `mediaStatus`, `mwStatus`, `MwIcon` | `MediaIcon` (lucide, fewer keys), `mediaStatusTone`, `channelTypes`, `channelTypeIcon` (keys `Screens` / `TV` / `PA / Audio` / `Kiosks`). |
| Primitive ramp classes `bg-t1-blue-500` … | Removed. Use semantic classes or `chart-1…5`. |
| `.mw-scroll-quiet`, `.mw-scroll-x`, `.mw-num` | `.t1-scroll-quiet`, `.t1-scroll-x`, `.t1-num` (the `.mw-*` aliases are gone). |
| `in-progress` status (purple) | Removed. Five tones: success, warning, danger, info, neutral. `in-progress`, `processing` and `scheduled` all map to **info**; tell them apart by icon + label. |

## 3. Renamed classes (Tailwind)

| 0.x | 1.0 |
|---|---|
| `bg-success-muted`, `bg-warning-muted`, `bg-error-muted`, `bg-info-muted` | `bg-success-soft`, `bg-warning-soft`, `bg-danger-soft`, `bg-info-soft` |
| `text-error`, `bg-error` | `text-danger`, `bg-danger` |
| `rounded-card` / `rounded-control` / `rounded-nav` / `rounded-pill` | `rounded-xl` / `rounded-lg` / `rounded-md` / `rounded-full` (badges are `rounded-md` now) |
| `h-control` (32) / `h-nav` | Button sizes (`h-8` / `h-10` / `h-11`), nav item `h-8`, primary nav `h-10` |
| `text-page-title`, `text-kpi`, `text-label` | `text-title-page`, `text-display-kpi`, `text-body` / `text-label-sm` |
| `shadow-control`, `shadow-dropdown` | `shadow-float` (popover, toast), `shadow-dialog` |
| `bg-sidebar-accent` for the active nav item | `bg-primary-soft text-primary` |

## 4. Values that changed

| What | 0.x | 1.0 |
|---|---|---|
| Text / muted text | #111827 / #374151 | `foreground` #0F1727 / `muted-foreground` #5A6475 |
| Border | #D1D5DB | `border` #DCE2E9 |
| Success / warning / error | #10B981 / #F59E0B / #EF4444 | `success` #0FA44D / `warning` #E48300 / `danger` #E7000B (same red as `destructive`) |
| Info | #286EF9 | `info` #0086CF |
| Focus ring | #0444BB | `ring` #90A1B9 |
| Header height | 69 | 68 |
| Card gap (DS-05) | 12 | **16** |
| Thai font | none (OD-05) | Anuphan |
| Scheduled (Media) | info | warning |

## 5. Rule IDs
- DS-09 (Ant Design icons) is retired. Icons are **DS-15** (lucide). DS-16 is the responsive standard.
- OD-01 … OD-05 are resolved; OD-07 … OD-11 are new. See `references/open-decisions.md`.

## 6. T1Icon keys

Kept: `overview`, `search`, `notifications`, `help`, `close`, `success`, `warning`, `error`, `create`, `more`, `filter`, `settings`, `upload`, `linkArrow`, `back`, `calendar`, `time`, `activity`, `reports`.
Renamed: `collapse` → `collapseSidebar`, `expand` → `expandSidebar`, `user` → `users`.
Kept with a new icon: `edit` (`Pencil`), `delete` (`Trash2`), `refresh` (`RefreshCw`), `externalLink` (`ExternalLink`).
New: `menu`, `info`, `loading`, `empty`, `adjust`, `download`, `archive`, `check`, `next`, `forward`, `disclose`, `conceal`, `folder`, `cloudUpload`, `tip`.
Removed: `language` (the MVP has no language switch), `analytics`, `brandAssets`, `designSystem` (Media icons now live in `MediaIcon`). Ask design to add an icon before using one.

---

# (older) Migrating from `mw-theme` 0.1 / `media-workspace-ui` to 0.2

0.2 makes the design system company-wide. Media is now one Workspace profile among others.
Deprecated aliases keep a Media project working while you migrate. They are removed in the next major.

## 1. Re-run setup with the Workspace

```bash
npx github:rdThunderThailand/-thunder-design-system --workspace media
npx skills remove media-workspace-ui     # the old skill, so agents do not load both
```

## 2. Swap the package

```bash
npm uninstall @rdthunderthailand/mw-theme
npm i @rdthunderthailand/thunderone-theme
```

Then replace imports:

| 0.1 | 0.2 |
|---|---|
| `@rdthunderthailand/mw-theme/…` | `@rdthunderthailand/thunderone-theme/…` |
| `mwTheme` | `t1Theme` |
| `mwTokens` | `t1Tokens` |
| `mwStatus.online` (from `…/antd`) | `mediaStatus.online` (from `…/workspaces/media`) |
| `MwIcon.screen`, `MwIcon.playlists`, … | `MediaIcon.screen`, … (from `…/workspaces/media`) |
| `MwIcon.search`, `MwIcon.create`, `MwIcon.help`, … | `T1Icon.search`, … (from `…/icons`) |
| `MwIcon.online` / `MwIcon.noHeartbeat` | `MediaIcon.online` / `MediaIcon.noHeartbeat` (platform: `T1Icon.success`, `T1Icon.error`) |
| `channelTypeIcon` (from `…/icons`) | `channelTypeIcon` (from `…/workspaces/media`) |
| CSS `var(--mw-*)` | `var(--t1-*)` |
| `.mw-scroll-quiet`, `.mw-scroll-x`, `.mw-num` | `.t1-scroll-quiet`, `.t1-scroll-x`, `.t1-num` |
| Tailwind `bg-mw-blue-500` (primitive ramp) | `bg-t1-blue-500` |

Still working in 0.2 (deprecated): `mwTheme`, `mwTokens` from `…/antd`; `mwStatus`, `MwIcon` from `…/workspaces/media`; all `--mw-*` variables and `.mw-*` classes.
**Not** aliased: Tailwind `*-mw-*` primitive classes. Replace them before upgrading.

One-shot rename (review the diff before committing):

```bash
grep -rlE "mw-theme|mwTheme|mwTokens|--mw-|\.mw-|-mw-" src | xargs sed -i \
  -e 's#@rdthunderthailand/mw-theme#@rdthunderthailand/thunderone-theme#g' \
  -e 's/\bmwTheme\b/t1Theme/g' -e 's/\bmwTokens\b/t1Tokens/g' \
  -e 's/--mw-/--t1-/g' -e 's/\bmw-scroll-/t1-scroll-/g' -e 's/\bmw-num\b/t1-num/g' \
  -e 's/-mw-\(blue\|gray\|green\|red\|amber\|purple\|white\|black\)/-t1-\1/g'
```

`mwStatus` / `MwIcon` / `channelTypeIcon` move modules, so fix those imports by hand.

## 3. What else changed

- `tokens.json` no longer has `color.domain-status` or `size.kpi-card`. Media's mapping and KPI size are in `references/workspaces/media.md`.
- `references/token-conflicts.md` is now `references/open-decisions.md` (OD-01 = the old conflict table).
- Core rules have IDs (DS-01 … DS-14) and there is `references/review-checklist.md`.
