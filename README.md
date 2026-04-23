# Quiet Arrow

Quiet Arrow is a mobile-first travel companion for a Lake Arrowhead getaway from Thursday, April 30, 2026 through Sunday, May 3, 2026. It is designed as a calm, Apple-inspired PWA with seeded trip data for writing sessions, grill meals, pug pacing, nearby places, notes, and offline-ready checklists.

## Name Options

- Quiet Arrow
- Pines & Pages
- Blue Jay Weekend
- Slow Cabin
- Arrowhead Edit

Quiet Arrow is the chosen app name and the one used throughout the build.

## What’s Included

- Personalized Today dashboard with trip status, weather placeholder, and next-up actions
- Editable day-by-day itinerary for Thursday through Sunday
- Grill-focused recipes plus breakfast ideas
- Persistent grocery checklist grouped for shopping
- Nearby places with map links and save/favorite state
- Writing mode with timer and per-day session plan
- Pug checklist and pacing reminders
- Packing list
- Persistent notes and trip log
- PWA manifest, service worker, and install hooks

## File Structure

- [index.html](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/index.html)
- [styles.css](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/styles.css)
- [app.js](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/app.js)
- [trip-data.js](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/trip-data.js)
- [manifest.webmanifest](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/manifest.webmanifest)
- [sw.js](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/sw.js)
- [assets/icons/icon-app.svg](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/assets/icons/icon-app.svg)

## Running Locally

For layout preview only, opening `index.html` directly works.

For real PWA behavior, serve the folder over HTTP locally:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Install on iPhone

PWA install and offline cache work when the app is hosted over HTTPS.

1. Deploy this folder to a static host.
2. Open the deployed URL in Safari on your iPhone.
3. Tap `Share`.
4. Tap `Add to Home Screen`.
5. Launch Quiet Arrow from the Home Screen for standalone mode.

## Deployment

Any static host works. Good options:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Because this is a static PWA, deployment is just uploading the folder contents.

## Replacing the Seeded Trip Data

All trip-specific content lives in [trip-data.js](/Users/kuzzz/Documents/Codex/2026-04-22-im-heading-to-lake-arrow-head/trip-data.js).

Update that file to change:

- dates
- itinerary
- recipes
- grocery list
- places
- packing lists
- weather placeholder

## Notes About Live Data

- The public Airbnb link used here does not expose the exact address, so place recommendations are centered on Lake Arrowhead Village and Blue Jay.
- The weather module is intentionally seeded with placeholder forecast values and a clear integration point in `trip.weather`.
- Service worker caching works only over `http://localhost` or `https`, not `file://`.
