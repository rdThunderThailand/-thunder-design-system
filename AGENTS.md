# Working on this repo

This repo is the ThunderOne design system, shared by every Workspace. Rules for anyone (person or agent) changing it:

- `skills/thunderone-ui/tokens.json` is the only place values are defined. After editing it, run `npm run build:tokens` and commit the regenerated files.
- Never edit generated files: `packages/thunderone-theme/src/tokens.ts`, `global.css`, `tailwind/*`, and everything in `skills/thunderone-ui/assets/code/` except `App.example.tsx` and `tailwind/tailwind.config.example.ts`.
- Hand-written code: `packages/thunderone-theme/src/antd.ts`, `src/icons.tsx`, `src/index.ts`, `src/workspaces/*`, `bin/setup.mjs`, `scripts/*`.
- Core vs Workspace: the core (`SKILL.md`, `references/*.md`, `tokens.json`, `antd.ts`, `icons.tsx`) must stay Workspace-neutral. Domain vocabulary, nav, icons and status mappings go in `references/workspaces/<key>.md` (and `src/workspaces/<key>.tsx` when code is needed). `npm test` flags domain terms in core docs.
- New Workspace: copy `references/workspaces/_template.md`, add the key to SKILL.md Step 0 "Available:", and, if it ships code, add `./workspaces/<key>` to the package `exports`.
- Rule IDs (DS-xx) and open decisions (OD-xx) are cited by reviews and QC reports. Never renumber them; retire an ID instead of reusing it.
- `npm test` must pass before a PR. It fails if a derived file is stale, a color is not a token, a listed profile is missing, or core docs contain Workspace terms.
- Keep `SKILL.md` short and imperative. Detail goes in `references/`.
- `AGENTS.snippet.md` is what gets written into other projects' AGENTS.md. Keep it under ~20 lines. `{{WORKSPACE}}` is filled by the setup CLI.
- Release by tag `vX.Y.Z` matching `packages/thunderone-theme/package.json`.
