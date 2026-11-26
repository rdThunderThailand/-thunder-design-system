# Design system review checklist

Use before finishing any UI work, and as the design-system layer of a QC review.
Each item cites a core rule. Report results as PASS / GAP / NOT CHECKED, with the screen or file where it was seen.

Severity when reviewing:
- **P0**: breaks DS-01, DS-02, DS-03, DS-04, DS-10 or DS-11, or uses another Workspace's vocabulary, nav or icons.
- **P1**: breaks DS-05, DS-07, DS-08, DS-12, DS-13, DS-15, DS-16, or a Workspace profile rule.
- **P2**: spacing or size off by a few px, wording polish.
- **Decision needed**: the screen hits an item in `open-decisions.md` (OD-xx), or does something the design system does not cover.

## Tokens and theme
- [ ] DS-01 No raw hex/rgb, no arbitrary sizes, radii or shadows (`bg-[#…]`, `style={{ color: '#…' }}`, `text-[13px]`, `rounded-[6px]`).
- [ ] DS-02 Theme comes from `@rdthunderthailand/thunderone-theme` (or the synced copies). No stock shadcn zinc/slate variables, no Tailwind default palette classes (`bg-blue-500`, `text-gray-600`), no Ant Design.
- [ ] DS-06 No dark mode; no `.dark` block shipped.

## Shell and layout
- [ ] DS-03 App shell: sidebar 224 / 68 / drawer 256, brand header 68, header 68 sticky, `main` `px-6 py-5`, Page actions row, Status bar at the bottom with the standard wording.
- [ ] DS-03 Sidebar menu = the Workspace's own menu from its profile (no placeholder, no other Workspace's items). Collapse toggle in the footer, pinned.
- [ ] DS-03 Platform utilities (Help, Notifications, account) open from the header, not from a sidebar section or Workspace tile.
- [ ] DS-05 Tailwind 4px scale only; card gap 16; card `rounded-xl` + border + `shadow-panel`.
- [ ] DS-16 Works at 1280 × 800 without horizontal scroll; fluid content (no max-width container); KPI cards min 300 and wrapping; sidebar rail at 1024, drawer below.
- [ ] Tables never scroll sideways on desktop; columns drop by priority (profile order); text truncates with ellipsis in fixed-height rows.

## Status and taxonomy
- [ ] DS-04 Every state is a StatusBadge with a tone from `statusTone()` / the profile map. No new status colors; `destructive` is only for destructive actions.
- [ ] DS-04 Categories, types and tags use outline/secondary Badges or chart colors, never status tones.

## Components and states
- [ ] DS-08 shadcn `ui/*` and `design-system/*` components reused; any missing component is named, not invented.
- [ ] DS-11 Every data surface has LoadingState (skeleton), EmptyState (icon + line + next step) and ErrorState with Retry, at card level. No empty/error shown while loading.

## Type, icons, brand
- [ ] DS-07 Text-style classes (`text-title-page`, `text-body` …), Manrope + Anuphan; no Inter / Geist / SF Pro; `lang` set so Thai line heights apply; no uppercase or tracking on Thai text.
- [ ] DS-15 Icons only from `lucide-react`, from the Figma set, via `T1Icon` or the profile map; 16 default, stroke 2 (1.8 in sidebar nav).
- [ ] DS-10 Logo is an official SVG, correct light/dark variant, not recolored or retyped.

## Copy and access
- [ ] DS-12 Sentence case; exact profile vocabulary; 24h time; time zone where times matter; TH and EN both fit.
- [ ] DS-13 Visible focus ring, hit height ≥ 32, `aria-label` on icon-only buttons, collapsed nav items and the collapse toggle (+ `aria-expanded`).
- [ ] DS-14 Any disputed value follows `tokens.json` and the OD-xx is mentioned.

## Checking code quickly
```bash
# raw colors and arbitrary values in source
grep -rnE "#[0-9A-Fa-f]{3,8}\b|rgba?\(|oklch\(" src --include=*.{ts,tsx,css} | grep -v thunderone-theme
grep -rnE "\b(bg|text|border|ring|fill|stroke)-(slate|gray|zinc|neutral|stone|blue|red|green|amber|yellow|orange|purple)-[0-9]{2,3}\b|-\[#|text-\[[0-9.]+px\]|rounded-\[" src | grep -v 'rounded-\[4px\]'
# other icon libraries, antd, dark mode
grep -rnE "from ['\"](@ant-design/icons|antd|@heroicons|@mui/icons-material|react-icons)" src
grep -rnE "\.dark\s*\{|dark:" src
```
