# Stepproof

Marketing/landing page for **Stepproof** — regression tests for AI pipelines via YAML scenarios. The actual `npx stepproof` CLI lives at [github.com/StanislavBG/stepproof](https://github.com/StanislavBG/stepproof) (or wherever the npm package is published).

This repo is the static-path sibling that gets served at **bilko.run/projects/stepproof/** by the [bilko-run host](https://github.com/StanislavBG/bilko-run).

## Build + sync

```bash
pnpm install
pnpm build              # emits dist/
pnpm sync               # copies dist/ to ../Bilko/public/projects/stepproof/
```

Or, from a Claude session in this repo, use the `bilko-host` MCP — it'll register the project, copy the build output, commit, and push to both remotes for you.

## Architecture

- Pure static React 18 + Vite 6 + Tailwind v4. No router. No auth. No credits.
- Calls `track()` for page-view analytics, posting to `bilko.run/api/analytics/event` same-origin.
- Vite `base: /projects/stepproof/` so all assets resolve under that path.

## Files

- `src/StepproofPage.tsx` — the page (copied from `~/Projects/Bilko/src/pages/StepproofPage.tsx` at extraction time)
- `src/main.tsx` — mount point
- `src/index.css` — Tailwind + warm/fire palette tokens
- `src/kit.ts` — slim `track()` to host analytics
- `vite.config.ts` — base path + tailwind plugin
- `.mcp.json` — wires up `bilko-host` MCP for self-publish from a Claude session
