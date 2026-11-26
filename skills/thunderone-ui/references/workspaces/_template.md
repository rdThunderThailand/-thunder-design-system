# Workspace profile: <Workspace name> (`<key>`)

Copy this file to `references/workspaces/<key>.md`, fill every section, and add `<key>` to the list in SKILL.md Step 0.
A profile adds to the core (SKILL.md). It never overrides a DS-xx rule; if the design needs that, raise it in `open-decisions.md`.

Product truth: <Product Definition name + version>, <Product Specification name + version>, <approved navigation (G2) source>.
Design source: <Figma file name, file key, page/node>, status <DESIGN APPROVED / IN PROGRESS>.
Code (optional): `@rdthunderthailand/thunderone-theme/workspaces/<key>` exporting `<key>StatusTone`, `<Key>Icon`, `<key>Nav`.

## Identity
- Workspace name in the sidebar brand header: "<Name> Workspace" (English on TH and EN screens).

## Vocabulary (use these exact terms)
- <Object> = <meaning>. Use the same terms as the Product Spec and the approved UI.

## Navigation (Sidebar/Menu/<Workspace>)
Source: <spec section + approved navigation table>.
<Primary item> · <Group>: <items> · …
(Platform utilities such as Help or Notifications are not added here.)

## Page actions and Create
- Left slot: <filter / search / none>.
- Create button opens: <Create menu with items … | Create popup with steps …>.

## Status mapping (DS-04)
| <Workspace> state | Tone |
|---|---|
| <State> | success / warning / danger / info / neutral |

States already in the core map (`tokens.json` `status-map`) keep their tone. Lifecycle states that end users never see do not need one.

## Icon map (in addition to `T1Icon`)
| Concept | Key | lucide |
|---|---|---|
| <Concept> | `<key>` | `<PascalName>` |
Check the icon is in `assets/icons/lucide-icons.txt` (or ask design to add it) and does not remap a platform concept.

## Pages
<Screen ID> <name>: <which core pattern, what is specific>.

## Table column drop order (narrow cards)
<lowest priority first, with breakpoints>

## Workspace components
| Component | Spec |
|---|---|

## Open items
<links to open-decisions.md entries, missing spec sources, assumptions>
