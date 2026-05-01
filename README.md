# 347 Awakening — 347awakening.com

Marketing site for **347 Happy Life Happy World**, an awakening-meditation and
life-transformation experience at Silver Temple, Chiang Mai, Thailand,
guided by Master Kaie.

Built with [Astro 6](https://astro.build) and [Tailwind CSS 4](https://tailwindcss.com).
Deployed as a static site to the apex domain `347awakening.com` via GitHub Pages
(see `CNAME`).

## Quick start

```sh
nvm use            # pins to Node 22 (see .nvmrc)
npm install
npm run dev        # http://localhost:4321
```

## Commands

| Command           | What it does                                  |
| :---------------- | :-------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build production site to `./dist/`            |
| `npm run preview` | Preview the built site locally                |
| `npm run astro`   | Run Astro CLI (e.g. `npm run astro -- check`) |

## Project layout

```text
.
├── astro.config.mjs      # site URL, sitemap + Tailwind Vite plugin
├── public/               # static assets served at /
│   ├── favicon.svg|ico
│   ├── robots.txt
│   └── images/           # photos used across the site
├── src/
│   ├── components/       # one Astro component per section
│   ├── data/site.ts      # all copy: links, pricing, testimonials, FAQ, etc.
│   ├── layouts/Layout.astro   # <head>, SEO, JSON-LD, global scripts
│   ├── pages/index.astro      # composes the single landing page
│   └── styles/global.css # Tailwind theme + bespoke animations
└── CNAME                 # GitHub Pages custom domain
```

## Editing content

Almost every piece of copy — pricing, testimonials, FAQs, contact links, the 347
philosophy framework — lives in [`src/data/site.ts`](./src/data/site.ts). Update
that file and the rest of the site re-renders from the same data.

- **Pricing and courses** — `src/components/CourseCards.astro` and `PricingOverview.astro`
- **Hero copy** — `src/components/Hero.astro`
- **Testimonials** — `testimonials` in `src/data/site.ts` (JSON-LD review count auto-syncs)
- **FAQ** — `faqs` in `src/data/site.ts` (FAQPage JSON-LD auto-generates from this)
- **Featured TikTok** — `featuredTiktok` in `src/data/site.ts`

## SEO

The site ships structured data for LocalBusiness, Course, FAQPage, and Person,
plus Open Graph, Twitter Card, canonical, and GEO meta tags. The FAQPage and
AggregateRating blocks are generated from `src/data/site.ts` so they cannot
drift from what the page actually renders.

`@astrojs/sitemap` generates `/sitemap-index.xml` at build time. `public/robots.txt`
points to it.

## Deployment

Any push to the default branch triggers a build and deploys `dist/` to
`347awakening.com`. See `.github/` for the workflow.
