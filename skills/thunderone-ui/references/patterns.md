# Page patterns (platform)

Every page sits in the App shell (`shell.md`). Workspace-specific pages (dashboards, domain flows) are in `workspaces/<key>.md`.

## List / management page
- Header title = page name, subtitle = one-line purpose. Page actions: filter or search in the left slot, Create on the right.
- Content: one card with a table (`components.md` Table). Status column = StatusBadge.
- Columns are added as width grows and dropped by priority below the minimum (identity → status → owner/location → dates → secondary). The profile lists the exact order. Never scroll a table sideways on desktop.
- Loading = LoadingState rows; empty = EmptyState with one next step; error = ErrorState with Retry (DS-11).

## Dashboard page
- Page actions row (segmented filter left, Create right).
- KPI row: KPI cards, 300px minimum, `gap-4`; 5-up at ≥ 1440, 3-up at 1280 with the rest wrapping.
- Card grid: fill-container cards, `gap-4`; 3 columns at xl, wrapping at 1280 when a card cannot fit (min 300). Use `fr` / `minmax`, never fixed pixel columns.
- Each card handles its own loading / empty / error (Card state) so one failure does not blank the page.
- Status bar at the bottom (shell). The profile defines which cards, their order and content.

## Side panel (contextual)
- Opens from a header or row action without leaving the page. Desktop: right drawer. Tablet: overlay. Mobile: full screen with a clear close/back.
- Closable, keeps the page state underneath unchanged, offers a route to the full page when there is one.

## Dialog and Create popup
- Dialog for confirmation and short forms (`max-w-lg`). Destructive confirmation: title as a question ("Delete …?"), description says what is lost, footer Cancel (outline) + destructive button.
- Close with X, Cancel, Esc or a scrim click, without saving.
- A multi-step Create popup is a large dialog (max width 1120) with a stepper; Next is enabled once a choice is made.

## Copy rules (DS-12)
- Sentence case for headings, buttons and menu items ("View all alerts", not "View All Alerts").
- Use the exact terms of the Workspace profile. Same thing, same word, on every screen.
- Relative time for recent events ("5m ago"); 24h clock (`09:00`, `10:30:45`); show the time zone where times matter (default `Asia/Bangkok (UTC+7)`).
- Percentages with one decimal ("90.3%").
- Locations formatted `Place · Device` when both exist.
- Status bar wording is fixed (`shell.md`).

## Language (TH / EN)
- Text must fit in both Thai and English. Do not size buttons or columns to the English string only.
- Set `lang="th"` or `lang="en"` on `<html>` (or the subtree) so the type styles pick the right line heights (DS-07).
- Thai has no capitals: never rely on uppercase or letter spacing to carry meaning.
- A language switch changes the language of the same content. Never show one language's content labeled as the other.
- Some labels stay English on TH screens by decision (e.g. the workspace name in the sidebar brand header). The profile lists them.
