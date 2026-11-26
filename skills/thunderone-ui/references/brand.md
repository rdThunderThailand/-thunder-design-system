# Brand (DS-10)

Source: Figma "[DS] - Design System", page **Brand** ("Thunder One logo — official vector masters", node `8:6`). The masters are the 9 SVG files in Drive *ThunderOne / 01 — Brand / 01 — Logo / SVG* (22 Sep 2026), imported unmodified as Figma components. README Brand Hard Gate: **do not redraw, recolour or distort**.

## Official variants (Figma components)

| Component | Size (1×) | Use |
|---|---|---|
| Logo/Horizontal/Dark text | 172 × 48 | Default signature on light surfaces: login, documents, cards |
| Logo/Horizontal/Light text | 172 × 48 | On navy / dark surfaces (`sidebar-primary`, photos) |
| Logo/Horizontal + Title/Dark text | 249 × 53 | Lockup with a workspace title; the sidebar brand header uses it at 0.74 (184 × 39) with the title replaced by live text (`shell.md`) |
| Logo/Stacked/Dark text, Logo/Stacked/Light text | 101 × 72 | Square-ish spaces (splash, empty brand areas) |
| Logo/Stacked tile/On navy, Logo/Stacked tile/On white | 133 × 120 | Tiles, store/listing art |
| Logo/Mark (app icon)/Black, Logo/Mark (app icon)/White | 96 × 96 | App icon, favicon, avatar, collapsed sidebar (36 × 36), device tiles |

Files in this skill (`assets/brand/`):
| File | Figma variant |
|---|---|
| `thunderone-logo-horizontal-color.svg` | Logo/Horizontal/Dark text |
| `thunderone-logo-horizontal-white.svg` | Logo/Horizontal/Light text |
| `thunderone-mark-t1-dark.svg` | Logo/Mark (app icon)/Black |
| `thunderone-mark-t1-light.svg` | Logo/Mark (app icon)/White |

The stacked, tile and "+ Title" variants are in Figma only; export them from the Brand page (or the Drive SVG folder) when a screen needs them. Never rebuild them.

## Colors in the artwork
- Navy `#010F29` ("T", "Thunder", tiles) = token `brand-navy`.
- "One" and mark gradient `#0551DE → #0444BB`; `#0C60FA` gradient start in the "+ Title" file only; `#374151` "… Workspace" subtitle.
- Decision 2026-11-13: UI primary stays `#286EF9`. The logo blues and `#374151` stay inside the logo files; they are not UI tokens.

## Rules
1. Horizontal lockup is the default signature. Use the T1 mark when space is tight (app icon, favicon, avatar, collapsed sidebar, device tile).
2. Dark-text artwork on light surfaces; light-text / white artwork on navy, dark or photographic surfaces, with enough contrast.
3. Only the official color variants. Never recolor with semantic, status or icon colors.
4. Do not stretch, rotate, distort, add effects, change spacing, rebuild the wordmark as live text, or pair it with unapproved taglines.
5. Always import the SVG file. Never type "Thunder One" in a font to fake the wordmark. (The live workspace name next to the lockup in the sidebar is the one approved live-text element.)

## Open items
- No brand guideline yet (Drive "02 — Brand Guidelines" and "03 — Color & Typography" are empty): clear space and minimum size are not defined. Use the sizes in the table above and ask design before going smaller.
