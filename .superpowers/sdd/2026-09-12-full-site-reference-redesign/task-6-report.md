# Task 6 Report: Static-Site Validation and Final QA

Date: 2026-09-12

## Result

Task 6 implementation was completed in commit `16d09a6` (`chore: add generated site validation`). This follow-up commit adds this report at the path required by the SDD task brief. The implementation commit was not amended.

## Exact Implementation Files Changed

Commit `16d09a6` changed exactly these seven files:

- `README.md`
- `package.json`
- `package-lock.json`
- `scripts/validate-site.mjs`
- `src/components/CourseCards.astro` (deleted)
- `src/components/index.astro`
- `task-6-report.md` (the original root-level report)

This follow-up changes only:

- `.superpowers/sdd/2026-09-12-full-site-reference-redesign/task-6-report.md`

Pre-existing worktree changes to four `public/images/*` files and the redesign plan/spec files were not modified or staged.

## Validator Behavior

`npm run validate` runs `npm run build && node scripts/validate-site.mjs`.

The dependency-free validator recursively reads generated `dist/**/*.html` and checks:

- Every local `href`, `src`, `poster`, and `srcset` URL resolves to a generated file or generated route.
- Every generated HTML page contains exactly one `<h1>`.
- Every generated HTML page contains exactly one canonical link with an absolute HTTP(S) URL.
- No generated page contains the exact placeholder `href="#"`.
- The generated site contains every required DOCX THB/USD pricing string:
  `THB 1,500 / USD 47`, `THB 2,500 / USD 77`, `THB 3,500 / USD 111`,
  `THB 7,000 / USD 219`, `THB 800 / USD 27`, `THB 12,000 / USD 347`, and
  `THB 15,000 / USD 477`.

Failures are printed with the page/path and the process exits nonzero. A passing run prints:

`Site validation passed: local references, routes, h1 counts, canonical metadata, placeholder links, and DOCX pricing.`

## Commands and Outputs

- `node --check scripts/validate-site.mjs`: passed.
- `node scripts/validate-site.mjs`: passed against the generated site.
- `npm run validate`: passed. Astro built 11 static pages, then all validator checks passed.
- `git diff --check`: passed.
- `git status --short` after the implementation commit showed only the pre-existing image and plan/spec changes; Task 6 files were clean.

## Astro Check

`npm run astro` was changed from `astro` to `bash scripts/run-node.sh astro`. Therefore:

- `npm run astro -- check` uses the existing Node 22.12+ wrapper.
- The command no longer prompts to install missing check tooling.
- `@astrojs/check` `^0.9.10` and `typescript` `^6.0.3` were added to `devDependencies`, with the corresponding `package-lock.json` update. These dependencies were added specifically because Astro otherwise requested an interactive install when the documented check ran.

The command executes but does not pass because of 10 existing type errors, not introduced by Task 6:

- `src/components/MasterKaie.astro:100`: untyped `fn` and rest parameter `args`.
- `src/layouts/Layout.astro:344-347`: undeclared `window.dataLayer`, `dataLayer`, and incompatible `gtag` calls.
- `src/layouts/Layout.astro:381`: untyped `el`.
- `src/layouts/Layout.astro:390`: untyped `now`.
- `src/layouts/Layout.astro:411`: `dataset` is unavailable on the inferred `Element` type.

Astro also reported non-failing unused-variable/deprecated-attribute warnings and inline-script hints. No unrelated source files were changed to suppress or repair them.

## CourseCards Cleanup

`src/components/CourseCards.astro` was unused and contained stale catalogue values such as `$47 / 1,700 THB`, `$147 / 5,200 THB`, and `$347 / 12,500 THB`, which contradicted the centralized DOCX-aligned catalogue. The component was deleted and its export was removed from `src/components/index.astro`. README pricing documentation now points to `src/data/site.ts` and `PricingOverview.astro`.

## Remaining Concerns

- Manual browser QA from the brief was not performed: keyboard navigation, visible focus, reduced-motion behavior, 375px layout, desktop layout, fixed WhatsApp bar clearance, image loading, mailto behavior, and external embeds remain outside this static validator.
- `npm install` reported 3 audit vulnerabilities: 1 low, 1 high, and 1 critical. No audit fix was applied because it could change unrelated dependency versions.
- Astro check remains red on the pre-existing type errors listed above, although it is now repeatable and non-interactive under the supported Node setup.

## Review Fix Follow-Up

The follow-up fixes the two validator findings without amending commit `16d09a6`:

- Local references now pass only when a candidate is a real file. A route is
  valid through its generated `index.html`, and an explicit `.html` file is
  valid; an existing directory by itself is rejected.
- Relative references retain their original traversal before normalization and
  are rejected when the resolved candidate is outside the generated `dist`
  root. Root-relative paths are also constrained to that root.
- Added `scripts/validate-site.test.mjs` with three Node built-in tests covering
  the two regressions and valid route/asset references. No dependency was added.

Follow-up verification:

- `node --check scripts/validate-site.mjs`: passed.
- `node --test scripts/validate-site.test.mjs`: passed, 3 tests / 0 failures.
- `npm run validate`: passed; build generated 11 pages and site validation
  passed.
- `npm run astro -- check`: still reports the same 10 pre-existing errors in
  `MasterKaie.astro` and `Layout.astro`; no new Astro errors were introduced.
- `git diff --check`: passed before follow-up commit.

## Review Fix Follow-Up 3

Date: 2026-09-12

This follow-up is a new commit and does not amend the earlier Task 6 commits.
It addresses the final whole-branch review findings while preserving the
approved content, pricing values, and image choices.

### Changes

- Upgraded Astro from the vulnerable 6.x line to `astro@^7.3.2` and refreshed
  `package-lock.json`. The old Vite override was removed because Astro 7.3.2
  declares Vite 8; retaining the Vite 7 override caused the static build to
  fail before route generation.
- Fixed the ten Astro check errors in `MasterKaie.astro` and `Layout.astro`.
  DOM callbacks and Analytics initialization are now typed in checked source;
  Analytics was moved to `src/scripts/analytics.ts` rather than suppressing
  diagnostics. Added `src/env.d.ts` for the Analytics data layer shape.
- Made `.reveal` visible by default and applied the hidden animation state only
  under `html.js`. The document adds the `js` class before body content runs;
  missing IntersectionObserver support and reduced motion explicitly reveal
  targets. Testimonial markup therefore remains available without JavaScript.
- Extended Course Offer JSON-LD with separate valid THB and USD Offer objects,
  generated from the same `ProgramPrice` values used by visible cards. Existing
  USD-only mentoring and membership values remain unchanged because no THB
  values were authoritative for those entries.
- Replaced the short privacy text with factual disclosures for Google
  Analytics, Google Fonts, Google Forms, Google Maps, TikTok, WhatsApp, email,
  and the mailto form flow. It does not make unsupported promises about
  third-party policies or legal rights.
- Corrected an existing unmatched closing `div` in `About.astro`, required by
  Astro 7's stricter compiler during the production build. No rendered content
  was changed.
- Added `scripts/final-review.test.mjs`, a dependency-free regression check for
  the fallback, Offer currencies, privacy service list, and Astro version.

### Verification

- `bash scripts/run-node.sh node -v`: passed with Node `v24.19.0`.
- `npm audit --omit=optional`: passed, `found 0 vulnerabilities`.
- `npm run astro -- check`: passed with `0 errors` and `0 warnings`; 23
  non-failing existing hints remain, including unused props, deprecated iframe
  attributes, and inline-script hints.
- `node --test scripts/final-review.test.mjs scripts/validate-site.test.mjs`:
  passed, 8 tests / 0 failures.
- `npm run validate`: passed; Astro generated 11 static pages and the generated
  site validator passed local references, routes, h1 counts, canonical metadata,
  placeholder links, and required DOCX pricing.
- Generated `/programs/index.html` JSON-LD assertion: passed with 28 THB/USD
  Offer entries and both currencies present.
- `git diff --check`: passed.

### QA Boundary

Not verified in a real browser in this environment: JavaScript-disabled
rendering, IntersectionObserver failure behavior, reveal animation timing,
375px/tablet/desktop visual layout, keyboard focus traversal, reduced-motion
visual behavior, fixed WhatsApp-bar clearance, live mail client behavior,
Google Analytics/Forms/Maps requests, TikTok loading, and external third-party
policy behavior. Static source assertions, Astro compilation, production
generation, generated HTML validation, and dependency audit were verified.

### Remaining Concerns

- The Astro check is clean for errors and warnings, but the existing 23 hints
  remain outside this focused wave.
- Browser and third-party integration QA still requires a real browser and
  network-enabled environment.

## Review Fix Follow-Up 2

The second validator follow-up addresses relative route resolution and symlink
escape handling:

- Document-relative references such as `../about/` now resolve against the
  referring HTML file and accept `about/index.html` when it exists.
- Candidate paths are checked using `realpath()` for both the candidate and the
  generated `dist` root. A file or route directory symlink that resolves outside
  `dist` is rejected even when the symlink itself is inside `dist`.
- Existing file-only and route-index requirements remain enforced.
- Added a fourth focused test covering an external symlinked asset and an
  external symlinked route directory. The existing valid-route fixture now also
  covers `../about/`.

Verification:

- `node --check scripts/validate-site.mjs`: passed.
- `node --test scripts/validate-site.test.mjs`: passed, 4 tests / 0 failures.
- `npm run validate`: passed; Astro built 11 pages and generated-site
  validation passed.
- `npm run astro -- check`: still reports the same 10 pre-existing errors in
  `MasterKaie.astro` and `Layout.astro`, with no new errors from this follow-up.
- `git diff --check`: passed before follow-up commit.
