# 347 Awakening Full-Site Reference Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 347 Awakening homepage and inner pages to closely match the supplied reference design while applying the DOCX content and authoritative THB/USD pricing.

**Architecture:** Keep Astro static pages, the existing Tailwind 4 theme, and reusable `.astro` components. Centralize copy, pricing, and links in `src/data/site.ts`; keep page composition in `src/pages`; keep shared metadata and global behavior in `src/layouts/Layout.astro` and `src/styles/global.css`. Add only focused validation utilities where the static site has no existing test framework.

**Tech Stack:** Astro 6, Tailwind CSS 4, TypeScript data module, static WebP assets, GitHub Pages deployment.

## Global Constraints

- Use the supplied screenshot as the visual reference for hierarchy, spacing, section order, card proportions, and overall density.
- The DOCX is authoritative for program names and pricing.
- Existing local images may be replaced or supplemented with royalty-free Unsplash/Pexels images.
- Selected external images must be downloaded into `public/images` rather than hot-linked.
- The free meditation strip must use a `mailto:` submission flow.
- The homepage and inner pages must remain usable at 375px, tablet, and desktop widths.
- Astro checks and builds must run under Node `>=22.12.0`.
- Do not leave intentional placeholder `#` footer links.

---

### Task 1: Normalize Site Data and DOCX Pricing

**Files:**
- Modify: `src/data/site.ts:5-29,103-125,198-266,372-476`
- Modify: `src/components/home/ProgramsOverview.astro`
- Modify: `src/components/Testimonials.astro`

**Interfaces:**
- Produces typed data for homepage cards, on-site experiences, online programs, retreats, mentoring, membership, FAQs, testimonials, and contact links.
- Preserves existing exports consumed by page components unless the export is replaced consistently across all consumers.

- [ ] **Step 1: Replace stale program data with the DOCX catalogue.**

Use these exact prices:

```ts
// On-site
347 Alignment Experience: THB 1,500 / USD 47
347 Awakening Experience: THB 2,500 / USD 77
347 Life Transformation Experience: THB 3,500 / USD 111
347 Awakening Journey: THB 7,000 / USD 219

// Online
347 Awakening Starter Program: THB 800 / USD 27
347 Deep Awakening Program: THB 2,500 / USD 77
347 Premium Life Transformation Program: THB 7,000 / USD 219

// Retreats
1 day: THB 7,000 / USD 219
2 days: THB 12,000 / USD 347
3 days: THB 15,000 / USD 477
```

Store display currency strings separately when necessary so cards can show both currencies without parsing formatted text.

- [ ] **Step 2: Update homepage card data to five pathways.**

Use On-Site Courses, Online Courses, Retreats, Private Mentoring, and Membership, with links to working routes/anchors.

- [ ] **Step 3: Update DOCX copy for About, Method, Programs, Membership, Volunteer, Contact, and FAQs.**

Preserve useful current private-mentoring descriptions because the DOCX names those offerings but does not specify complete details.

- [ ] **Step 4: Run a repository search for obsolete prices and names.**

Run:

```bash
rg '\$47|\$97|\$147|Awakening Reset|Inner Peace Experience|Deep Awakening Retreat|Consciousness Intensive' src
```

Expected: no stale visible catalogue values remain unless they are explicitly retained in historical copy.

- [ ] **Step 5: Build to verify all data consumers compile.**

Run:

```bash
npm run build
```

Expected: successful static build.

---

### Task 2: Rebuild Shared Shell, Footer, and SEO Metadata

**Files:**
- Modify: `src/layouts/Layout.astro:5-65,93-303,305-312`
- Modify: `src/components/Navbar.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/WhatsAppBar.astro`
- Modify: `src/styles/global.css`
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`

**Interfaces:**
- `Layout` accepts the existing `title` and `description` props and derives route-aware metadata from `Astro.url`.
- Footer legal links resolve to `/privacy` and `/terms`.

- [ ] **Step 1: Make canonical and social URLs route-aware.**

Derive the canonical URL from `Astro.url` using the configured site origin, while keeping fragment/query values out of canonical URLs. Use the route URL for `og:url` and page-specific breadcrumb data.

- [ ] **Step 2: Scope structured data to matching content.**

Do not emit FAQPage schema on pages that do not render FAQ content. Generate breadcrumbs from page props or a small route map. Update Course/Offer data from the centralized DOCX pricing.

- [ ] **Step 3: Remove the incorrect global image preload.**

Preload only the actual homepage hero image, preferably through a page-level prop or a homepage-specific head slot. Do not preload the temple image on unrelated pages.

- [ ] **Step 4: Complete footer legal destinations and social links.**

Add minimal privacy and terms pages using the existing shell. Render the TikTok footer link if the supplied social data includes it.

- [ ] **Step 5: Improve shared mobile and accessibility behavior.**

Add decorative SVG hiding, complete external-link `rel` attributes, focus styles, and bottom safe-area/content padding for the fixed WhatsApp bar.

- [ ] **Step 6: Verify generated metadata.**

Run:

```bash
npm run build
rg 'canonical|og:url|FAQPage|BreadcrumbList|silver-temple-front-480' dist --glob '*.html'
```

Expected: non-home pages have route-specific canonical/OG URLs; unrelated pages do not receive homepage-only FAQ/breadcrumb content or hero preload.

---

### Task 3: Match the Reference Homepage Layout

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/home/HeroPresence.astro`
- Modify: `src/components/home/MethodOverview.astro`
- Modify: `src/components/home/ProgramsOverview.astro`
- Modify: `src/components/home/RetreatsBand.astro`
- Modify: `src/components/Testimonials.astro`
- Modify: `src/components/home/FreeMeditationCTA.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Homepage components consume the normalized data exports from Task 1.
- The free meditation component exposes visible name/email fields and a mailto action without requiring a backend service.

- [ ] **Step 1: Reorder homepage sections to match the reference.**

Use this exact order: header, hero, 347 Method, five pathway cards, retreat feature, testimonial band, free meditation strip, footer.

- [ ] **Step 2: Update the hero composition.**

Use “Awaken Through Presence,” supporting copy, two CTAs, location label, full-bleed image, readable overlay, responsive crop, explicit image dimensions, and hero-only high priority loading.

- [ ] **Step 3: Restyle the method section.**

Present “Align · Awaken · Transform” with three evenly weighted columns, numbered labels, consistent icons, concise DOCX-aligned descriptions, and deep links to `/method` sections.

- [ ] **Step 4: Build the five-card pathway grid.**

Match the screenshot’s compact image-top cards, equal visual weight, concise text, and arrow CTA treatment. Collapse to a readable one-column/two-column layout on small screens.

- [ ] **Step 5: Restyle the retreat band and testimonials.**

Use a split image/text retreat feature and a dark testimonial band. If controls are interactive, make them keyboard accessible and provide non-JavaScript fallback content.

- [ ] **Step 6: Implement the mailto free-meditation form.**

Use labeled `name` and `email` fields. On submit, construct a URL-encoded `mailto:` URL containing the entered values and a clear subject/body. Include a fallback note that the user’s email client must be configured.

- [ ] **Step 7: Verify visual and responsive output.**

Run the build and inspect at 375px, 768px, and desktop widths. Confirm no horizontal scrolling and no content is hidden behind the WhatsApp bar.

---

### Task 4: Update Inner Pages to the Approved Design and Content

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/method.astro`
- Modify: `src/pages/programs.astro`
- Modify: `src/pages/membership.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/booking.astro`
- Modify: `src/pages/meditation-retreat-chiang-mai.astro`
- Modify: `src/pages/blog/best-meditation-retreat-chiang-mai.astro`
- Modify: `src/components/FAQ.astro`
- Modify: `src/components/MapSection.astro`

**Interfaces:**
- Pages continue to use `Layout`, `Navbar`, `Footer`, and `WhatsAppBar`.
- Programs page consumes distinct on-site, online, retreat, and mentoring data from Task 1.

- [ ] **Step 1: Expand About content from the DOCX.**

Add the complete Silver Temple/Lanna context, inner-temple symbolism, and GPS Happiness explanation while retaining concise readable sections.

- [ ] **Step 2: Align Method content and visual hierarchy.**

Ensure the 3, 4, and 7 sections exactly match the DOCX terminology and anchor links.

- [ ] **Step 3: Rebuild Programs around the new catalogue.**

Add the “More Than Meditation. It Is Awakening.” introduction. Separate on-site experiences, online programs, retreats, and private mentoring. Show THB/USD prices on every applicable card.

- [ ] **Step 4: Update Membership, Volunteer, and Contact pages.**

Use DOCX headings/copy, preserve working contact URLs, and add any available social channel required by the data.

- [ ] **Step 5: Update Booking and SEO landing pages.**

Keep the external booking form, add current pricing/category context, and provide WhatsApp/email alternatives. Remove stale prices from supporting copy.

- [ ] **Step 6: Verify route and anchor integrity.**

Check every navigation and CTA target against the generated route list and rendered IDs.

---

### Task 5: Source, Add, and Optimize Reference Images

**Files:**
- Add/modify: `public/images/*` for selected royalty-free assets
- Create: `docs/image-sources.md`
- Modify: `scripts/optimize-images.mjs`
- Modify: components using large images under `src/components` and `src/pages`
- Modify: `package.json` only if a direct image-tool dependency is required

**Interfaces:**
- Components use local `/images/...` URLs and responsive variants.
- `docs/image-sources.md` records provider, source URL, asset filename, and license/attribution notes for every new downloaded image.

- [ ] **Step 1: Inventory existing assets against the reference sections.**

Reuse suitable local assets first; identify only the missing mountain hero, retreat, mentoring, and community imagery.

- [ ] **Step 2: Select royalty-free Unsplash/Pexels assets.**

Download only assets with a license suitable for this website and record their source URLs and attribution requirements.

- [ ] **Step 3: Rename and optimize assets consistently.**

Use descriptive names and generate widths appropriate for mobile/tablet/desktop without upscaling. Correct stale targets such as `retreat-2.webp` and `retreat-3.webp` to match actual filenames.

- [ ] **Step 4: Add responsive image attributes.**

Use `srcset`, `sizes`, width/height or aspect-ratio, correct loading behavior, and meaningful alt text. Keep only the real LCP image high priority.

- [ ] **Step 5: Verify all referenced image paths.**

Run:

```bash
node scripts/optimize-images.mjs
npm run build
```

Expected: no missing image warnings for active assets and successful static output.

---

### Task 6: Add Static-Site Validation and Run Final QA

**Files:**
- Modify: `package.json`
- Create: `scripts/validate-site.mjs`
- Optional modify: `README.md` with validation command documentation

**Interfaces:**
- `npm run validate` exits nonzero when a referenced local asset, generated route, or required metadata invariant fails.

- [ ] **Step 1: Implement validation checks.**

Validate generated `dist` HTML for local asset existence, no `href="#"`, one `h1` per page, canonical presence, and the required DOCX pricing strings.

- [ ] **Step 2: Add the npm script.**

Add:

```json
"validate": "npm run build && node scripts/validate-site.mjs"
```

- [ ] **Step 3: Run supported checks.**

Run:

```bash
npm run astro -- check
npm run validate
git diff --check
```

Use the project’s Node 22.12+ environment. If the direct `astro` script bypasses `scripts/run-node.sh`, update the script consistently so documented checks work with the supported local setup.

- [ ] **Step 4: Perform manual responsive/accessibility QA.**

Check keyboard navigation, visible focus, reduced motion, 375px layout, desktop layout, fixed WhatsApp bar clearance, image loading, mailto behavior, and external embeds.

- [ ] **Step 5: Review final diff and status.**

Run:

```bash
git status --short
git diff --stat
git diff --check
```

Confirm only intended design, content, asset, validation, and documentation files changed.
