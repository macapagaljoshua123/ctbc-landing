# CTBC Landing Page (Frontend Only)

React + Vite recreation of the CTBC Bank landing page Figma export. No
backend — the 3 endpoints it depends on are mocked in `src/api/mockApi.js`
and documented in `API_DESIGN.md`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL.

## Project structure

```
src/
  api/mockApi.js        -> 3 mocked endpoints (hero, market-rates, news)
  components/           -> one component per section
  App.jsx                -> fetches mock data, composes the page
API_DESIGN.md             -> endpoint contracts for the 3 APIs
```

## Push to a repo

```bash
git init
git add .
git commit -m "CTBC landing page - frontend + mock API design"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Notes / next steps

- Real images: drop your files straight into `public/assets/` using the
  exact filenames listed in `public/assets/README.md` — the hero, the
  Business Banking header band, and the news thumbnails all already
  reference those paths, so nothing else needs to change.
- Swap the functions in `mockApi.js` for real `fetch()` calls once a
  backend exists — no component changes needed, since components only
  ever see `{ status, data }`.
- Notice bar now lives directly above the footer (not in the navbar),
  matching the Figma.
