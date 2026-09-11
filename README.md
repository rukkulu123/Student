# Aurelia — AI Study Companion (Frontend)

A React + TypeScript + Vite frontend for an AI-powered learning workspace:
Spaces → Projects → Materials → Knowledge → Tutor → Quiz → Assessment →
Mastery → Growth → Analytics → Recommendation → Continue Learning.

The app runs fully standalone against an in-memory mock backend — no API
required to explore it. See `FRONTEND.md` for architecture, the
requirement-to-screen traceability matrix, and known limitations.

## Quickstart

```bash
npm install
npm run dev
```

Open http://localhost:5173. Sign in with any email/password — the demo
form is pre-filled. Use an email containing "admin" (e.g.
`admin@aurelia.app`) to preview the admin dashboard at `/admin`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm test` — run the Vitest test suite
- `npm run lint` — run ESLint

## Connecting a real backend

The app defaults to mock mode (`VITE_MOCK_MODE=true`), served entirely
from `src/mocks`. To connect a real FastAPI (or other REST) backend:

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` to your backend's base URL.
3. Set `VITE_MOCK_MODE=false`.

No component code needs to change — every function in `src/api/*.ts`
already has a real `axios` call written alongside its mock branch.
