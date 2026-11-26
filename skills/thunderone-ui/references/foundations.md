# Foundations

Source: Figma "[DS] - Design System" (`kW5RDAy0BZ4Muj9RU3dPgC`), page **Foundations**:
"Foundations — Thunder One v2" (built 2026-11-13 from the Lovable `src/styles.css`) and "Foundations — Grid / Breakpoints" (**official standard, approved 2026-11-22**, node `120:2`).
Values below are generated into the theme from `tokens.json`. Use the class, never the value (DS-01).

## Color (light)

Names are the shadcn variable names in Figma and code. Class = `bg-<name>`, `text-<name>`, `border-<name>`.

| Group | Token | Hex | Use |
|---|---|---|---|
| Base | `background` / `foreground` | #F9FAFB / #0F1727 | App background, default text |
| | `card` / `card-foreground` | #FFFFFF / #020618 | Cards |
| | `popover` / `popover-foreground` | #FFFFFF / #020618 | Menus, popovers |
| | `surface-subtle` / `surface-raised` | #F5F7F9 / #FFFFFF | Quiet panels / raised surfaces |
| Brand | `primary` / `primary-foreground` | #286EF9 / #FFFFFF | Primary button, links, active nav text |
| | `primary-soft` | #E9F4FF | Active nav item, "New" badge, soft brand tiles |
| | `brand-navy` | #010F29 | Logo navy only (brand, not UI text) |
| Neutral | `secondary` / `secondary-foreground` | #F1F5F9 / #0F172B | Secondary button |
| | `muted` / `muted-foreground` | #F0F3F7 / #5A6475 | Tabs track, icon tiles, captions, placeholders |
| | `accent` / `accent-foreground` | #F1F5F9 / #0F172B | Menu item focus/hover |
| Lines | `border` | #DCE2E9 | Card, table and shell borders |
| | `border-subtle` | #E8EBF1 | Row dividers inside cards |
| | `input` | #DCE2E9 | Input, select, textarea border; switch track off |
| | `ring` | #90A1B9 | Focus ring |
| Status | `success` / `success-soft` | #0FA44D / #E0FAE4 | DS-04 tones |
| | `warning` / `warning-soft` | #E48300 / #FFF2D4 | |
| | `danger` / `danger-soft` / `danger-foreground` | #E7000B / #FFE9E6 / #FFFFFF | Same red as `destructive` (design 2026-11-26: only red that passes 4.5:1 with white, 4.77:1) |
| | `info` / `info-soft` | #0086CF / #E4F7FF | |
| Action | `destructive` / `destructive-foreground` | #E7000B / #F8FAFC | Destructive actions and error text/borders. Two names, one red: use `destructive` for actions and form errors, `danger` for status |
| Scrim | `overlay` | #03060D | Modal and drawer backdrop, used with opacity (`bg-overlay/60`) |
| Chart | `chart-1` … `chart-5` | #F54900 #009689 #104E64 #FFB900 #FE9A00 | Category charts only; never status |
| Sidebar | `sidebar` `sidebar-foreground` `sidebar-primary` `sidebar-primary-foreground` `sidebar-accent` `sidebar-accent-foreground` `sidebar-border` `sidebar-ring` | #FFFFFF #020618 #0F172B #F8FAFC #F1F5F9 #0F172B #E2E8F0 #90A1B9 | shadcn Sidebar component |
| Other | `program` | #00214B | Deep navy thumbnail background (see workspaces/media.md) |

Neutral status tone = `bg-muted text-muted-foreground`.
Dark values exist in Figma but are not approved (OD-07). Logo blues (#0551DE, #0444BB, #0C60FA) and #374151 stay inside the logo files; they are not tokens (decision 2026-11-13).

## Typography

Font stack `'Manrope', 'Anuphan', system-ui, sans-serif`. Manrope has no Thai glyphs, so Thai characters render in **Anuphan**, the official Thai pair (decided 2026-11-22). Both are loaded by the theme CSS (Google Fonts).

Use the class `text-<style>`. It sets size, line height, weight and tracking. Under `lang="th"` (set it on `<html>` for Thai screens, or on the element) the same class switches to the Thai line height and weight. Thai never uses uppercase or tracking; the caps label classes drop them automatically.

| Class | Figma style | EN size / line / weight | TH line / weight | Use |
|---|---|---|---|---|
| `text-display-kpi` | Display/KPI value | 24 / 32 / 700 | 36 / 700 | KPI numbers |
| `text-title-page` | Title/Page | 20 / 28 / 800, −2.5% | 32 / 700 | Page H1 |
| `text-heading-large` | Heading/Large | 18 / 28 / 700 | 32 / 700 | Large section headings |
| `text-heading-dialog` | Heading/Dialog | 18 / 18 / 600 | 28 / 600 | Dialog title |
| `text-heading-section` | Heading/Section | 16 / 24 / 700 | 28 / 700 | Section headings |
| `text-title-card` | Title/Card | 14 / 20 / 700 | 24 / 700 | Card titles |
| `text-body` | Body/Default | 14 / 20 / 400 | 24 / 400 | Body, table cells |
| `text-body-sm` | Body/Small | 12 / 16 / 400 | 20 / 400 | Descriptions, subtitles |
| `text-label-sm` | UI/Label sm Semibold | 14 / 20 / 600 | 24 / 600 | Button labels (default, lg) |
| `text-label-xs` | UI/Label xs Semibold | 12 / 16 / 600 | 20 / 600 | Button sm, chips |
| `text-ui` | UI/Default | 11 / 16 / 400 | 20 / 400 | Dense UI text |
| `text-caption-2xs` | Caption/2xs | 10 / 14 / 400 | 18 / 400 | Meta, timestamps |
| `text-caption-9` | Caption/9 | 9 / 13.5 / 400 | 16 / 400 | Dense dashboard meta |
| `text-caption-3xs` | Caption/3xs | 8 / 12 / 400 | 16 / 400 | Tiny badges |
| `text-label-section` + `uppercase` | Label/Section | 11 / 16 / 800, 8% | 20 / 700, no caps | Dashboard section headers |
| `text-label-type` + `uppercase` | Label/Type label | 10 / 14 / 700, 8% | 18 / 700, no caps | Nav group labels, workspace name |

Medium (500) variants of the label styles exist in Figma (`font-medium` on `text-label-sm` / `text-label-xs`). Semibold and Bold variants of Caption styles: add `font-semibold` / `font-bold`.
Plain Tailwind sizes (`text-sm`, `text-xs`) appear in shadcn component code; keep them inside those components, use the text-style classes in screens.

## Radius

`--radius` = 12px. `rounded-sm` 8 · `rounded-md` 10 · `rounded-lg` 12 · `rounded-xl` 16 · `rounded-2xl` 20 · `rounded-3xl` 24 · `rounded-4xl` 28 · `rounded-full`.

| Radius | Used by |
|---|---|
| `rounded-md` (10) | Input, select, textarea, badge, button sm, nav item, tabs trigger, tooltip |
| `rounded-lg` (12) | Button default/lg, icon button, tabs list, search, icon tiles, dialog, toast |
| `rounded-xl` (16) | Card |
| `rounded-full` | Avatar, switch, radio, status dot, nav count badge |

## Elevation

| Class | Value | Use |
|---|---|---|
| `shadow-panel` | 0 1 2 0 foreground @ 4% | Card, active tab, segmented active |
| `shadow-float` | 0 14 36 0 foreground @ 12% | Card hover, popover, toast, tooltip, switch thumb |
| `shadow-dialog` | 0 24 60 0 foreground @ 18% | Dialog, Create popup |

## Spacing

Tailwind 4px scale (`calc(var(--spacing) * n)`): 0, px, 0.5 (2), 1 (4), 1.5 (6), 2 (8), 2.5 (10), 3 (12), 3.5 (14), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64).
Layout constants: shell header 68 (`h-header`), summary card 88.
**Card gap 16 (`gap-4`) in every Workspace.** Card padding 16 (`p-4`) for dashboard cards, 24 (`p-6`) for the shadcn `Card` header/content.

## Grid and breakpoints (DS-16, official 2026-11-22)

| Viewport | Role | Sidebar | Margin | Columns · gutter | Content width | KPI row |
|---|---|---|---|---|---|---|
| 1920 × 1080 | Primary design size (main, Thai) | Expanded 224 (fixed) | 24 | 12 · 16 | 1648 fluid (no max) | 5-up (min card 300) |
| 1440 × 900 | Supported option | Expanded 224 | 24 | 12 · 16 | 1168 fluid | 5-up |
| 1280 × 800 | **Minimum desktop, must fully work** | Expanded 224 | 24 | 12 · 16 | 1008 fluid | 3-up, wraps (3 + 2) |
| 1024 | Small desktop / tablet | Collapsed icon rail 68 | 16 (OD-09) | 12 · 12 | 924 fluid | 3-up, wraps |
| 390 | Mobile, field pages only | Drawer (hamburger) | 16 | 4 · 12 | 358 | 1-up stack |

Column width = (content − 11 × gutter) / 12. No grid styles in Figma; use CSS grid with `fr` or `minmax(300px, 1fr)`.

Code breakpoints: `xs` 480 (custom), `sm` 640, `md` 768, `lg` 1024 (sidebar inline vs drawer; header title vs menu button), `xl` 1280 (user chip, KPI 5 columns, dashboard 3 columns).

Layout rules:
1. Content is fluid full width at 1920. No 1600px container cap. Use the space for more data, not wider whitespace.
2. Long text blocks (descriptions, help, form intros, empty-state copy) cap at ~720px (`max-w-measure`).
3. Sidebar stays expanded (224) at ≥ 1280, collapses to the 68px icon rail at 1024, becomes a drawer at 390.
4. KPI / summary rows wrap with a 300px minimum card: 5-up at 1920 and 1440, 3-up at 1280 (second row fills), row gap 16.
5. Tables gain columns as width grows (priority: identity → status → owner/location → dates → secondary attributes). Never stretch columns into whitespace. Below the minimum, low-priority columns hide or move into the row detail.
6. Dashboard rows use fill-container cards. At 1280 a 3-card row keeps 3 columns (min card 300); a card that cannot fit wraps to the next row.
7. Text truncates with an ellipsis (single line) inside fixed-height rows. Never clip mid-glyph or overlap.
8. Mobile 390 is designed only for field pages (scan, check-in, task). Desktop Workspaces are not drawn at 390 by default.
9. Card gap is 16 in every Workspace.

## Z-index and motion

Z-index (code tokens, not Figma variables): nav 20 · sticky header 30 · overlay 60 · modal 70 · popover 80 · tooltip 90.
Sidebar width transition 200ms `cubic-bezier(0.4, 0, 0.2, 1)`; color transitions 150ms. Respect `prefers-reduced-motion` (the theme CSS turns motion off).
