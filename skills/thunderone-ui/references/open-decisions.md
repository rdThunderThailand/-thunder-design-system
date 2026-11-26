# Open design decisions

Until design decides, agents follow `tokens.json` and mention the decision ID in their reply (DS-14).
A review that finds one of these on a screen reports it as **Decision needed**, not as a defect.
Each open item has a matching comment tagged `[DS 1.0 sync]` in the Figma [DS] file; close the OD here when the comment is resolved.
IDs are never reused. Resolved items stay listed so old QC reports still resolve.

## Resolved in 1.0 (Figma "[DS] - Design System" v2)

| ID | Was | Resolution |
|---|---|---|
| OD-01 | Approved Media screen did not use the semantic tokens | The design system now uses the values from the Lovable code (`foreground` #0F1727, `border` #DCE2E9, `success` #0FA44D …). The old "Semantic Colors" page values are retired. |
| OD-02 | Brand blue #286EF9 not in the primitive ramp | Decision 2026-11-13: UI primary stays #286EF9; logo blues stay in the logo files; no primitive ramp is shipped. |
| OD-03 | Type scale not confirmed | 12 Manrope text styles + extra label/caption styles in Figma (`foundations.md`). |
| OD-04 | Icon maps not signed off (Ant Design) | Library is now lucide, from the Figma Icons page. Workspace icons that Figma marks as assumptions are flagged in each profile. |
| OD-05 | No Thai typeface | **Anuphan**, decided 2026-11-22, with Thai line heights per style. |

## Resolved 2026-11-26 (design replies to the `[DS 1.0 sync]` comments)

| ID | Was | Resolution |
|---|---|---|
| OD-08 | Checkbox radius 8px renders round | Square with **4px** corners, all variants. Literal `rounded-[4px]` (no `radius/xs` token; adding one is a separate major decision). |
| OD-11 | No input error state | `State=Error` = `border-destructive` + `aria-invalid="true"`. Message = sibling **Form/Error text**: Body/Small 12px, `text-destructive`, optional leading icon. Same for Textarea and Select (`components.md`). |
| OD-12 | Two reds | Keep both names; both are **#E7000B** (the only red passing 4.5:1 with white text, 4.77:1). `danger-soft` / `danger-foreground` unchanged. |
| OD-13 | Icon set gaps | Added `pencil`, `trash-2`, `refresh-cw`, `external-link`, `cloud-upload`, `lightbulb`, `arrow-right` and Help `book-open`, `wrench`, `file-text`, `life-buoy`. No language-switch icon (no language switch in MVP). |
| OD-14 | StatusBadge tones vs 0.x | Five tones, `rounded-md` (no pill). `scheduled`, `processing`, `in-progress` = **info**, told apart by icon + label. Purple in-progress deprecated. |

## OD-06 Public page shell
Platform pages that work without a session and have no sidebar (Help Center Home, Search, Article) are not specified: header content for signed-out visitors, reading width (use `max-w-measure` 720 meanwhile) and article typography.

## OD-07 Dark mode not approved
Figma has dark values for every color, marked "untuned shadcn default — NOT approved, not published". Ship light only (DS-06). `tokens.json` does not carry the dark values until design tunes them.

## OD-09 Content margin at 1024
The Grid standard (2026-11-22) says margin 16 and gutter 12 at 1024; the App shell code uses `px-6` (24) from 640 up. Follow the Grid standard for new layouts (`lg:px-4 xl:px-6` is not in code yet) and mention OD-09.

## OD-10 Literal sizes in the Lovable code
Decided 2026-11-26, code still to change: sidebar group label `text-[9px]` → 10px Label/Type label; Button sm icons 14/12 → 16; search kbd stays a literal 4px (`rounded-[4px]`); the user chip becomes a button with a menu of Account and Sign out only (no language switch); collapsed nav items get Tooltip + `aria-label`, the collapse toggle gets `aria-expanded`. Still open: activity tile radius 4px and the dashboard thumbnail title at 20 Bold (no such style). Whether to add a `radius/xs` (4px) token is a separate major decision.

