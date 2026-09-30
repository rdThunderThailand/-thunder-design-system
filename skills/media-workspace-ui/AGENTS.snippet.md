## ThunderOne design system (Media Workspace)

Any UI work in this project MUST follow the `media-workspace-ui` skill (`.agents/skills/media-workspace-ui/SKILL.md`). Read it before creating or editing screens or components.

Always-on rules:
- Theme comes from `@rdthunderthailand/mw-theme`. Ant Design: `import { mwTheme } from '@rdthunderthailand/mw-theme/antd'` in `<ConfigProvider theme={mwTheme}>` and `import '@rdthunderthailand/mw-theme/global.css'`. Tailwind/shadcn: the preset `@rdthunderthailand/mw-theme/tailwind/preset` (v3) or `@rdthunderthailand/mw-theme/tailwind/v4.css` (v4). Never write your own theme, never ship Ant Design's default #1677FF theme, never use Tailwind's default palette or arbitrary hex classes.
- No hardcoded colors, font sizes, radii or shadows. Use tokens.
- App shell is fixed: sidebar 224px, header 69px, content padding 24px, card gap 12px, card radius 16px.
- Status colors only from status tokens (online / warning / offline / live).
- Font: Manrope. Brand/primary: #286EF9.
- Icons: `@ant-design/icons` through `MwIcon` from `@rdthunderthailand/mw-theme/icons`. Logos: only the SVGs in `@rdthunderthailand/mw-theme/brand/` or the skill's `assets/brand/`.
- Reuse existing components; if one is missing, say so instead of inventing a new style.
- Sentence case for all UI copy; 24h time; show the time zone in the footer.

Design source of truth: Figma `Rev.2 - Media Workspace`. Design system repo: https://github.com/rdThunderThailand/-thunder-design-system
