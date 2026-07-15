# Rebuild · Return Athletic

A mobile-first personal training companion for returning to tennis after an Achilles injury. It combines a weekly tennis and gym schedule, Dr. Joe's mobility and lower-limb routines, readiness checks, exercise demos, set tracking, and session history.

Live app: [build.tomnguyen.co/get-fit/](https://build.tomnguyen.co/get-fit/)

## Product behavior

- Monday, Wednesday, and Friday tennis schedule
- Separate Dr. Joe and gym sessions
- Chronological Dr. Joe exercise library with reference videos
- Energy and pain check-ins with load recommendations
- Per-set completion tracking, rest timers, RPE, and local history
- Past and future week navigation
- Installable iPhone Home Screen experience
- Offline shell, standalone safe areas, pull-to-refresh, and a frosted status-bar layer

Training state is intentionally local-first. It is saved under `rebuild-training-v1` in `localStorage`, so it remains on the same browser or installed Home Screen app but does not sync across devices or between Safari and the installed app.

## Stack

- Next.js 16 App Router and React 19
- TypeScript and Tailwind CSS
- `vinext` for the local/Cloudflare-compatible build path
- Vercel production deployment
- Web App Manifest and a small custom service worker

The original training application is served at `/get-fit/`. Keep that route's metadata, manifest, service-worker registration, and public asset URLs pointed at `/get-fit/` so the installed app remains stable. A separate public exercise library is served at `/recovery-library/` with a Vietnamese route at `/recovery-library/vn/`; keep its PWA assets isolated under `public/recovery-library/`.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
npx next build
```

`npm test` builds the app and verifies the rendered interface, training content, PWA metadata, local persistence hooks, and offline assets.

## Main files

- `app/training-data.ts` — weekly schedule, Dr. Joe library, exercises, cues, and video links
- `app/training-app.tsx` — interactive app, local persistence, readiness, timers, history, and Home Screen gestures
- `app/globals.css` — responsive interface and standalone iPhone treatments
- `public/manifest.webmanifest` — install metadata and launch scope
- `public/sw.js` — offline shell and app-update behavior
- `tests/rendered-html.test.mjs` — build and feature regression coverage

## PWA maintenance

The service worker uses a named shell cache. When changing cached shell behavior or assets, increment `CACHE` in `public/sw.js` so installed copies activate the new worker and discard the old shell.

The standalone UI uses both `(display-mode: standalone)` and the iOS `navigator.standalone` fallback. This keeps Home Screen-only safe-area, refresh, and status-bar behavior out of regular Safari.

## Deployment

The production project is deployed on Vercel and served at `build.tomnguyen.co/get-fit/`.

From a Vercel-authenticated checkout linked to the correct project:

```bash
npx vercel --prod
```

The local `.vercel` directory is intentionally ignored because project linkage is machine-specific. Confirm the target project before deploying a fresh checkout.

## Training-content note

This repository reflects one person's clinician-guided return-to-sport plan. Exercise selection, pain rules, and weekly load should be reviewed with the relevant medical or rehabilitation professional before adapting it for someone else.
