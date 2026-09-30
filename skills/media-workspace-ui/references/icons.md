# Icons

**Library:** Ant Design Icons (`@ant-design/icons`). The Figma page "Assets Icon" contains the full Ant Design set in three styles: **Outlined** (default, 446 icons), **Filled**, and **Two Tone**. The full Outlined list is in `assets/icons/antd-outlined-icons.txt`.

## Rules
1. Use **Outlined** by default. Use **Filled** only for active or selected state (e.g. the active nav item, a toggled star). Do not use **Two Tone** in product UI.
2. Import from `@ant-design/icons`. Do not copy SVG paths into components, and do not mix in another icon library (lucide, heroicons, material). If an icon is missing, ask design instead of using another set.
3. Sizes: 12 (link arrows), 14 (inline rows, alert icon), 16 (nav, buttons, header), 20 (channel type tiles). Set with `style={{ fontSize: 16 }}`.
4. Color is inherited (`currentColor`). Use text tokens, or `status.*` tokens inside status icon boxes. Never recolor the brand mark with an icon color.
5. Icon-only buttons must have `aria-label`.

## Media Workspace icon map (use these exact icons)
| Concept | Figma name | React |
|---|---|---|
| Overview | `dashboard` | `<DashboardOutlined />` |
| Media library | `picture` | `<PictureOutlined />` |
| Playlists | `unordered-list` | `<UnorderedListOutlined />` |
| Layouts | `layout` | `<LayoutOutlined />` |
| Programs | `project` | `<ProjectOutlined />` |
| Now & next | `play-circle` | `<PlayCircleOutlined />` |
| Calendar | `calendar` | `<CalendarOutlined />` |
| All channels | `apartment` | `<ApartmentOutlined />` |
| Screens | `desktop` | `<DesktopOutlined />` |
| TV | `fund-projection-screen` | `<FundProjectionScreenOutlined />` |
| PA / Audio | `sound` | `<SoundOutlined />` |
| Kiosks | `tablet` | `<TabletOutlined />` |
| Live view | `eye` | `<EyeOutlined />` |
| Alerts | `bell` | `<BellOutlined />` |
| System health | `heart` | `<HeartOutlined />` |
| Reports | `file-text` | `<FileTextOutlined />` |
| Analytics | `line-chart` | `<LineChartOutlined />` |
| Brand Assets | `skin` | `<SkinOutlined />` |
| Design System | `bg-colors` | `<BgColorsOutlined />` |
| Search | `search` | `<SearchOutlined />` |
| Notifications | `bell` | `<BellOutlined />` |
| Help | `question-circle` | `<QuestionCircleOutlined />` |
| Collapse sidebar | `menu-fold` | `<MenuFoldOutlined />` |
| Expand sidebar | `menu-unfold` | `<MenuUnfoldOutlined />` |
| Online | `check-circle` | `<CheckCircleOutlined />` |
| Warning | `warning` | `<WarningOutlined />` |
| Offline / connection lost | `disconnect` | `<DisconnectOutlined />` |
| No heartbeat | `exclamation-circle` | `<ExclamationCircleOutlined />` |
| Create | `plus` | `<PlusOutlined />` |
| Create publication | `send` | `<SendOutlined />` |
| Create playlist | `unordered-list` | `<UnorderedListOutlined />` |
| Create program | `project` | `<ProjectOutlined />` |
| Upload media | `cloud-upload` | `<CloudUploadOutlined />` |
| Add channel | `plus-circle` | `<PlusCircleOutlined />` |
| Schedule program | `schedule` | `<ScheduleOutlined />` |
| Activity | `history` | `<HistoryOutlined />` |
| Date range | `calendar` | `<CalendarOutlined />` |
| View all / link arrow | `right` | `<RightOutlined />` |
| Refresh | `reload` | `<ReloadOutlined />` |
| Settings | `setting` | `<SettingOutlined />` |
| Filter | `filter` | `<FilterOutlined />` |
| More actions | `more` | `<MoreOutlined />` |
| Edit | `edit` | `<EditOutlined />` |
| Delete | `delete` | `<DeleteOutlined />` |
| Brightness | `sun` | `<SunOutlined />` |
| Wi-Fi / network | `wifi` | `<WifiOutlined />` |
| Time | `clock-circle` | `<ClockCircleOutlined />` |
| User | `user` | `<UserOutlined />` |

> The concept → icon mapping above is a proposal built from the Ant Design set in Figma. Design has not signed it off yet. The approved Overview screen was imported from Lovable and may use other icons; when you rebuild it, use this table.
