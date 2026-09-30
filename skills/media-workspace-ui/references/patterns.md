# Page patterns

## Domain vocabulary (use these exact terms in UI copy)
- **Channel** = any managed output. Types: **Screens**, **TV**, **PA / Audio**, **Kiosks**.
- **Program** = scheduled content block pushed to channels. **Playlist**, **Layout**, **Media library** = content building blocks.
- **Publication** = a published program/content.
- Status set: **Online**, **Warning**, **Offline**, plus **Live** for currently playing programs.
- Sidebar sections (fixed order): Overview · Content (Media library, Playlists, Layouts) · Programming (Programs, Now & next, Calendar) · Channels (All channels, Screens, TV, PA / Audio, Kiosks) · Monitoring (Live view, Alerts, System health) · Reports & analytics (Reports, Analytics) · Settings (Brand Assets, Design System).

## Dashboard / Overview (reference: node 2019:3868)
1. Toolbar row: segmented filter left, primary actions right.
2. KPI row: 5 KPI cards (Total, Online, Warning, Offline, Delivery success rate).
3. 3-column grid:
   - Col 1: Now playing → Today's schedule → Quick actions → Activity feed
   - Col 2: Next program → Channel health → Channels by type
   - Col 3: Needs attention (tall, list of alerts)
4. Footer: auto refresh · last updated · time zone.

## List / management pages (Media library, Programs, All channels …)
- Same shell. H1 = page name, subtitle = one-line purpose.
- Toolbar: segmented filter or search left, primary "Create …" button right.
- Content in a single card with a table; rows use the alert/schedule row density (43–57px).
- Every table has empty state (icon + one line + primary action), loading skeleton, and error state with retry.

## Copy rules
- Sentence case for headings and buttons ("View all alerts", not "View All Alerts").
- Relative time for recent events ("5m ago"), 24h clock for schedules.
- Locations formatted `Place · Device`.
- Percentages with one decimal ("90.3%").
