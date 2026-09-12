# Task 2 Report

## Scope

Implemented only shared layout, SEO metadata, footer/legal destinations, and shared mobile/accessibility behavior. Task 1 data and homepage composition were not modified.

## Files Changed

- `src/layouts/Layout.astro`
  - Route-aware canonical and `og:url` values derived from `Astro.url` and configured site origin.
  - Query strings and fragments excluded from canonical URLs.
  - Homepage-only hero preload.
  - FAQ schema limited to `/programs`.
  - Breadcrumb schema generated from a route label map.
  - Course offers sourced from centralized Task 1 pricing.
- `src/components/Navbar.astro`
  - Added complete external-link `rel` values, explicit button type, and decorative SVG hiding.
- `src/components/Footer.astro`
  - Replaced placeholder legal links with `/terms` and `/privacy`.
  - Added conditional TikTok link from supplied social data.
- `src/components/WhatsAppBar.astro`
  - Added complete external-link `rel` value and decorative SVG hiding.
- `src/styles/global.css`
  - Added mobile content clearance and safe-area padding for the fixed WhatsApp bar.
- `src/pages/privacy.astro`
  - Added minimal privacy page using the shared shell.
- `src/pages/terms.astro`
  - Added minimal terms page using the shared shell.

Unrelated existing changes in `package-lock.json`, `public/images/*`, and untracked Task 1 planning/spec files were not staged.

## Checks

### `npm run build`

PASS. Built 11 static routes, including `/privacy/` and `/terms/`.

### Required metadata search

`rg 'canonical|og:url|FAQPage|BreadcrumbList|silver-temple-front-480' dist --glob '*.html'`

BLOCKED: `rg` is not installed in the environment (`zsh: command not found: rg`).

Read-only fallback search using `grep` completed and confirmed route metadata output.

### Metadata invariants

PASS. Verified `/about/`, `/method/`, `/programs/`, `/privacy/`, and `/terms/` have matching route-specific canonical and OG URLs; non-program pages have no FAQPage schema; non-home pages have no homepage preload; homepage preload remains present.

### `npm run astro -- check`

BLOCKED by the existing direct script using Node `v18.20.8`; Astro requires Node `>=22.12.0`. The build succeeds through the repository's Node wrapper.

### `git diff --check`

PASS.

### `npm test`

NOT AVAILABLE: `package.json` has no `test` script.

## Self-Review

- Confirmed Task 1 data files and homepage page/component files are unchanged.
- Confirmed legal links no longer use `href="#"`.
- Confirmed TikTok is rendered conditionally from `tt` rather than hard-coded.
- Confirmed metadata conditions are based on route paths and do not affect page content composition.
- Confirmed mobile fixed-bar clearance includes the device safe-area inset.
- Confirmed only intended Task 2 files plus this report will be staged.

## Concerns

- The required `rg` verification command cannot run because the binary is unavailable.
- `npm run astro -- check` remains incompatible with the installed Node 18 runtime because the existing `astro` script bypasses `scripts/run-node.sh`; changing `package.json` is outside Task 2 scope.
- No automated test suite is configured (`npm test` reports a missing script).
- The shared shell continues to include some existing global structured data such as LocalBusiness and reviews on every route; this task only scoped the explicitly homepage/content-matching FAQ, Course, and breadcrumb schemas.
