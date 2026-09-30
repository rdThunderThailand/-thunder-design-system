# Working on this repo

This repo is the design system itself. Rules for anyone (person or agent) changing it:

- `skills/media-workspace-ui/tokens.json` is the only place values are defined. After editing it, run `npm run build:tokens` and commit the regenerated files.
- Never edit generated files: `packages/mw-theme/src/tokens.ts`, `global.css`, `tailwind/*`, and everything in `skills/media-workspace-ui/assets/code/` except `App.example.tsx` and `tailwind/tailwind.config.example.ts`.
- Hand-written code: `packages/mw-theme/src/antd.ts`, `src/icons.tsx`, `src/index.ts`, `bin/mw-setup.mjs`, `scripts/*`.
- `npm test` must pass before a PR. It fails if a derived file is stale or a color is not a token.
- Keep `SKILL.md` short and imperative. Detail goes in `references/`.
- `AGENTS.snippet.md` is what gets written into other projects' AGENTS.md. Keep it under ~20 lines.
- Release by tag `vX.Y.Z` matching `packages/mw-theme/package.json`.
