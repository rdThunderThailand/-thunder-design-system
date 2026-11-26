# Platform shell (DS-03)

Source: Figma "[DS] - Design System", pages **Components / Shell** and **Components / Navigation** (code: `WorkspaceSidebar`, `WorkspaceHeader`, `MediaDashboard` layout in the Lovable app).
The shell is the same in every Workspace. Only the sidebar **Menu** contents, the Page actions left slot and the Create button behaviour come from the Workspace profile.

## App shell

```
┌ Sidebar ─┬ Top header (sticky) ───────────────────────────────┐
│ Brand 68 │ Title + subtitle · Search · Period · 🔔 · ? · User │
│──────────┼────────────────────────────────────────────────────┤
│ Nav      │ Page actions: [left slot]            [Create ▾]   │
│ (scrolls)│ Content (the only vertical scroller)               │
│──────────│                                                    │
│ Collapse │ Status bar (fixed bottom)                          │
└──────────┴────────────────────────────────────────────────────┘
```

- Layout: `flex min-h-screen`; column `min-w-0 flex-1`; `main` `px-6 py-5` (sm+) / `px-4 py-5` (< sm). **No max-width.**
- Sidebar `sticky top-0 h-screen`; only its Nav scrolls (`overflow-y-auto`, `.t1-scroll-quiet`), with bottom padding so the last item is not hidden behind the footer.
- Header `sticky top-0 z-30`.
- Status bar is fixed to the bottom of `main`; the content zone scrolls (`overflow-y-auto`) with bottom padding so the last content is not hidden behind the bar. Scrollbar only in the content.
- Variants: Desktop (≥ lg) with Sidebar Expanded 224 / Collapsed 68; Mobile (< lg) with the sidebar as a drawer (`w-64` 256 + `bg-overlay` scrim, close X `right-2 top-4`, slide 200ms).
- Never detach the shell or the sidebar in the library. Page bodies go in the Content slot.

## Sidebar

`aside` `flex-col border-r border-border bg-sidebar`, width transition 200ms.

| State | Width | Shows |
|---|---|---|
| Expanded (≥ 1280) | 224 (`w-sidebar`) | Logo + workspace name, group labels, item labels, badges |
| Collapsed (icon rail, 1024–1279 or user toggle) | 68 (`w-sidebar-collapsed`) | Mark only, icons centred; labels, group labels and badges hidden |
| Drawer (< 1024) | 256 | Always expanded content, over `bg-overlay` |

Structure: **Brand header** (68, `border-b`) → **Nav** `px-2 py-3` containing the **Menu slot** → **Footer** `border-t p-2` with the collapse toggle, pinned to the bottom.

The sidebar is content-agnostic. Each Workspace defines its own menu (`Sidebar/Menu/<Workspace>`) from its approved navigation spec (the profile lists it). Never ship the placeholder menu; never add one Workspace's items to another.

### Brand header
- Expanded: official lockup **Logo/Horizontal + Title / Dark text** at 0.74 scale (184 × 39), `pl-3`, vertically centred. Its baked title is replaced by the live **workspace name**: `text-label-type uppercase text-muted-foreground`, left-aligned to the wordmark, baseline on the mark bottom.
- Collapsed: **Logo/Mark (app icon) / Black** 36 × 36.
- The workspace name stays in English on TH and EN screens (e.g. "Media Workspace"). Each Workspace sets its own name.
- Logo files: `references/brand.md`. Never redraw or recolor.

### Nav item
| Part | Spec |
|---|---|
| Item | `h-8 rounded-md px-3 gap-3 text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent`; width 208 in the 224 sidebar |
| Icon | lucide 16, `strokeWidth={1.8}`, `text-muted-foreground`, `group-hover:text-foreground`; stays muted when active |
| Active (`aria-current="page"`) | `bg-primary-soft text-primary` |
| Primary item (Overview) | `h-10 rounded-lg text-sm font-semibold`, icon uses `currentColor` (primary when active) |
| Badge | `rounded-full px-1.5 py-0.5 text-caption-3xs font-bold uppercase`: `bg-primary-soft text-primary` ("New") or `bg-danger text-danger-foreground` (count). Stays Caption/3xs 8px |
| Collapsed | 44 × 32 (primary 44 × 40), icon only, centred. **Must** have `aria-label` (the item label) and a right-side `Tooltip` with the label (DS-13, design 2026-11-26; the Lovable code is missing both) |
| Submenu | Only where the Workspace spec defines one: closed = `chevron-right`, open = `chevron-down` + sub-items (`pl-10`, same default/hover/active tokens). Collapsed never shows submenus |

Group label: `mb-1.5 px-3 text-label-type uppercase text-muted-foreground` (10px Label/Type label, design 2026-11-26; replace the code's `text-[9px]`, there is no 9px style). Groups `mb-4 space-y-0.5`; 12px between groups. Group names and order come from the profile.

### Collapse toggle (footer)
Ghost button `h-10 w-full justify-start rounded-lg px-3 gap-2 text-muted-foreground hover:bg-muted hover:text-foreground`.
Expanded: `panel-left-close` + label; Collapsed: `panel-left-open` only. Default label is Thai **"ย่อเมนู"**; EN screens use "Collapse".
Required: `aria-label` ("Collapse sidebar" / "Expand sidebar") and `aria-expanded` (true when expanded). Missing in code; add them.

## Top header

`WorkspaceHeader`: `sticky top-0 z-30 h-header bg-background/95 backdrop-blur border-b border-border`.

| Area | Spec |
|---|---|
| Left | ≥ lg: page title `text-title-page truncate` + subtitle `text-body-sm text-muted-foreground`. < lg: ghost icon button `menu` (20) opens the drawer; the page repeats its title inside `main` |
| Center (md+) | **Global search**: `max-w-search` (448) fill, `h-9 rounded-lg border-border bg-card pl-9 pr-14 text-xs`, search icon `left-3` 16 muted, placeholder "Search anything…", `aria-label="Search anything"`, `⌘ K` kbd right (`rounded-[4px]`: literal 4px by design, no radius token yet). Focus `border-primary ring-2 ring-primary/10`. Hidden below 768 |
| Right | Icons inside Button sm are **16** (`size-4`), not the code's 14/12. Optional period picker (Button outline sm: `calendar-days` in primary + period + `chevron-down`; menu Today / This week / This month) · **Notifications** · **Help** (ghost icon `circle-help`) · **User chip** |
| Notifications | Ghost icon button `bell` 16, `aria-label="Notifications"`, `aria-expanded`; unread dot 8px `bg-danger border-2 border-background` top-right. Opens a `w-72` popover with the latest alerts |
| User chip (xl+, ≥ 1280) | A **button** (`aria-haspopup="menu"`, `aria-label` = user name) that opens a Dropdown menu with exactly **Account** and **Sign out**. No language switch (MVP). `border-l border-border pl-3 gap-2`: avatar 32 `rounded-full bg-foreground text-background` initials (12 bold) · name `text-caption-2xs font-bold` · role `text-caption-3xs text-muted-foreground` |

Platform utilities (Help, Notifications, account) open from the header. They are not Workspace tiles and never add sidebar sections.

## Page actions

First child of `main`, 12px above the content.
- Desktop: one row, `justify-between`. Left slot (a filter, segmented control or search for the page) · spacer · **Create button** right-aligned even when the left slot is off.
- Mobile (< sm): stacked, slot and Create full width.
- No separate per-page primary buttons in this row: Workspace primary actions are items of the Create menu.

**Create button** (Universal Create): Button sm (32, `bg-primary`, `rounded-md`, `px-3 gap-2`, `text-label-xs`), icon `plus`, optional `chevron-down`. Disabled (50%) when the page is in error.
What it opens is set per Workspace: a **Create menu** (Dropdown menu with item list) or a **Create popup** (dialog on `bg-overlay`, max width 1120). The profile says which.

## Status bar (every Workspace)

Bottom bar of `main`, standard for every Workspace (decision 2026-11-22). Default items, in this order:

`● Auto refresh: On` · `Last updated: HH:MM:SS` · `Time zone: Asia/Bangkok (UTC+7)`

| Page state | Last updated text |
|---|---|
| Loading | "Loading data…" |
| Empty | normal "Last updated: …" |
| Error | "Last updated: <time> (stale)", or "Last updated: — (load failed)" when nothing ever loaded |

Do not reword the labels (e.g. "Data as of"). Items wrap on narrow widths. The "Example data" badge in Figma is a design-review aid; never ship it.

## Scroll and dock summary (for Dev)
- Sidebar footer: `position: fixed`/sticky at the bottom of the sidebar; only Nav scrolls.
- Status bar: fixed at the bottom of `main`; only the content zone scrolls.
- One vertical scrollbar per region; the page body itself does not scroll behind the shell.
