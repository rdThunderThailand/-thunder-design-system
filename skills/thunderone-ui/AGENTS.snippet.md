## ThunderOne design system

ThunderOne workspace: {{WORKSPACE}}

Any UI work in this project MUST follow the `thunderone-ui` skill (`.agents/skills/thunderone-ui/SKILL.md`) and its Workspace profile `references/workspaces/{{WORKSPACE}}.md`. Read both before creating, editing or reviewing screens or components.

Always-on rules:
- Stack: shadcn/ui + Tailwind + `lucide-react`. Theme from `@rdthunderthailand/thunderone-theme` (`…/tailwind/v4.css`, or preset + `shadcn.css` on v3). Never write your own theme, never use stock shadcn colors, Tailwind's default palette or arbitrary values (`bg-[#…]`, `text-[13px]`).
- Tokens only: `bg-primary`, `text-muted-foreground`, `rounded-xl`, `shadow-panel`, text styles like `text-title-page`. Light theme only.
- App shell is fixed: sidebar 224 (rail 68, drawer 256), header 68, `main` px-6 py-5, Page actions row, Status bar at the bottom. Card gap 16, card radius 16. Sidebar menu comes from the Workspace profile.
- Status: StatusBadge with five tones (success / warning / danger / info / neutral) via `statusTone()` and the profile map. Never use status colors for categories or tags.
- Type: Manrope + Anuphan (Thai); set `lang` on `<html>`. Icons: lucide from the design-system set via `T1Icon` or the Workspace map. Logos: only the official SVGs.
- Every data surface has loading, empty and error states (per card). Reuse `ui/*` and `design-system/*` components; if one is missing, say so.
- Sentence case, 24h time, the Workspace's exact vocabulary. Must work at 1280×800.

Design system repo: https://github.com/rdThunderThailand/-thunder-design-system
