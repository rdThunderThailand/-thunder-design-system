/**
 * Asset Workspace extras (see skills/thunderone-ui/references/workspaces/asset.md).
 * Navigation from "02 — Asset Workspace — Product Specification v1.1.5" §4.2 (G2 approved baseline v1.1),
 * as built in Figma component Sidebar/Menu/Asset Workspace.
 *
 *   import { assetNav } from '@rdthunderthailand/thunderone-theme/workspaces/asset';
 */
import { ChartColumn, LayoutDashboard, MapPin, Package, Settings2, ShieldCheck, Tag, UserCheck, Warehouse } from 'lucide-react';

/** Nav concept → icon. Icons are not in the spec; Figma picked them to match the Reports mockup (OD-04). */
export const AssetIcon = {
  overview: LayoutDashboard,
  assets: Package,
  assignments: UserCheck,
  inventory: Warehouse,
  categories: Tag,
  locations: MapPin,
  lifecycleWarranty: ShieldCheck,
  reports: ChartColumn,
  settings: Settings2,
} as const;
export type AssetIconName = keyof typeof AssetIcon;

/** Asset Admin menu (full MVP), in spec order. `group: null` = the primary item above the groups. */
export const assetNav = [
  { group: null, items: [{ id: 'overview', label: 'Overview' }] },
  { group: 'Asset Management', items: [{ id: 'assets', label: 'Assets' }, { id: 'assignments', label: 'Assignments' }, { id: 'inventory', label: 'Inventory' }] },
  { group: 'Asset Structure', items: [{ id: 'categories', label: 'Categories' }, { id: 'locations', label: 'Locations' }] },
  { group: 'Management', items: [{ id: 'lifecycleWarranty', label: 'Lifecycle & Warranty' }, { id: 'reports', label: 'Reports' }, { id: 'settings', label: 'Settings' }] },
] as const satisfies readonly { group: string | null; items: readonly { id: AssetIconName; label: string }[] }[];
