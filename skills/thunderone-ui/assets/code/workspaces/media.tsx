/* Copy of packages/thunderone-theme/src/workspaces/media.tsx, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/thunderone-theme */
/**
 * Media Workspace extras (see skills/thunderone-ui/references/workspaces/media.md).
 *
 *   import { mediaStatusTone, channelTypes, channelTypeIcon, MediaIcon, mediaNav } from '@rdthunderthailand/thunderone-theme/workspaces/media';
 *   statusTone(channel.state, mediaStatusTone)
 */
import {
  Activity, Bell, CalendarDays, ChartColumn, Clock3, FilePlus2, Grid2x2, HeartPulse, LayoutDashboard, Library, ListVideo,
  Monitor, Radio, Settings2, SlidersHorizontal, SquarePlay, Tv, Upload, Users, Volume2,
} from 'lucide-react';
import type { T1Tone } from '../t1-tokens';

/** Media states → semantic tone (DS-04). Same tones as the core StatusBadge map (scheduled = info, 2026-11-26); `live` is Media-only. */
export const mediaStatusTone = {
  online: 'success',
  live: 'success',
  warning: 'warning',
  offline: 'danger',
  scheduled: 'info',
  processing: 'info',
} as const satisfies Record<string, T1Tone>;
export type MediaStatus = keyof typeof mediaStatusTone;

/** Channel types, fixed order and labels (Figma decision D4, 2026-11-22). */
export const channelTypes = ['Screens', 'TV', 'PA / Audio', 'Kiosks'] as const;
export type ChannelType = (typeof channelTypes)[number];

/** Channel type → icon (D4). No per-type colour: icon = primary. */
export const channelTypeIcon = {
  Screens: Monitor,
  TV: Tv,
  'PA / Audio': Volume2,
  Kiosks: LayoutDashboard,
} as const satisfies Record<ChannelType, unknown>;

/** Media concepts → icon, as drawn in Figma (Sidebar/Menu/Media Workspace, Create popup, dashboard). Platform concepts come from T1Icon. */
export const MediaIcon = {
  // Navigation
  overview: LayoutDashboard,
  mediaLibrary: Library,
  playlists: ListVideo,
  layouts: Grid2x2,
  programs: SquarePlay,
  nowNext: Clock3,
  calendar: CalendarDays,
  allChannels: Radio,
  channelGroups: Users,
  screens: Monitor,
  tv: Tv,
  paAudio: Volume2,
  kiosks: LayoutDashboard,
  liveView: Activity,
  alerts: Bell,
  systemHealth: HeartPulse,
  reports: ChartColumn,
  analytics: Activity,
  brandAssets: Settings2,
  designSystem: SlidersHorizontal,
  // Universal Create, step 1 (Shell/Create popup)
  media: Library,
  playlist: ListVideo,
  layout: Grid2x2,
  // Dashboard quick actions
  createPublication: FilePlus2,
  upload: Upload,
  live: Radio,
  schedule: Clock3,
} as const;
export type MediaIconName = keyof typeof MediaIcon;

/**
 * Media menu as drawn in Figma (carried over from the Lovable mockup). NOT spec-verified: the G2 navigation
 * source is missing (see workspaces/media.md). `badge`: 'new' = primary-soft "New", 'count' = danger count.
 */
export const mediaNav = [
  { group: null, items: [{ id: 'overview', label: 'Overview' }] },
  { group: 'Content', items: [{ id: 'mediaLibrary', label: 'Media library' }, { id: 'playlists', label: 'Playlists' }, { id: 'layouts', label: 'Layouts', badge: 'new' }] },
  { group: 'Programming', items: [{ id: 'programs', label: 'Programs' }, { id: 'nowNext', label: 'Now & next' }, { id: 'calendar', label: 'Calendar' }] },
  { group: 'Channels', items: [{ id: 'allChannels', label: 'All channels' }, { id: 'channelGroups', label: 'Channel Groups' }, { id: 'screens', label: 'Screens' }, { id: 'tv', label: 'TV' }, { id: 'paAudio', label: 'PA / Audio' }, { id: 'kiosks', label: 'Kiosks' }] },
  { group: 'Monitoring', items: [{ id: 'liveView', label: 'Live view' }, { id: 'alerts', label: 'Alerts', badge: 'count' }, { id: 'systemHealth', label: 'System health' }] },
  { group: 'Reports & analytics', items: [{ id: 'reports', label: 'Reports' }, { id: 'analytics', label: 'Analytics' }] },
  { group: 'Settings', items: [{ id: 'brandAssets', label: 'Brand Assets' }, { id: 'designSystem', label: 'Design System' }] },
] as const satisfies readonly { group: string | null; items: readonly { id: MediaIconName; label: string; badge?: 'new' | 'count' }[] }[];
