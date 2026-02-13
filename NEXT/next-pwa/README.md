# Next.js PWA - Offline Architecture

PWA setup with **Service Worker**, **Cache Storage**, and **IndexedDB** using Next.js + Serwist.

## Architecture

```
Browser
 ├── Cache Storage (Serwist)
 │     ├ index.html
 │     ├ app.js
 │     ├ styles.css
 │     └ static assets
 │
 ├── IndexedDB
 │     ├ user data
 │     ├ offline posts
 │     └ sync queue
 │
 └── Service Worker
       ├ intercept fetch
       ├ serve cache
       └ fallback to /~offline
```

## What's Included

| Layer | Purpose |
|-------|---------|
| **Service Worker** | Intercepts requests, returns cached responses, decides network vs cache |
| **Cache Storage** | Stores HTML, JS, CSS, images, fonts |
| **IndexedDB** | Stores app data, user content, offline mutations queue |

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Go offline (DevTools → Network → Offline) and reload – the app keeps working.

## Scripts

- `npm run dev` – Start dev server (webpack, required for Serwist)
- `npm run build` – Production build
- `npm run start` – Run production server

## Key Files

- `src/app/sw.ts` – Service worker (Serwist config)
- `src/app/manifest.ts` – Web app manifest
- `src/app/(offline)/~offline/page.tsx` – Offline fallback page
- `src/lib/db.ts` – IndexedDB stores (user data, sync queue)
- `next.config.ts` – Serwist plugin config

## Add PWA Icons

For install prompts, add icons to `public/`:
- `icon-192.png` (192×192)
- `icon-512.png` (512×512)

Then update `src/app/manifest.ts` with the correct paths.
