/* Copy of packages/thunderone-theme/src/icons.tsx, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/thunderone-theme */
/**
 * ThunderOne platform concept → lucide icon (DS-15, see skills/thunderone-ui/references/icons.md).
 * Shared by every Workspace. Workspace-specific icons live in ./workspaces/<key>.
 * Every icon here is on the Figma page "Components / Icons" (lucide-static 0.575.0).
 *
 *   import { T1Icon, t1IconSize } from '@rdthunderthailand/thunderone-theme/icons';
 *   <T1Icon.search className="size-4 text-muted-foreground" />
 */
import {
  Activity, Archive, ArrowRight, Bell, CalendarDays, ChartColumn, Check, ChevronDown, ChevronLeft, ChevronRight,
  ChevronUp, CircleAlert, CircleCheck, CircleHelp, Clock3, CloudUpload, Download, Ellipsis, ExternalLink, Folder,
  Funnel, Inbox, Info, LayoutDashboard, Lightbulb, LoaderCircle, Menu, PanelLeftClose, PanelLeftOpen, Pencil, Plus,
  RefreshCw, Search, Settings2, SlidersHorizontal, Trash2, TriangleAlert, Upload, Users, X,
} from 'lucide-react';

export const T1Icon = {
  // Shell
  overview: LayoutDashboard,
  search: Search,
  notifications: Bell,
  help: CircleHelp,
  menu: Menu,
  collapseSidebar: PanelLeftClose,
  expandSidebar: PanelLeftOpen,
  close: X,
  users: Users,
  // Semantic status
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
  info: Info,
  loading: LoaderCircle,
  empty: Inbox,
  // Actions
  create: Plus,
  more: Ellipsis,
  filter: Funnel,
  adjust: SlidersHorizontal,
  settings: Settings2,
  upload: Upload,
  download: Download,
  archive: Archive,
  check: Check,
  edit: Pencil,
  delete: Trash2,
  refresh: RefreshCw,
  externalLink: ExternalLink,
  cloudUpload: CloudUpload,
  // Direction
  linkArrow: ChevronRight,
  back: ChevronLeft,
  next: ChevronRight,
  forward: ArrowRight,
  disclose: ChevronDown,
  conceal: ChevronUp,
  // Content
  calendar: CalendarDays,
  time: Clock3,
  activity: Activity,
  folder: Folder,
  reports: ChartColumn,
  tip: Lightbulb,
} as const;

export type T1IconName = keyof typeof T1Icon;

/** Figma icon sizes: 16 = default in code (size-4), 20 (size-5), 24 = lucide native. Stroke 2 (sidebar nav uses 1.8). */
export const t1IconSize = { sm: 16, md: 20, lg: 24 } as const;
