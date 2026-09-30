/* Copy of packages/mw-theme/src/antd.ts, synced by scripts/build.mjs. Prefer: npm i @rdthunderthailand/mw-theme */
/**
 * Media Workspace — Ant Design theme (antd v5).
 * Hand-written mapping from design tokens to antd. Values come from ./tokens (generated from tokens.json).
 *
 *   import { ConfigProvider, App } from 'antd';
 *   import { mwTheme } from '@rdthunderthailand/mw-theme/antd';
 *   <ConfigProvider theme={mwTheme}><App>...</App></ConfigProvider>
 */
import type { ThemeConfig } from 'antd';
import { mwTokens } from './mw-tokens';

export { mwTokens };

/** Media Workspace channel states → antd Badge `status` + tokens. Never invent other status colors. */
export const mwStatus = {
  online: { label: 'Online', badge: 'success', color: mwTokens.status.success, bg: mwTokens.status.successBg },
  live: { label: 'Live', badge: 'success', color: mwTokens.status.success, bg: mwTokens.status.successBg },
  warning: { label: 'Warning', badge: 'warning', color: mwTokens.status.warning, bg: mwTokens.status.warningBg },
  offline: { label: 'Offline', badge: 'error', color: mwTokens.status.error, bg: mwTokens.status.errorBg },
  scheduled: { label: 'Scheduled', badge: 'processing', color: mwTokens.status.info, bg: mwTokens.status.infoBg },
  processing: { label: 'Processing', badge: 'processing', color: mwTokens.status.inProgress, bg: mwTokens.status.inProgressBg },
} as const;
export type MwStatus = keyof typeof mwStatus;

const t = mwTokens;

export const mwTheme: ThemeConfig = {
  cssVar: true,
  hashed: false,
  token: {
    // Brand & semantic
    colorPrimary: t.action.primary,
    colorInfo: t.status.info,
    colorSuccess: t.status.success,
    colorWarning: t.status.warning,
    colorError: t.status.error,
    colorLink: t.text.brand,
    colorLinkHover: t.action.primaryHover,
    colorLinkActive: t.action.primaryPressed,

    // Text
    colorText: t.text.primary,
    colorTextHeading: t.text.primary,
    colorTextSecondary: t.text.secondary,
    colorTextTertiary: t.text.tertiary,
    colorTextQuaternary: t.text.tertiary,
    colorTextPlaceholder: t.text.tertiary,
    colorTextDisabled: t.text.tertiary,

    // Surfaces & borders
    colorBgLayout: t.bg.primary,
    colorBgContainer: t.surface.default,
    colorBgElevated: t.surface.default,
    colorBgSpotlight: t.surface.overlay,
    colorFillTertiary: t.bg.primaryStrong,
    colorFillQuaternary: t.bg.primary,
    colorBorder: t.border.default,
    colorBorderSecondary: t.border.subtle,
    colorSplit: t.border.subtle,
    controlOutline: t.action.subduedMenu,
    controlItemBgActive: t.action.subduedMenu,
    controlItemBgHover: t.bg.primaryStrong,

    // Type
    fontFamily: t.font,
    fontSize: 14,
    fontSizeSM: 12,
    fontSizeLG: 16,
    fontSizeHeading1: 30,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    fontWeightStrong: 700,

    // Shape & size
    borderRadiusXS: t.radius.xs,
    borderRadiusSM: t.radius.md,
    borderRadius: t.radius.lg,
    borderRadiusLG: t.radius.xl,
    controlHeight: 32,
    controlHeightSM: 24,
    controlHeightLG: 40,
    boxShadow: t.shadow.dropdown,
    boxShadowSecondary: t.shadow.dropdown,
    boxShadowTertiary: t.shadow.card,
  },
  components: {
    Layout: { siderBg: t.surface.default, headerBg: 'rgba(249, 250, 251, 0.95)', headerHeight: t.layout.header, headerPadding: `0 ${t.layout.contentPaddingX}px`, bodyBg: t.bg.primary },
    Menu: {
      itemHeight: 32, itemBorderRadius: t.radius.md, itemMarginInline: 8, iconSize: 16,
      itemColor: t.text.secondary, itemHoverColor: t.text.primary, itemHoverBg: t.bg.primaryStrong,
      itemSelectedBg: t.action.subduedMenu, itemSelectedColor: t.action.primary,
      groupTitleColor: t.text.secondary, groupTitleFontSize: 11,
    },
    Button: { fontWeight: 600, primaryShadow: 'none', defaultShadow: 'none', dangerShadow: 'none' },
    Card: { borderRadiusLG: t.radius.xl, paddingLG: t.layout.cardPadding, headerFontSize: 14, boxShadowTertiary: t.shadow.card },
    Table: {
      headerBg: t.bg.primary, headerColor: t.text.secondary, headerSplitColor: 'transparent',
      rowHoverBg: t.bg.primary, rowSelectedBg: t.action.subduedMenu, rowSelectedHoverBg: t.action.subdued2,
      cellPaddingBlock: 12, borderColor: t.border.subtle,
    },
    Segmented: { trackBg: t.bg.primaryStrong, itemSelectedColor: t.text.primary, itemColor: t.text.secondary },
    Input: { activeShadow: `0 0 0 3px ${t.action.subduedMenu}` },
    Select: { optionSelectedBg: t.action.subduedMenu, optionSelectedFontWeight: 600 },
    Tag: { defaultBg: t.surface.default, defaultColor: t.text.secondary },
    Badge: { dotSize: 6, statusSize: 6 },
    Drawer: { paddingLG: 20 },
    Modal: { borderRadiusLG: t.radius.xl },
    Tooltip: { colorBgSpotlight: t.surface.overlay },
    Descriptions: { labelColor: t.text.secondary },
  },
};

export default mwTheme;
