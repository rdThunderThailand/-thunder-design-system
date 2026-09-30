# Token conflicts found in Figma (needs a design decision)

The approved screen "MW-01 Overview / 1920w light" (imported from a Lovable build) does **not** use the tokens defined on the "Semantic Colors" page. Until the design team decides, agents follow **tokens.json (Semantic Colors page)**.

| Role | Semantic token (official) | Used on approved screen |
|---|---|---|
| Primary text | text/primary `#111827` | `#0F1727` |
| Secondary text | text/secondary `#374151` | `#5A6475` |
| Default border | border/default `#D1D5DB` | `#DCE2E9` |
| Muted background | bg/primary-strong `#F3F4F6` | `#F0F3F7` |
| Success / online | status/success `#10B981` | `#0FA44D` (bg `#E0FAE4`) |
| Warning | status/warning `#F59E0B` | `#E48300` (bg `#FFF2D4`) |
| Error / offline | status/error `#EF4444` | `#F21823` (bg `#FFE9E6`) |
| Brand | bg/brand, action/primary `#286EF9` | `#286EF9` ✅ match |
| Nav active bg | action/subdued-menu `#E9F4FF` | `#E9F4FF` ✅ match |

Other notes:
- `#286EF9` (brand/action primary) is **not** in the Blue primitive ramp (blue/500 = `#0C60FA`). Either add it to the ramp or point the semantic token at blue/500.
- The "Components Overview" page uses the stock **Ant Design** theme (`#1677FF`, SF Pro, radius 6). It is not the company theme. If the code uses Ant Design, apply the company tokens through `ConfigProvider` theme (`colorPrimary: #286EF9`, `fontFamily: Manrope`, `borderRadius: 12`).
- Semantic layer name typo in Figma: `action/subdud*` should be `action/subdued*` (tokens.json uses the corrected name).
- Font sizes on the approved screen (8–11px body text) look like a scaled-down capture. Confirm the real type scale against the Figma text styles (Display / Heading / Body / Label / Caption / Overline) before shipping.
