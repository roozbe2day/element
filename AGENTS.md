# Horizon Properties — working notes

Premium real-estate marketing site built with **Next.js 15 (App Router) + React 19 +
TypeScript + Tailwind CSS**. No backend, database or external services.

## Run it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Web entry point: **http://localhost:3000** (host port 3000 → container 3000).
- The dev server runs from the bind-mounted source, so edits hot-reload.
- Dependencies install on container start (`npm install`); `node_modules` and `.next`
  live in named volumes so they are not written into the checkout.

## Things that are not obvious

- **`allowedDevOrigins` in `next.config.mjs`.** Next gates dev assets/HMR by `Origin`.
  When `BASE44_PREVIEW_MODE=1`, the config whitelists `3000-${BASE44_PUBLIC_HOST_SUFFIX}`.
  Both variables are passed into the service by compose. With the flag unset the list is
  empty and behaviour is unchanged — do not hardcode either value.
- **Images are local, not hotlinked.** Everything under `public/images/` was downloaded
  from Unsplash at build time and committed, so the site has no runtime third-party
  image dependency. Keep new imagery in `public/images/`.
- **Fonts** are loaded via `next/font/google` (Manrope) — requires network access during
  the dev compile. A system-sans fallback is configured in `tailwind.config.ts`.
- **Favourites** are client-side only (`lib/favorites.tsx`, `localStorage` key
  `horizon:favorites`). Nothing is persisted server-side.
- **Contact and newsletter forms** are client-side only; they show a success state and do
  not post anywhere. Wire them to a real endpoint if the app needs it.
- All property/team content lives in `lib/properties.ts` and `lib/site.ts` — edit there,
  not in components.

## Verify

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/            # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/properties   # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/properties/lakeside-modern-villa
```

Routes: `/`, `/properties`, `/properties/[slug]`, `/about`, `/services`, `/team`,
`/contact`.
