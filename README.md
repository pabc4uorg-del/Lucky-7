# Lucky 7

Non-betting football goal analytics engine.

## What is included
- Universal pasted-text fixture parser.
- Arbitrary fixture text support using `Team A vs Team B` and common variants.
- Odds are ignored completely.
- eSoccer/virtual/matrix rows are excluded.
- Mobile/PWA-ready frontend.
- Graceful local fallback so a public-source failure cannot stop the run.
- Optional Cloudflare Worker API (`worker.js`) for server-side public-data collection.

## Deployment
1. Put this folder in a GitHub repository.
2. Deploy `index.html`, `fixtures.txt`, and `manifest.webmanifest` to GitHub Pages/Cloudflare Pages.
3. Deploy `worker.js` as a Cloudflare Worker.
4. In the browser console, set `localStorage.LUCKY7_API` to the Worker URL, then reload.

## Important
A static browser page cannot reliably scrape arbitrary public football websites because of CORS, robots rules, and anti-bot controls. The Worker is therefore the connection point for the real public-data layer. The current Worker contains a safe adapter structure and fallback, not a claim that all required last-10/squad/injury data has already been collected.
