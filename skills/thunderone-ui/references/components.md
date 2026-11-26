# Platform components (DS-08)

Shared by every Workspace. Source: Figma "[DS] - Design System", pages **Components / Actions, Forms, Data display, Navigation, Feedback** and **Templates**. Each Figma component description names its code: `ui/*` = shadcn component in `src/components/ui`, `core.tsx` / `patterns.tsx` = `src/components/design-system/*`.
Use the component; the classes below are what it renders, for review and for the rare case you must build one. Workspace-specific components live in `workspaces/<key>.md`.

## Actions

**Button** (`ui/button.tsx`)
| Size | Spec |
|---|---|
| `sm` | `h-8` (32) `rounded-md px-3 text-xs` (`text-label-xs`) |
| `default` | `h-10` (40) `rounded-lg px-4 text-sm` (`text-label-sm`) |
| `lg` | `h-11` (44) `rounded-lg px-6 text-sm` |

Variants: `default` (= primary: `bg-primary text-primary-foreground`), `destructive`, `outline` (`border-border bg-card`), `secondary`, `ghost` (`text-muted-foreground`, hover `bg-muted`), `link` (underline on hover only). Gap 8, icon 16 (`currentColor`).
States: hover = `/90`, `/80` or `bg-muted`; focus = `focus-visible:ring-2 ring-ring`; disabled = `opacity-50`. Loading is not in code: show it as disabled + `loader-circle` spinning.

**IconButton** (`core.tsx`): `<IconButton label>` → Button `size="icon"` (`h-9 w-9 rounded-lg`) or `icon-sm` (`h-8 w-8 rounded-md`), icon 16. `label` is required and becomes `aria-label` + `title`.

## Forms

All inputs: `rounded-md border border-input bg-transparent text-sm`, placeholder `text-muted-foreground`, focus `ring-1 ring-ring`, disabled `opacity-50`, error (`State=Error`) `border-destructive` + `aria-invalid="true"` (confirmed by design; not in code yet). The message is a sibling **Form/Error text** under the field, not inside the input: `text-body-sm text-destructive` (12px), optional leading `T1Icon.error` 16, linked with `aria-describedby`. Same for Input, Textarea and Select.

| Component | Spec |
|---|---|
| Input (`ui/input.tsx`) | `h-9` (36) `px-3 py-1` |
| SearchInput (`core.tsx`) | Input + search icon `left-3` 16 muted, `pl-9`, `min-w-48`. Accessible name = label ?? placeholder ?? "Search" |
| Textarea | `min-h-[60px] px-3 py-2` |
| Select trigger (`ui/select.tsx`) | `h-9 px-3 py-2 justify-between`, `chevron-down` 16 at 50% opacity. Options use the Dropdown menu item style |
| Checkbox | `h-4 w-4 rounded-[4px] border-primary`, checked `bg-primary text-primary-foreground` + check 16. Square with 4px corners by design (not round; `rounded-sm` is 8px and makes it a circle). Literal 4px until a `radius/xs` token is decided |
| Radio | `h-4 w-4 rounded-full border-primary`, indicator 12px filled disc |
| Switch | `h-5 w-9 rounded-full`, on `bg-primary`, off `bg-input`; thumb 16 `bg-background shadow-float`; focus `ring-2 ring-offset-2` |

Labels are sibling `<Label>` elements. Every field has a visible label or an `aria-label`.

## Data display

**Card** (`ui/card.tsx`): `rounded-xl border border-border bg-card text-card-foreground shadow-panel`. Header `p-6 space-y-1.5`, content/footer `p-6 pt-0`. Title `text-label-sm` (semibold). Dashboard cards: `p-4`, hover `hover:border-foreground/20 hover:shadow-float`.

**Badge** (`ui/badge.tsx`): `rounded-md border px-2.5 py-0.5 text-xs font-semibold` (height 22). Variants: `default` / `secondary` / `destructive` solid; `outline` (border + `text-foreground`); `success` / `warning` / `danger` / `info` = `bg-<tone>-soft text-<tone>`; `neutral` = `bg-muted text-muted-foreground`.

**StatusBadge** (`core.tsx`): `<StatusBadge status label?>` = Badge(tone) + `gap-1.5` + dot `h-1.5 w-1.5 rounded-full bg-current`. Tone comes from `statusTone()` (core map in `tokens.json` `status-map`, plus the profile's states). Use it for every state (DS-04).

**Tag (taxonomy)**: Badge `outline` (or `secondary`). Categories and types never use status tones (DS-04).

**Table** (`ui/table.tsx`)
| Part | Spec |
|---|---|
| Header cell | `h-10 px-2 text-left align-middle font-medium text-muted-foreground` (text-sm) |
| Cell | `p-2 align-middle text-sm` (row ≈ 37) |
| Row | `border-b hover:bg-muted/50`, selected `bg-muted`; last row no border |
| Layout | Cells fill the row (equal or `fr` columns) so width is shared, never left as whitespace. Column priority and hiding: `foundations.md` rule 5 |
Status columns hold a StatusBadge.

**Chart rows** (tokens + text styles only)
- Legend row: dot + label (fills, 1-line ellipsis) + value + percent, optional bar (track `bg-muted` + proportional fill). Colors: `chart-1…5` for categories, `muted-foreground` for "Others", success / warning / danger for health states.
- Bar row: label fixed 120 (ellipsis) · track fills the row · count. Tones primary / success / warning / danger / info. Height 20, gap 12.
- Bars are proportional to the value (width = value ÷ max × track), never literal widths.

## Navigation

| Component | Spec |
|---|---|
| Tabs (`ui/tabs.tsx`) | List `inline-flex h-9 rounded-lg bg-muted p-1 text-muted-foreground`; trigger `rounded-md px-3 py-1 text-sm font-medium`, active `bg-background text-foreground shadow-panel`, focus `ring-2` |
| Segmented filter | Page-level filter pills: `flex gap-1 rounded-lg bg-muted p-1`; segment `rounded-md px-3 py-1.5 text-caption-2xs font-semibold`, `aria-pressed`; active `bg-card text-foreground shadow-panel`, inactive `text-muted-foreground hover:text-foreground`. Text only. Use `.t1-scroll-x` on phones |
| Pagination (`ui/pagination.tsx`) | `flex items-center gap-1`: Previous · pages · ellipsis · Next. Link = icon-size button `h-9 w-9 rounded-lg text-sm font-semibold`, ghost when inactive, outline when active |
| Dropdown menu (`ui/dropdown-menu.tsx`) | Item `flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm`, focus `bg-accent text-accent-foreground`, disabled 50%, icon 16; shortcut `ml-auto text-xs tracking-widest opacity-60`. Also label and separator |
| PageHeader (`patterns.tsx`) | `<PageHeader eyebrow title description actions>`: `flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`; eyebrow `text-caption-2xs text-muted-foreground`; H1 `text-title-page truncate`; description `text-body-sm text-muted-foreground`; actions `flex gap-2`. Use inside `main` when the header title is not enough (e.g. below lg) |
| Sidebar, nav item, collapse toggle | `shell.md` |

## Feedback

| Component | Spec |
|---|---|
| Tooltip (`ui/tooltip.tsx`) | `rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-float`, no arrow |
| Toast (`ui/sonner.tsx`) | `bg-background border-border shadow-float rounded-lg p-4`, width 356, title 14 medium, description 12 `text-muted-foreground`, action `bg-primary`, cancel `bg-muted`, type icon tinted with its tone |
| Dialog (`ui/dialog.tsx`) | `max-w-lg` (512) `grid gap-4 border bg-background p-6 shadow-dialog rounded-lg`; title `text-heading-dialog`; description `text-sm text-muted-foreground`; footer `flex justify-end gap-2`; close X `right-4 top-4 opacity-70`; scrim `bg-overlay/60` |
| Skeleton (`ui/skeleton.tsx`) | `animate-pulse rounded-md bg-primary/10`, sized by class |

## Loading, empty, error (DS-11)

| Component | Spec |
|---|---|
| LoadingState (`core.tsx`) | `<LoadingState rows variant label>`, `role="status" aria-busy` + visually-hidden label. `rows` (default 4): rows `p-3 gap-3 border-b border-border-subtle` of skeletons. `cards`: `grid gap-3 sm:grid-cols-2 xl:grid-cols-4` of skeleton cards |
| EmptyState (`core.tsx`) | `<EmptyState icon title description action compact>`: centred, `min-h-52 py-8` (compact `min-h-28 py-4`), inner `max-w-sm`; icon circle 40 `bg-muted text-muted-foreground` (icon 16, stroke 1.8); title `text-sm font-semibold`; description `text-xs text-muted-foreground`; action `mt-4` (Button outline sm) |
| ErrorState (`core.tsx`) | `role="alert"`; EmptyState with `triangle-alert` and default copy "Something went wrong" / "Try again or return to the previous page." Action = Retry |
| Card state | Card-level wrapper: card chrome + section header + Loading (4 skeleton rows) / Empty (EmptyState compact) / Error (ErrorState compact, retry **this card only**). One card can fail or be empty without blanking the page |

Never show "No results" while loading. Error states never block the rest of the page; add Back or another escape route where the user could be stuck.

## Dashboard building blocks (Templates page)

Generic parts used by Workspace dashboards. Domain cards (what each card shows) are in the profile.

| Part | Spec |
|---|---|
| Section header | `mb-3 flex justify-between`: H2 `text-label-section uppercase`; action link `text-caption-2xs font-semibold text-primary hover:underline` + `chevron-right` 12 |
| KPI card | `rounded-xl border bg-card p-4 shadow-panel`; label `text-ui font-semibold text-muted-foreground`; value `text-display-kpi`; icon tile 32 `rounded-lg bg-muted` (icon 16 in the tone color when the KPI is a status); detail `text-caption-2xs text-muted-foreground truncate`; optional sparkline (h 32, stroke 2, tone color). Row: `grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4` |
| Quick action | Tile (2-up grid: icon tile 32 `rounded-lg bg-muted text-primary` + label, 1-line ellipsis) or Row (full width + hint + chevron). Hover `border-primary/30 bg-primary-soft`. Tiles wrap at min width 160 |
| Activity row | Icon tile · title (ellipsis) · detail (ellipsis) · time (+ actor). Compact: tile 24 `bg-muted`, `text-caption-9`; Default: tile 28 `bg-primary-soft`, `text-label-xs` |
| Alert row | `grid-cols-[auto_1fr_auto] gap-3 py-3`, divided; level circle 28 (`bg-danger-soft` + `circle-alert`, `bg-warning-soft` + `triangle-alert`, `bg-primary-soft` + `circle-help`); title `text-ui font-semibold truncate`; note and time `text-caption-9 text-muted-foreground`; kind as an outline tag |
| Ring chart | Conic ring with a card-colored hole and the total in the centre; tones from status colors; legend = Chart legend rows |
