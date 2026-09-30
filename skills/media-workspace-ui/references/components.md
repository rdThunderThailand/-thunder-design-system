# Components (from Figma "1920w light", node 2019:3868)

Sizes in px. Colors come from `tokens.json` — never inline them.

## Buttons
| Variant | Spec |
|---|---|
| Primary / Default | height 32–35, padding-x 12–13, icon 14 at left + 8 gap, optional 12px chevron for dropdown ("Create ▾"). Figma instance: `Default Button`. |
| Secondary / Ghost | height 32, same padding, subtle border. Figma instance: `Button`. |
| Icon button | 36×36, icon 16 centered. Notification variant has an 8px dot at top-right (x22, y6). |
| Link button | text 12, trailing 12px arrow icon, 4px gap. Used as "View all … →" in card headers. |
| Quick action tile | full-width button, height 58, padding 13, 32px icon container (icon 16) + label 12 at 12px gap. Laid out in a 2-column grid, gap 8. |

## Segmented control (filter tabs)
Container height 35, padding 4. Active segment height 27, padding-x 12, surface bg + shadow. Inactive = text only. Example: All channels / Screens / Audio.

## Search
448×36, 16px search icon at x12, placeholder at x37 ("Search anything…"), keyboard hint pill `⌘ K` (h 19.5) right-aligned 8px inset.

## KPI card
320×140. Label (H2 style) top-left; value 32px below; 32×32 icon container top-right (icon 16, tinted by status); caption at bottom-left ("90.3% of total"); 96×32 sparkline bottom-right.
Variant "rate": label + value + caption "vs yesterday" + delta pill (`↑ 1.2%`, h13) + 56×56 ring chart right.

## Status badge / pill
- Live: height 16, padding-x 6, 6px dot + text 9–10.
- Channel-type tag: bordered pill, height 18, padding-x 9, text 9 (Screen, TV, PA, Kiosk).
- Count badge (nav): height ~15, padding-x 6.

## Alert row ("Needs attention")
Height 57, 1px bottom border. 28×28 tinted icon container (icon 14) → title 12 (format `Location · Device`) + subtitle 11 muted → relative time right ("5m ago") → channel-type tag.

## Schedule row (timeline)
Height 43. 8px status dot on a 1px vertical timeline line (x22) → time `HH:MM` → title 12 + "Program" caption 10 → right side: Live badge or "N channels".

## Activity row
24×24 icon container (icon 14) → sentence 11 with quoted entity names (“Lunch Promotion”) + actor/location caption 10 → time right-aligned.

## Channel health bars
Status dot 6 + label + right-aligned "count (pct%)" → 4px progress bar full width below. Paired with a 104×104 donut showing total in center.

## Channel type tile
~102×115 bordered tile, centered: icon 20, label, count 24px, "N online", "N issues" (issues tinted warning when > 0).

## Program preview thumbnail
112×84 rounded, gradient background, overlay text "Live broadcast" + title. Program stats strip below content: 4 columns (Screens / TV / PA / Kiosk) each with icon 14 + count.

## User block
32 avatar with initials → name 12 + role 10 muted.

## Icons
`@ant-design/icons` only. See `icons.md` for rules and the concept → icon map. Sizes: 12 link arrows, 14 inline rows, 16 nav/buttons, 20 type tiles.
