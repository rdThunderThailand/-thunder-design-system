# Migrating from `mw-theme` 0.1 / `media-workspace-ui` to 0.2

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
