# crosspasta

compose a shortform post once, then send it to twitter, bluesky, threads, mastodon, reddit, manifold and more via each site's share url.

live at [crosspasta.com](https://crosspasta.com). plain js + vite, no frameworks.

## run locally

opening `index.html` straight from disk won't work (`src/main.js` imports `style.css`), so run it through vite:

```sh
bun install
bun run dev
```

no bun? npm works too. `npm run dev` calls `bunx`, so start vite directly:

```sh
npm install
npx vite
```

then open the url vite prints (http://localhost:5173 by default).

## other scripts

- `bun run build` - production build into `dist/`
- `bun run preview` - serve the built `dist/`
- `bun run lint` - biome check with auto-fix
- `bun run format` - biome format

the `dist/` build deploys as a static SPA (cloudflare pages).

see `knowledge.md` for code style notes. the platform buttons and their share urls live in `index.html`.
