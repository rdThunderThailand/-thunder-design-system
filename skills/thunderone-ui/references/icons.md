# Icons (DS-15)

**Library:** `lucide-react`. Source: Figma page **Components / Icons**, the icons used in the ThunderOne code (`ui/*`, `design-system/core.tsx`, sidebar nav), imported from lucide-static 0.575.0. The full list is in `assets/icons/lucide-icons.txt`.

## Rules
1. Import from `lucide-react`, through `T1Icon` (platform concepts below) or the Workspace profile's icon map. Do not copy SVG paths, and do not mix in another library (Ant Design icons, heroicons, material, react-icons).
2. Use icons from the Figma set. Need one that is not there? Ask design to add it to the Icons page first, then add it to the map. Never pick ad hoc.
3. Sizes: **16** default (`size-4`, buttons, inputs, nav, table), **20** (`size-5`, header menu button, tiles), **24** native. 12 (`size-3`) only for inline link chevrons.
4. Stroke 2 (lucide default; it scales with size). Sidebar nav icons use `strokeWidth={1.8}`, as in code.
5. Color is inherited (`currentColor`). Default `text-foreground`; override per use (`text-muted-foreground`, `text-primary`, a tone inside a status tile). Never tint the logo with an icon color.
6. Icon-only buttons need `aria-label` (DS-13). Decorative icons next to text get `aria-hidden`.
7. One concept, one icon, across every Workspace. A profile adds icons for its own concepts; it never remaps a platform concept.

## Platform icon map (`T1Icon` from `@rdthunderthailand/thunderone-theme/icons`)

| Concept | `T1Icon` key | lucide |
|---|---|---|
| Overview / home | `overview` | `LayoutDashboard` |
| Search | `search` | `Search` |
| Notifications | `notifications` | `Bell` |
| Help | `help` | `CircleHelp` |
| Open mobile drawer | `menu` | `Menu` |
| Collapse / expand sidebar | `collapseSidebar` / `expandSidebar` | `PanelLeftClose` / `PanelLeftOpen` |
| Close | `close` | `X` |
| Users | `users` | `Users` |
| Success / warning / error / info | `success` / `warning` / `error` / `info` | `CircleCheck` / `TriangleAlert` / `CircleAlert` / `Info` |
| Loading spinner | `loading` | `LoaderCircle` (`animate-spin`) |
| Empty state | `empty` | `Inbox` |
| Create | `create` | `Plus` |
| More actions | `more` | `Ellipsis` |
| Filter / adjust view | `filter` / `adjust` | `Funnel` / `SlidersHorizontal` |
| Settings | `settings` | `Settings2` |
| Upload / download | `upload` / `download` | `Upload` / `Download` |
| Archive | `archive` | `Archive` |
| Selected / done | `check` | `Check` |
| Edit | `edit` | `Pencil` |
| Delete | `delete` | `Trash2` (in a destructive action: `text-destructive`) |
| Refresh / retry | `refresh` | `RefreshCw` |
| Open elsewhere (new tab, other app) | `externalLink` | `ExternalLink` |
| Upload to cloud (distinct from `upload`) | `cloudUpload` | `CloudUpload` |
| View all / next | `linkArrow` / `next` | `ChevronRight` |
| Go / continue (CTA arrow) | `forward` | `ArrowRight` |
| Back / previous | `back` | `ChevronLeft` |
| Open / close a disclosure | `disclose` / `conceal` | `ChevronDown` / `ChevronUp` |
| Calendar / period | `calendar` | `CalendarDays` |
| Time | `time` | `Clock3` |
| Activity / history | `activity` | `Activity` |
| Folder | `folder` | `Folder` |
| Reports | `reports` | `ChartColumn` |
| Tip / hint | `tip` | `Lightbulb` |

```tsx
import { T1Icon } from '@rdthunderthailand/thunderone-theme/icons';
<Button size="icon" variant="ghost" aria-label="Notifications"><T1Icon.notifications className="size-4" /></Button>
```

Design added edit, delete, refresh, external link, cloud upload, lightbulb, arrow-right and four Help content-type icons on 2026-11-26 (OD-13 resolved). There is **no language-switch icon**: the MVP has no language switch. Anything else not in the list still needs design first.
