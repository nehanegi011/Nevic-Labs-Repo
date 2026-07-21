<<<<<<< HEAD
# Nevic Labs — React (Vite) site

A faithful React port of the Nevic Labs static HTML marketing site. Same content, copy, styling, SEO metadata, and behaviour — rebuilt as a routed single-page app with reusable components.

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Tech stack

- **Vite + React 18**
- **react-router-dom v6** — client-side routing with clean paths
- **react-helmet-async** — per-route `<title>` + `<meta description>`
- **Plain CSS** — the original `src/styles/main.css` is kept as-is (token-driven, responsive)
- **Local Montserrat fonts** — served from `public/assets/fonts/montserrat/`

## Where content lives

| What | Where |
|---|---|
| Page content (marketing/legal pages) | `src/pages/_content/*.html` — exact ported fragments, injected by the matching `src/pages/*.jsx` wrapper |
| Per-route SEO title + description | `src/data/pageMeta.js` (auto-generated) |
| Blog posts (data-driven) | `src/data/posts.json` — the blog index and every `/blog/:slug` page render from this |
| Global styles + design tokens | `src/styles/main.css` |
| Images, logos, fonts, blog covers | `public/assets/` (referenced as `/assets/...`) |
| Sitemap / robots | `public/sitemap.xml`, `public/robots.txt` (base URL `https://www.neviclabs.com`) |

## Project structure

```
src/
├── main.jsx                     # ReactDOM root + Router + HelmetProvider
├── App.jsx                      # all routes, wrapped in <Layout>
├── styles/main.css              # original global stylesheet (asset URLs -> /assets/...)
├── data/
│   ├── posts.json               # blog data (verbatim from source)
│   └── pageMeta.js              # generated per-route SEO metadata
├── components/
│   ├── layout/  Layout, Header, Footer, ScrollToTop, Seo
│   ├── ui/      PageContent
│   └── blog/    PostCard, PostBody
└── pages/       Home, Solutions(+3), Products(+3), About, Careers,
                 Contact, Faq, Privacy, Terms, Blog, BlogPost, NotFound
                 └── _content/   extracted HTML fragments per page
```

## Routes

`/` · `/solutions` · `/solutions/opd-management` · `/solutions/patient-engagement` · `/solutions/digital-marketing` · `/solutions/health-records` · `/products` · `/products/pulse` · `/products/connect` · `/products/reach` · `/about` · `/careers` · `/contact` · `/faq` · `/privacy` · `/terms` · `/blog` · `/blog/:slug` · `*` (404)

## Regenerating ported content

If the source HTML changes, re-run the extractor (paths are hardcoded to the source folder inside the script):

```bash
npm run extract
```

This rewrites `src/pages/_content/*.html` and `src/data/pageMeta.js` — rewriting internal links to clean routes, asset paths to `/assets/...`, and stripping inline scripts.

## Implementation notes

- **Page content strategy.** Layout chrome (header, footer), the blog, the FAQ groupings, and SEO are true React components. The bespoke marketing/legal page bodies are rendered from their exact source HTML via a small `PageContent` component (`dangerouslySetInnerHTML`) so the copy and markup are byte-faithful to the original. Internal links inside that content are intercepted in `Layout` and routed through react-router (no full page reloads).
- **Blog is data-driven.** The 11 hand-written `blog/posts/*.html` files are replaced by a single `BlogPost` component that renders from `posts.json`.
- **Footer.** The source site had slightly different footers per page; this port uses the `index.html` footer as the single canonical `Footer`.
- **Scroll-reveal.** The original `IntersectionObserver` reveal was intentionally not reimplemented; the source CSS has no rules that hide `.reveal` content, so everything is visible by default.
- **Contact form.** The JotForm iframe is preserved; its auto-resize handler is re-injected in `Contact.jsx` (inline scripts don't run inside injected HTML).
=======
# Nevic-Labs-Repo
React application for Nevic Labs
>>>>>>> 23285a58011f9ba67811e5b6e6660ee673811655
