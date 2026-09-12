# Task 5 Report: Source, Add, and Optimize Reference Images

## Status

Task 5 was implemented in commit `9a4b70e23b2154240e9dfe0f6a06ae03915f939f` (`feat: add responsive reference imagery`). This follow-up report is documentation-only and records the exact committed scope. No implementation files are changed by this report commit, and the existing Task 5 commit is not amended.

## Exact Files Changed in Task 5

### Documentation

- `docs/image-sources.md`
- `task-5-report.md`

### Optimizer and source wiring

- `scripts/optimize-images.mjs`
- `src/components/home/HeroPresence.astro`
- `src/components/home/ProgramsOverview.astro`
- `src/components/home/RetreatsBand.astro`
- `src/data/site.ts`
- `src/layouts/Layout.astro`

### Added assets

- `public/images/community-circle.webp`
- `public/images/community-circle-400.webp`
- `public/images/community-circle-800.webp`
- `public/images/community-circle-1280.webp`
- `public/images/community-circle-1600.webp`
- `public/images/mentoring-session.webp`
- `public/images/mentoring-session-400.webp`
- `public/images/mentoring-session-800.webp`
- `public/images/mentoring-session-1280.webp`
- `public/images/mentoring-session-1600.webp`
- `public/images/mountain-hero.webp`
- `public/images/mountain-hero-480.webp`
- `public/images/mountain-hero-800.webp`
- `public/images/mountain-hero-1280.webp`
- `public/images/mountain-hero-2400.webp`
- `public/images/retreat-photo-2-480.webp`
- `public/images/retreat-photo-3-400.webp`
- `public/images/retreat-practice.webp`
- `public/images/retreat-practice-400.webp`
- `public/images/retreat-practice-800.webp`
- `public/images/retreat-practice-1280.webp`
- `public/images/retreat-practice-1600.webp`

The prior commit changed exactly 30 files: the 22 assets above, the two reports/source documentation files, the optimizer, and the five source files.

## Asset Inventory and Usage

- Existing temple, retreat gallery, logo, and instructor assets were retained.
- `mountain-hero` replaced the reused temple image as the homepage hero and homepage-only LCP preload.
- `retreat-practice` replaced the reused temple image in the homepage retreat feature.
- `mentoring-session` replaced the reused retreat image in the Private Mentoring pathway card.
- `community-circle` replaced the reused retreat image in the Membership pathway card.
- `retreat-photo-2-480.webp` and `retreat-photo-3-400.webp` were generated for the active gallery filenames.
- Stale optimizer targets `retreat-2.webp` and `retreat-3.webp` were corrected to `retreat-photo-2.webp` and `retreat-photo-3.webp`.

## Image Source and License Details

All four new image sources are Unsplash-hosted originals, downloaded locally and converted to WebP. The exact URLs below are the download URLs used by Task 5. The applicable license URL for every source is `https://unsplash.com/license`.

| Asset family | Exact source URL | License and notes |
| --- | --- | --- |
| `mountain-hero*.webp` | `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?fm=jpg&q=85&w=2400&fit=crop` | Unsplash License: `https://unsplash.com/license`; free commercial use permitted; attribution not required but appreciated. |
| `retreat-practice*.webp` | `https://images.unsplash.com/photo-1545389336-cf090694435e?fm=jpg&q=85&w=1600&fit=crop` | Unsplash License: `https://unsplash.com/license`; free commercial use permitted; attribution not required but appreciated. |
| `mentoring-session*.webp` | `https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fm=jpg&q=85&w=1600&fit=crop` | Unsplash License: `https://unsplash.com/license`; free commercial use permitted; attribution not required but appreciated. |
| `community-circle*.webp` | `https://images.unsplash.com/photo-1529156069898-49953e39b3ac?fm=jpg&q=85&w=1600&fit=crop` | Unsplash License: `https://unsplash.com/license`; free commercial use permitted; attribution not required but appreciated. |

## Responsive and Optimization Work

- Hero sources use mobile/tablet/desktop `<picture>` variants with `srcset`, `sizes="100vw"`, intrinsic dimensions, `fetchpriority="high"`, and async decoding.
- The homepage-only preload now points to `mountain-hero` and matches the hero responsive source set.
- Retreat and pathway images use local `srcset` variants, responsive `sizes`, intrinsic dimensions, lazy loading, and async decoding.
- The hero is the only image intentionally marked high priority.
- New source dimensions were mountain 2400x1600, retreat 1600x2000, mentoring 1600x1067, and community 1600x900. Generated variants do not upscale.

## Commands Run and Outputs

### Optimizer

Command:

```bash
node scripts/optimize-images.mjs
```

Output included:

```text
  retreat-photo-2-480.webp
  retreat-photo-3-400.webp
  mountain-hero-480.webp
  mountain-hero-800.webp
  mountain-hero-1280.webp
  retreat-practice-400.webp
  retreat-practice-800.webp
  retreat-practice-1280.webp
  mentoring-session-400.webp
  mentoring-session-800.webp
  mentoring-session-1280.webp
  community-circle-400.webp
  community-circle-800.webp
  community-circle-1280.webp
done
```

No missing-target warnings were emitted.

### Build

Command:

```bash
npm run build
```

Output: Astro completed successfully and generated 11 static pages, including `/index.html`, `/about/index.html`, `/programs/index.html`, and the remaining site routes.

### Local image path check

Command: an inline Node check scanned `src/**/*.{astro,ts}` for `/images/...` references and checked each path under `public`.

Output:

```text
checked 31 local image paths
```

Result: 31 checked, 0 missing.

### Rendered output check

The generated `dist/index.html` was searched for the new hero preload, hero sources, retreat `srcset`, and responsive image paths. The homepage contained the expected `mountain-hero` preload and sources and the `retreat-practice` responsive markup.

### Diff check

Command:

```bash
git diff --cached --check
```

Output: no output; both checks exited successfully.

### Astro type/content check

Commands attempted:

```bash
npm run astro -- check
bash scripts/run-node.sh ./node_modules/.bin/astro check
```

Results:

- The first command reported Node.js `v18.20.8` is unsupported; the repository requires Node `>=22.12.0`.
- The wrapper reached Astro, but `@astrojs/check` is not installed. Astro requested an interactive install of `@astrojs/check` and `typescript`; no dependency was added.

## Self-Review

- Confirmed all active local image paths exist after build.
- Confirmed optimizer targets use actual filenames and skip wider-than-source variants.
- Confirmed the homepage hero preload matches the actual LCP image rather than the prior temple fallback.
- Confirmed non-hero images are lazy-loaded and the hero is the only high-priority image.
- Confirmed image source and license URLs are recorded in `docs/image-sources.md` and repeated here for auditability.
- Confirmed no pricing files or pricing content were changed.
- Confirmed the Task 5 commit staged only the listed Task 5 files/assets; pre-existing worktree changes were left unstaged.

## Concerns

- `astro check` remains unavailable in this environment because the default shell uses Node 18 and the project does not currently include `@astrojs/check`.
- The worktree still contains unrelated unstaged changes to `package-lock.json`, four previously optimized WebP files, and the redesign plan/spec documents. They were not included in the Task 5 commit or this documentation-only follow-up.

## Review Fixes

Addressed the three Task 5 review findings without changing pricing, copy, or image source records:

1. `ProgramsOverview` now uses the actual dimensions and responsive sources for every pathway card:
   - On-Site Courses: `retreat-photo-3-400.webp` at 400x177; source fallback `retreat-photo-3.webp` at 600w.
   - Online Courses: `retreat-meditation-400.webp` at 400x537; source fallback `retreat-meditation.webp` at 600w.
   - Retreats: `retreat-photo-2-480.webp` at 480x282; source fallback `retreat-photo-2.webp` at 600w.
   - Private Mentoring: `mentoring-session-800.webp` at 800x534 with 400/800/1280/1600w sources.
   - Membership: `community-circle-800.webp` at 800x450 with 400/800/1280/1600w sources.
   - All five cards retain responsive `sizes`, lazy loading, async decoding, and accurate intrinsic dimensions.

2. `PhotoGallery.astro` now uses `retreat-photo-2-480.webp` at 480x282 and `retreat-photo-3-400.webp` at 400x177, with each original included as its 600w responsive source.

3. `Layout.astro` now uses `https://347awakening.com/images/mountain-hero.webp` consistently for Open Graph, Twitter, and all structured-data image references. OG dimensions are corrected to 2400x1600 and the alt text identifies the mountain hero.

The optimizer manifest now includes `retreat-meditation.webp` so its required 400x537 card variant is reproducible.

## Review-Fix Verification

- `node scripts/optimize-images.mjs`: passed; generated `retreat-meditation-400.webp` at 400x537 and completed with `done`; no missing-target warnings.
- `npm run build`: passed; Astro generated 11 static pages successfully.
- Image dimension inspection: passed; confirmed 400x537, 480x282, 400x177, 600x806, 600x352, 600x265, 800x534, and 800x450 values against the active card/gallery files.
- Local image path check: passed; 34 referenced local image paths checked, 0 missing.
- Rendered output check: passed; `dist/index.html` contains all five pathway `srcset` declarations, the two corrected PhotoGallery `srcset` declarations, and the mountain hero in OG/Twitter/structured data.
- `git diff --check`: passed before staging the review fixes.

Final rerun after the review-fix edits:

- `node scripts/optimize-images.mjs && npm run build`: optimizer completed with `done`; Astro completed with 11 static pages built.
- Combined rendered/path assertion: `checked 34 local image paths; required rendered image/metadata markers 6`.
- The same assertion confirmed no `hero-main.webp` reference remains in `Layout.astro`, all five pathway responsive markers are present in `dist/index.html`, both corrected gallery variants are present, and the mountain social image is present.
- Final `git diff --check`: passed.

## Review-Fix Scope

Changed implementation files:

- `scripts/optimize-images.mjs`
- `src/components/PhotoGallery.astro`
- `src/data/site.ts`
- `src/layouts/Layout.astro`

Changed documentation file:

- `.superpowers/sdd/2026-09-12-full-site-reference-redesign/task-5-report.md`

Added review-fix asset:

- `public/images/retreat-meditation-400.webp` (400x537)

## Chiang Mai Imagery Follow-Up

The location-specific hero and retreat imagery now uses the existing local Silver Temple asset family rather than generic Unsplash imagery:

- `src/components/home/HeroPresence.astro` uses `silver-temple-front-480.webp` for the mobile fallback and `silver-temple-front-800.webp`/`silver-temple-front.webp` for tablet and desktop sources. The active intrinsic dimensions are 480x347.
- `src/components/home/RetreatsBand.astro` uses `silver-temple-front-800.webp` with 480/800/1024w responsive sources and accurate 800x579 intrinsic dimensions.
- `src/layouts/Layout.astro` uses `silver-temple-front.webp` consistently for Open Graph, Twitter, LocalBusiness, Organization, Review, and VideoObject image references. OG dimensions are 1024x741, and the homepage preload matches the Silver Temple responsive source set.
- Alt text now identifies the Silver Temple (Wat Sri Suphan) in Chiang Mai for the hero and retreat feature.
- `docs/image-sources.md` records the existing local asset provenance limitation and license confirmation requirement, while preserving the exact Unsplash source/license records for the retained legacy generic files.
- `scripts/optimize-images.mjs` no longer targets the unused `mountain-hero` or `retreat-practice` families. Those files remain on disk as documented legacy assets because they are ignored by active source code and deleting them is unnecessary for this follow-up.
- Mentoring and community image families remain active in their semantically appropriate pathway cards.

## Chiang Mai Imagery Verification

- `node scripts/optimize-images.mjs`: passed; completed with `done`, generated all active responsive targets, and emitted no missing-target warnings.
- `npm run build`: passed; Astro generated 11 static pages successfully.
- Asset dimension inspection: passed; Silver Temple files confirmed as `1024x741`, `480x347`, and `800x579`.
- Local image path check: passed; `checked 25 local image paths; required Chiang Mai markers 5`.
- Active source scan: passed; no active `mountain-hero` or `retreat-practice` references remain under `src`.
- Rendered output check: passed; `dist/index.html` contains the Silver Temple preload/source set, Chiang Mai alt text, and `https://347awakening.com/images/silver-temple-front.webp` social/structured-data references.
- `git diff --check`: passed.
