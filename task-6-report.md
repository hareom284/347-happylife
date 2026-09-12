# Task 6 Report

Date: 2026-09-12

## Status

Implemented the generated-site validation command and completed the production
build validation. The final commit hash is reported with the task result because
this report is committed as part of that commit.

## Changes

- Added `scripts/validate-site.mjs` using only Node built-ins.
- Added `npm run validate`, which builds first and then validates `dist/`.
- Validation checks every generated HTML page for:
  - local `href`, `src`, `poster`, and `srcset` references resolving to generated files or routes;
  - exactly one `h1`;
  - exactly one absolute canonical URL;
  - no exact `href="#"` placeholder links;
  - all required DOCX THB/USD pricing strings.
- Routed `npm run astro` through `scripts/run-node.sh` so the documented Astro
  command uses the supported Node version without prompting for a version switch.
- Added `@astrojs/check` and `typescript` as dev dependencies. Astro prompts to
  install these when absent, so recording them in `package.json` and the lockfile
  makes `npm run astro -- check` repeatable and non-interactive. No other
  dependencies were added.
- Removed unused `src/components/CourseCards.astro`, including its stale legacy
  catalogue prices, and removed its barrel export.
- Documented `npm run validate` and the current pricing source in `README.md`.

## Verification

- `node --check scripts/validate-site.mjs`: passed.
- `node scripts/validate-site.mjs`: passed against the existing generated site.
- `npm run validate`: passed. The build generated 11 pages and site validation
  passed all local-reference, route, heading, canonical, placeholder-link, and
  pricing checks.
- `git diff --check`: passed.
- `npm run astro -- check`: command now runs without interactive mutation, but
  reports 10 pre-existing type errors in `src/components/MasterKaie.astro` and
  `src/layouts/Layout.astro`, plus non-failing hints. These were not changed as
  part of this validation-only task.

## Concerns

- `npm install` reported 3 existing audit vulnerabilities: 1 low, 1 high, and
  1 critical. No audit fix was applied because it could change unrelated
  dependency versions.
- Manual responsive/accessibility checks requiring a browser were not automated
  in this environment. Static validation covers generated references and page
  invariants, not keyboard focus, 375px layout, fixed-bar clearance, image
  loading behavior, mailto behavior, or third-party embeds.
