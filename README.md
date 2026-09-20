# Trademark Watch — Landing Page

A demand-test landing page for **Trademark Watch**, a planned SaaS product that
monitors new USPTO trademark filings against marks, owners, and classes you
care about, and emails you the moment something matches.

## What this is

This is a single static HTML file (`index.html`) — no build step, no backend,
no dependencies to install. It's designed to validate market interest before
building the real product.

- Signups are captured via a `mailto:` link (no server, no database) —
  submitting the form opens the visitor's email client with a pre-filled
  message, with a copy-to-clipboard fallback if that doesn't work.
- Motion is done with [GSAP](https://gsap.com/) + ScrollTrigger, loaded from
  cdnjs, and fully respects `prefers-reduced-motion`.
- Typography: Archivo, IBM Plex Sans, IBM Plex Mono (Google Fonts).

## Running locally

Just open `index.html` in a browser — it's fully self-contained. To serve it
locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

This is a static file, so it can be hosted anywhere: GitHub Pages, Netlify,
Vercel, Cloudflare Pages, or any static host.

## Notes

- The contact email throughout (`hello@trademarkwatch.example`) is a
  placeholder — swap it for a real inbox before sending real traffic to this
  page.
- This is a market-validation page, not the product itself.
