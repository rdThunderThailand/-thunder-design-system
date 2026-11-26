# Workspace profile: Asset Workspace (`asset`)

Adds to the core (SKILL.md). Never overrides a DS-xx rule.
Product truth: *02 — Asset Workspace — Product Specification v1.1.5* (approved), §4.2 "สถาปัตยกรรมและ Navigation ที่อนุมัติ — G2" (G2 PASS, approved baseline v1.1). Canonical navigation: FigJam *Asset Workspace — Navigation & Terminology v1.1.0* (APPROVED), table "Asset Workspace MVP Navigation v1.1" (current section node `523:88`; the spec's `515:635` no longer resolves).
Design source: Figma "[DS] - Design System" (`kW5RDAy0BZ4Muj9RU3dPgC`): `Sidebar/Menu/Asset Workspace`, `Shell/Create menu`; AWS-01 reference frames (TH main `53:2792` in the AWS-01 file). When this profile and the Spec disagree, the Spec wins and the conflict is reported.
Code extras: `import { assetNav, AssetIcon } from '@rdthunderthailand/thunderone-theme/workspaces/asset'`.

## Identity
- Workspace name in the brand header: **"Asset Workspace"** (English on TH and EN screens). Never reuse the Media string.

## Vocabulary (use these exact terms)
Navigation terms are the vocabulary: **Assets**, **Assignments**, **Inventory**, **Categories**, **Locations**, **Lifecycle & Warranty**, **Reports**, **Settings**. Localization keys `asset.nav.*`. Other object terms come from the Spec and the FigJam terminology table.

## Navigation (Sidebar/Menu/Asset Workspace)
Asset Admin (full MVP menu), in this order:

**Overview** · **Asset Management**: Assets, Assignments, Inventory · **Asset Structure**: Categories, Locations · **Management**: Lifecycle & Warranty, Reports, Settings

- Not in the menu (per Spec): Connected Devices (Phase 2), Transfers (a controlled action, not a page), Help & Support (platform header).
- No sub-navigation is specified. The Reports mockup shows a chevron on Inventory; it is not built. Do not add sub-items.
- Role visibility (Spec §3, not modelled in Figma): Manager sees Overview, Assets, Assignments, Inventory, Reports; Employee uses a role-specific experience. Hiding menu items is not a permission check.

## Page actions and Create
- **Create** opens the **Create menu** (Dropdown menu) with one item: **Register Asset** (decided 2026-11-22). Asset primary actions are added here as Create-menu items, not as page buttons.

## Status mapping (DS-04)
Not defined in the design system yet. Use the core StatusBadge map (`statusTone(state)`) for generic states (active, pending, archived …). Map Asset-specific states from the Spec before building screens that show them, and add them here.

## Icon map (`AssetIcon`)
Icons are not in the Spec; Figma chose them to match the Reports mockup (assumption).
| Concept | lucide |
|---|---|
| Overview | `LayoutDashboard` |
| Assets | `Package` |
| Assignments | `UserCheck` |
| Inventory | `Warehouse` |
| Categories | `Tag` |
| Locations | `MapPin` |
| Lifecycle & Warranty | `ShieldCheck` |
| Reports | `ChartColumn` |
| Settings | `Settings2` |

## Dashboard density (AWS-01)
- Quick actions use the **Row** layout (full width, hint + chevron).
- Activity rows use the **Default** density (tile 28 `bg-primary-soft`, `text-label-xs`).
- Bar rows (core Chart bar row, label 120) for counts by location, e.g. "Head Office".

## Open items
- Asset status → tone mapping (above).
- Inventory sub-navigation not specified.
- Nav icons are assumptions until design confirms them.
