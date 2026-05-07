# Stepproof

Static-path **landing page** at **bilko.run/projects/stepproof/**. Marketing/docs only — the actual `npx stepproof` CLI lives in a separate repo. No auth, no credits, no router.

## Layout
- `src/main.tsx` — React mount point.
- `src/StepproofPage.tsx` — the page (copied from `~/Projects/Bilko/src/pages/StepproofPage.tsx` at extraction time).
- `src/kit.ts` — slim `track()` posting to `bilko.run/api/analytics/event` same-origin.
- `src/index.css` — Tailwind + palette.
- `.mcp.json` — wires the `bilko-host` MCP into Claude sessions in this repo.

## Commands
- `pnpm dev` — local on `http://localhost:5173`.
- `pnpm build` — emit `dist/`.
- `pnpm sync` — `rm -rf ../Bilko/public/projects/stepproof && cp -r dist ../Bilko/public/projects/stepproof`.

## Deploy
Static-path sibling of Bilko. `pnpm build && pnpm sync`, then commit + push from `~/Projects/Bilko` to both remotes. Or use the `bilko-host` MCP from this session.

## Conventions
- This repo is the **page**, not the product. Don't add YAML parsing, runners, or assertion engines — those belong in the CLI repo. If a feature should ship to users, it goes in the CLI; if it's about explaining the CLI, it goes here.
- Vite `base: '/projects/stepproof/'`.
- TS strict. Tailwind v4 (`@tailwindcss/vite`). No router.
- See `~/Projects/Bilko/docs/host-contract.md` for the static-path contract.
