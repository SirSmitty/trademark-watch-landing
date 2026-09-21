# Trademark Watch — Landing Page

A demand-test landing page for **Trademark Watch**, a planned SaaS product that
monitors new USPTO trademark filings against marks, owners, and classes you
care about, and emails you the moment something matches.

## What this is

This is a static site — `index.html` (markup + styles) and `main.js` (signup
handling + motion) — no build step, no backend, no dependencies to install.
It's designed to validate market interest before building the real product.
The page leads with the white-label offer for small IP firms; direct plans for
individuals are secondary.

- Signups are POSTed to a Google Apps Script web app (`SIGNUP_ENDPOINT` in
  `main.js`) that appends a row to a Google Sheet. Fields: `name`, `email`,
  `plan`, `isFirm`.
- Motion is done with [GSAP](https://gsap.com/) + ScrollTrigger, loaded from
  cdnjs, and fully respects `prefers-reduced-motion`.
- Typography: Archivo, IBM Plex Sans, IBM Plex Mono (Google Fonts).

## Running locally

Just open `index.html` in a browser. To serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Live at [trademarkwatch.cascade-ip.com](https://trademarkwatch.cascade-ip.com),
served via GitHub Pages with a custom subdomain (see the `CNAME` file). As a
static file, it could just as easily be hosted anywhere else: Netlify, Vercel,
Cloudflare Pages, or any static host.

## Notes

- Contact email throughout: `ethan@cascade-ip.com`.
- This is a market-validation page, not the product itself.
