# Workspace profile: Media Workspace (`media`)

Adds to the core (SKILL.md). Never overrides a DS-xx rule.
Product truth: *ThunderOne Media Workspace — Product Specification v1.0* (Frozen).
Design source: Figma "[DS] - Design System" (`kW5RDAy0BZ4Muj9RU3dPgC`): Templates page "Main page (Lovable home)" (Desktop 1440, Mobile 390) and dashboard parts; reference screen MW-01 Overview (TH main frame `108:5433` in the MW-01 file). Code: Lovable `src/routes/media-dashboard.tsx`, `src/components/media-dashboard.tsx`.
Code extras: `import { mediaStatusTone, channelTypes, channelTypeIcon, MediaIcon } from '@rdthunderthailand/thunderone-theme/workspaces/media'`.

## Identity
- Workspace name in the brand header: **"Media Workspace"**, in English on TH and EN screens (decision 2026-11-23).

## Vocabulary (use these exact terms)
- **Channel** = any managed output. Channel types, fixed order and labels (decision D4, 2026-11-22): **Screens**, **TV**, **PA / Audio**, **Kiosks**.
- **Program** = scheduled content block pushed to channels. **Media**, **Playlist**, **Layout** = content building blocks; **Media library** holds media.
- **Publication** = a published program/content.

## Navigation (Sidebar/Menu/Media Workspace)
**Not spec-verified** (decision needed, Figma comment #1). The Spec (§8) says the G2 navigation lives in a Media FigJam/Figma that has not been found. Figma carries the menu over unchanged from the Lovable home mockup. Build it exactly as below, do not add items, and replace it when the G2 source is provided.

| Group | Item | lucide | Note |
|---|---|---|---|
| (primary) | Overview | `LayoutDashboard` | `h-10` |
| Content | Media library | `Library` | |
| | Playlists | `ListVideo` | |
| | Layouts | `Grid2x2` | "New" badge |
| Programming | Programs | `SquarePlay` | |
| | Now & next | `Clock3` | |
| | Calendar | `CalendarDays` | |
| Channels | All channels | `Radio` | |
| | Channel Groups | `Users` | |
| | Screens | `Monitor` | |
| | TV | `Tv` | |
| | PA / Audio | `Volume2` | |
| | Kiosks | `LayoutDashboard` | |
| Monitoring | Live view | `Activity` | |
| | Alerts | `Bell` | danger count badge |
| | System health | `HeartPulse` | |
| Reports & analytics | Reports | `ChartColumn` | |
| | Analytics | `Activity` | |
| Settings | Brand Assets | `Settings2` | |
| | Design System | `SlidersHorizontal` | |

Code: `mediaNav` and `MediaIcon`.

## Page actions and Create
- Left slot on Overview: **Channel type filter** (segmented, text only): All channels · Screens · TV · PA / Audio · Kiosks. (Lovable still lists only All channels / Screens / Audio; D4 supersedes it.)
- **Create** opens the **Create popup** (not a menu): header "Create" + description; stepper Choose content · Prepare content · Program · Review · Publish; step 1 = three columns **Media** (drop zone, Upload from computer, Choose from Media library), **Playlist** (Choose existing / Create new), **Layout** (Choose existing / Create new); help panel "Not sure what to choose?"; tip bar; footer Cancel / Next. Max width 1120 on the overlay.
- Type tiles are **neutral** (design 2026-11-26, option b): `bg-surface-subtle border border-border`, icon `text-primary`, title `text-foreground`. No green, primary tint or purple per type (DS-04: types are taxonomy).
- Behavior (spec, not assumption): **Esc** or a click on the scrim closes the popup; **Next is disabled** until a content type is chosen.

## Status mapping (DS-04)
| Media state | Tone |
|---|---|
| Online, Live | success |
| Warning | warning |
| Offline | danger |
| Scheduled, Processing | info |

Code: `statusTone(state, mediaStatusTone)`. Scheduled and Processing are both info; tell them apart by icon + label, never a sixth color.

## Icon map
All from the Figma set (`MediaIcon`, `channelTypeIcon`). Nav icons: table above.
| Concept | lucide |
|---|---|
| Screens / TV / PA / Audio / Kiosks | `Monitor` / `Tv` / `Volume2` / `LayoutDashboard` (D4; icon color = primary, no per-type color) |
| Create: Media / Playlist / Layout | `Library` / `ListVideo` / `Grid2x2` |
| Quick actions | `FilePlus2` (Create publication), `ListVideo`, `SquarePlay`, `Upload`, `Radio`, `Clock3` |

Live view and Analytics share `Activity`, and Overview and Kiosks share `LayoutDashboard`, in Figma. That breaks "one concept, one icon" (DS-15 rule 7); keep it as drawn until design changes it.

## Overview dashboard (Templates: Main page)
1. Page actions: Channel type filter left, Create right.
2. KPI row, 5 cards, min 300, gap 16: Total channels · Online · Warning · Offline (KPI card with tone sparkline) · Delivery success rate (ring 56 + success pill).
3. Card grid, 3 columns at xl, gap 16 (MW-01 order): col 1 Now playing / Next program → Today's schedule → Quick actions → Activity feed; col 2 Channel health → Channels by type; col 3 **Needs attention** (alerts, `xl:row-span-2`, min height 320).
4. Status bar (core).
Each card has its own loading / empty / error (Card state).

## Table column drop order (narrow cards)
Uptime (< 1040px) → Now playing (< 880px) → Type (< 600px) → status and heartbeat fold under the channel name (< 520px).

## Media components
| Component | Spec |
|---|---|
| Program card | Now playing: thumbnail 112 `aspect-[4/3] rounded-lg bg-program p-3` (pattern, "Live broadcast" caps label, title) + title `text-sm font-bold` (1 line, ellipsis) + LIVE pill (`bg-success-soft text-success`, pulsing dot). Next program: time `text-display-kpi` column. Stats strip (4 columns, icon 14 + count) `border-t pt-3`. |
| Needs attention (Alerts card) | Section header "Needs attention" + "View all alerts"; 5 Alert rows (core); title `Location · Device` (e.g. "Central World · LED Screen 3"), note, relative time, channel-type tag. Hover reveals Acknowledge (X). Empty: "All caught up". |
| Today's schedule | Section header + "View full calendar"; timeline rail 1px `bg-border`; rows `grid-cols-[12px_44px_1fr_auto] gap-2 py-2`: dot 8 (`ring-4 ring-card`; live = `bg-success animate-pulse`, last = `bg-muted-foreground`, else `bg-primary`), time bold, title + "Program" caption, meta or LIVE pill. |
| Channel health | Ring 104 (success / warning / danger shares) with total in the centre + Chart legend rows with bars. |
| Channels by type | 4 tiles `rounded-lg border p-2 text-center`, filling the card (min 56): icon 20 `text-primary`, label, count, "n online" (success), issues (success when 0, else warning). Labels and icons fixed (D4). |
| Activity feed | Activity rows, Compact density. |
| Quick actions | Quick action tiles (2-up at the default card width, 1 below ~360, 3 when wide). |

## Open items
Figma comments tagged `[DS 1.0 sync]` on the [DS] file track these.
- G2 navigation source missing (#1).
