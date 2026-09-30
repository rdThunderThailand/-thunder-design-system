/* Copy of packages/mw-theme/src/icons.tsx, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/mw-theme */
/**
 * Media Workspace concept → icon map (see references/icons.md).
 * Import icons from here instead of picking them ad hoc, so every screen uses the same icon for the same thing.
 */
import {
  DashboardOutlined, PictureOutlined, UnorderedListOutlined, LayoutOutlined, ProjectOutlined, PlayCircleOutlined,
  CalendarOutlined, ApartmentOutlined, DesktopOutlined, FundProjectionScreenOutlined, SoundOutlined, TabletOutlined,
  EyeOutlined, BellOutlined, HeartOutlined, FileTextOutlined, LineChartOutlined, SkinOutlined, BgColorsOutlined,
  SearchOutlined, QuestionCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CheckCircleOutlined, WarningOutlined,
  DisconnectOutlined, ExclamationCircleOutlined, PlusOutlined, SendOutlined, CloudUploadOutlined, PlusCircleOutlined,
  ScheduleOutlined, HistoryOutlined, RightOutlined, ReloadOutlined, SettingOutlined, FilterOutlined, MoreOutlined,
  EditOutlined, DeleteOutlined, SunOutlined, WifiOutlined, ClockCircleOutlined, UserOutlined,
} from '@ant-design/icons';

export const MwIcon = {
  // Navigation
  overview: DashboardOutlined,
  mediaLibrary: PictureOutlined,
  playlists: UnorderedListOutlined,
  layouts: LayoutOutlined,
  programs: ProjectOutlined,
  nowNext: PlayCircleOutlined,
  calendar: CalendarOutlined,
  allChannels: ApartmentOutlined,
  liveView: EyeOutlined,
  alerts: BellOutlined,
  systemHealth: HeartOutlined,
  reports: FileTextOutlined,
  analytics: LineChartOutlined,
  brandAssets: SkinOutlined,
  designSystem: BgColorsOutlined,
  // Channel types
  screen: DesktopOutlined,
  tv: FundProjectionScreenOutlined,
  pa: SoundOutlined,
  kiosk: TabletOutlined,
  // Status
  online: CheckCircleOutlined,
  warning: WarningOutlined,
  offline: DisconnectOutlined,
  noHeartbeat: ExclamationCircleOutlined,
  // Actions
  search: SearchOutlined,
  notifications: BellOutlined,
  help: QuestionCircleOutlined,
  collapse: MenuFoldOutlined,
  expand: MenuUnfoldOutlined,
  create: PlusOutlined,
  createPublication: SendOutlined,
  uploadMedia: CloudUploadOutlined,
  addChannel: PlusCircleOutlined,
  scheduleProgram: ScheduleOutlined,
  activity: HistoryOutlined,
  linkArrow: RightOutlined,
  refresh: ReloadOutlined,
  settings: SettingOutlined,
  filter: FilterOutlined,
  more: MoreOutlined,
  edit: EditOutlined,
  delete: DeleteOutlined,
  // Device info
  brightness: SunOutlined,
  network: WifiOutlined,
  time: ClockCircleOutlined,
  user: UserOutlined,
} as const;

export type MwIconName = keyof typeof MwIcon;

/** Channel type → icon, for tables, tiles and filters. */
export const channelTypeIcon = { Screen: MwIcon.screen, TV: MwIcon.tv, PA: MwIcon.pa, Kiosk: MwIcon.kiosk } as const;
