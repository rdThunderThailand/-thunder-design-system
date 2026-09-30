# Tailwind + shadcn/ui (Lovable default stack)

Use this when the project uses Tailwind/shadcn instead of Ant Design. The theme comes from `@rdthunderthailand/mw-theme` (generated from `tokens.json`). If the package cannot be installed, the same files are in `assets/code/tailwind/`.

## Setup

**Tailwind v3** (Lovable projects today: `tailwind.config.ts` + `src/index.css` with `@tailwind` lines)
1. `npm i @rdthunderthailand/mw-theme`
2. `tailwind.config.ts`: add `presets: [require('@rdthunderthailand/mw-theme/tailwind/preset')]` (see `assets/code/tailwind/tailwind.config.example.ts`). Remove the project's own shadcn `colors` / `borderRadius` extend block so it does not override the preset.
3. `src/index.css`: put `@import '@rdthunderthailand/mw-theme/tailwind/shadcn.css';` on the first line, keep the three `@tailwind` lines, and delete the old `:root { --background … }` / `.dark { … }` blocks.

**Tailwind v4** (`@import "tailwindcss"` in the main CSS)
1. `npm i @rdthunderthailand/mw-theme`
2. Main CSS: `@import "tailwindcss";` then `@import "@rdthunderthailand/mw-theme/tailwind/v4.css";`. Remove any other `@theme` color/radius block.

Both versions produce the same classes and the same pixels (checked in CI with Tailwind 3 and 4).

## Classes to use

| Need | Class |
|---|---|
| Page background / text | `bg-background text-foreground` |
| Card | `bg-card rounded-card border border-border shadow-panel p-4` |
| Muted text | `text-muted-foreground` |
| Primary button | `h-control px-4 rounded-control bg-primary text-primary-foreground font-semibold hover:bg-primary/90` |
| Secondary button | `h-control px-4 rounded-control border border-input bg-card font-semibold` |
| Input | `h-control rounded-control border border-input focus-visible:ring-2 focus-visible:ring-ring` |
| Sidebar | `w-sidebar bg-sidebar border-r border-sidebar-border` + nav scroll area `mw-scroll-quiet` |
| Nav item / active | `h-nav rounded-nav text-sidebar-foreground hover:bg-muted` / `bg-sidebar-accent text-sidebar-accent-foreground font-semibold` |
| Header | `h-header` |
| Status pill | `rounded-pill bg-success-muted text-success` (also `warning`, `error`, `info`, `in-progress`) |
| Status dot | `size-1.5 rounded-pill bg-success` |
| Page title / KPI number | `text-page-title font-extrabold` / `text-kpi font-bold tabular-nums` |
| Swipe row on phones | `mw-scroll-x` |
| Raw brand ramp (charts only) | `bg-mw-blue-500`, `text-mw-gray-700` … |

Rules:
- Use the semantic classes above. Do not use Tailwind's default palette (`bg-blue-500`, `text-gray-600`, `bg-green-100` …) or arbitrary hex (`bg-[#…]`).
- `shadow-card` does **not** exist (it would clash with the `card` color). Use `shadow-panel`.
- shadcn components (`Button`, `Card`, `Badge`, `Sidebar` …) pick up the theme automatically through the CSS variables. Add `success` / `warning` / `info` variants to `Badge` with the status classes above rather than new colors.
- Icons: still `@ant-design/icons` via `MwIcon` from `@rdthunderthailand/mw-theme/icons`. It works in any React project. Remove `lucide-react` icons from screens you touch.
- Light theme only. Delete shadcn's `.dark` block until design defines dark tokens.
