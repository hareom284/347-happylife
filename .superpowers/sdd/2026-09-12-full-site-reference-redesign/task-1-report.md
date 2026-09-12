# Task 1 Implementation Report

## Status

Implemented and committed as `bc78556` (`Normalize program data and pricing`).

## Files Changed

- `src/data/site.ts`
  - Added typed `ProgramPrice` data with separate THB, USD, and display values.
  - Replaced stale on-site catalogue names with the four approved DOCX offerings and exact prices.
  - Updated online programme names and exact THB/USD display prices.
  - Added the approved one-, two-, and three-day retreat pricing catalogue.
  - Expanded the homepage pathway data to five cards, including On-Site Courses.
  - Updated related programme and FAQ copy to remove obsolete catalogue names and prices.
  - Preserved existing private mentoring details.
- `src/components/home/ProgramsOverview.astro`
  - Changed the pathway grid to support five equal cards.
- `src/components/Testimonials.astro`
  - Uses the first typed testimonial as the featured review instead of maintaining a separate hardcoded review.
- `.superpowers/sdd/2026-09-12-full-site-reference-redesign/task-1-report.md`
  - This report.

No unrelated SEO, layout, image, package, plan, or spec files were modified.

## Checks

### `npm run build`

Passed with exit code 0.

Output summary: Astro generated and built all 9 static routes, including `/`, `/programs/`, `/membership/`, `/contact/`, and the remaining existing routes.

### Obsolete catalogue search

The requested `rg` command could not run because `rg` is not installed in this environment (`zsh: command not found: rg`). An equivalent repository search using `git grep -E` found no obsolete programme names in the changed data. It did find pre-existing matches in out-of-scope `src/layouts/Layout.astro` and `src/components/CourseCards.astro`, plus the explicitly retained private-mentoring price in `src/data/site.ts`.

### `git diff --check`

Passed with no output.

### Initial data assertion

A test-first Node assertion was attempted before implementation, but the available Node 18 runtime cannot load `.ts` modules directly and failed with `ERR_UNKNOWN_FILE_EXTENSION`. The project build uses its Node-wrapper/toolchain path and completed successfully after the implementation.

## Self-Review

- Confirmed the five homepage pathway titles and working route/anchor targets.
- Confirmed all approved on-site, online, and retreat prices are represented as separate currency values and display strings where applicable.
- Confirmed existing consumers continue compiling without changing the existing online-course `price` string interface.
- Confirmed the featured testimonial remains data-backed and preserves the existing component API.
- Confirmed only the intended source files were staged in commit `bc78556`.

## Concerns

- The requested `rg` executable is unavailable in the environment.
- Stale `$47`, `$97`, and `$147` values remain in pre-existing `src/layouts/Layout.astro` metadata and `src/components/CourseCards.astro`; changing them would exceed the Task 1 file scope and the instruction not to modify unrelated SEO/layout files.
- The existing private mentoring `$147` price remains because the brief explicitly permits preserving useful private-mentoring details where the DOCX lacks complete details.
- `retreatOptions` is centralized data for later consumers; the current Task 1 programs page was intentionally not modified because it is outside the listed Task 1 files.

## Review Fixes

### Finding 1: Empty testimonials input

Root cause: the data-backed featured review read `testimonials[0]` without a fallback and then dereferenced its fields. Fixed `src/components/Testimonials.astro` by retaining the prior Joanna J Wilkin featured-review values as a fallback for an empty array, while using the first supplied testimonial whenever data is present.

### Finding 2: Online pricing normalization

Root cause: each online course duplicated one display string and two currency strings, allowing them to drift. Fixed `src/data/site.ts` so every online course uses the typed `ProgramPrice` helper as its sole pricing value. `programs.astro` was intentionally not modified; Task 4 must render the normalized `price.display` value when updating visible programme pricing.

## Review-Fix Checks

- Focused empty-array fallback check: passed (`PASS: empty testimonials fallback present`).
- Focused pricing-shape check: passed (`PASS: online prices use ProgramPrice only`).
- `npm run build`: passed with exit code 0; 9 static routes generated.
- `git diff --check`: passed with no output.

## Re-Review Fix

### Finding: Online price object rendered directly

Root cause: `src/pages/programs.astro` interpolated the normalized `ProgramPrice` object as `{c.price}`, which rendered as `[object Object]`. The consumer now renders `{c.price.display}`. This is the only programs-page change; no layout or redesign work was included.

## Re-Review Checks

- Pre-fix consumer regression check: failed as expected (`FAIL: programs consumer renders ProgramPrice object directly`).
- Post-fix consumer check: passed (`PASS: programs consumer uses display string`).
- `npm run build`: passed with exit code 0; 9 static routes generated.
- `git diff --check`: passed with no output.
