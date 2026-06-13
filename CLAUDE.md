# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via Next.js
```

No test suite is configured.

## Environment Variables

Required in `.env.local`:

- `CLOUDINARY_URL` — full Cloudinary API URL (used server-side for asset fetching)
- `CLOUDINARY_CLOUD_NAME` — cloud name for constructing Cloudinary URLs
- `NEXT_PUBLIC_MAPS_API_KEY` — Google Maps API key
- `NEXT_PUBLIC_MARKERS_JSON_URL` / `NEXT_PUBLIC_TICKETS_JSON_URL` — URL to external JSON file with event/gig data
- `NEXT_PUBLIC_VIDEOS_JSON_URL` — Cloudinary path or full URL to YouTube playlist JSON
- `NEXT_PUBLIC_PIXEL_ID` — Facebook Pixel ID (optional)

## Architecture

This is a **Next.js 14 App Router** site for the band *Old Time Sailors*. All content (images, audio, video) is hosted on **Cloudinary**; there is no database or CMS — data comes from Cloudinary folders and external JSON files.

### Route groups & layouts

- `(landing)/` — landing page only. Uses `LandingWrapper` (NextUI + LoaderProvider). Assets fetched server-side directly from Cloudinary API at request time.
- `(pages)/` — all other pages. Uses `PagesWrapper` (NextUI + LoaderProvider + NavbarColorProvider + Navbar).
  - `/media` — server component; fetches songs, videos, photos from Cloudinary folders and a YouTube JSON file, then passes data down to client wrappers.
  - `/tickets` — selector page that routes to `/tickets/calendar-view` or `/tickets/map-view`.
  - `/tickets/[event]` — dynamic client page; resolves event by ID or slugified name.
  - `/services`, `/reviews`, `/our-clients`, `/memberships` — static or lightly data-driven pages.

### Data flow

1. **Server components** (pages) fetch from Cloudinary or `/api/event` and pass data as props.
2. **Client wrappers** (`MediaWrapper`, `LandingWrapper`, `PagesWrapper`) inject context providers.
3. **Context** (`MediaContext`, `MusicPlayerContext`) holds playback and modal state for the media page.
4. **In-memory cache** (`src/lib/cache.js`) — singleton `CacheStore` with per-key TTL. Used in both API routes and server components to avoid repeated Cloudinary calls. TTLs: media 24 h, events 1 h, YouTube JSON 12 h.

### Key conventions

- **Asset discovery**: landing page resolves Cloudinary assets by filename matching against `ASSET_KEYS` lists (e.g. any file named `logo`, `instagram`, `border` in the right folder). No hard-coded URLs.
- **Event data normalization**: `src/app/api/event/route.js` normalizes inconsistent field names (e.g. `event`/`eventName`, `gigStartTime`/`from`) from the external JSON into a stable shape.
- **Media merging**: Cloudinary videos and YouTube videos are merged and deduplicated in `src/app/(pages)/media/page.js`.
- **Audio playback**: Howler.js is lazy-loaded (dynamic import) only when the music modal opens, then managed entirely through `MusicPlayerContext`.
- **Tailwind custom screens**: many non-standard breakpoints are defined (`md1`, `md2`, `1xl`, `1xxl`, `2k`, `4k`, etc.) — check `tailwind.config.js` before writing responsive classes.
- **Dynamic imports with `ssr: false`**: `PhotosDisplay`, `VideoPlayer`, `MusicPlayer`, and `SplideCarousel` are all client-only and loaded lazily on the media page.
- **`'use client'` boundary**: wrappers and context providers are all client components; pages themselves are server components where possible.
