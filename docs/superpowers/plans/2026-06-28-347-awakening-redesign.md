# 347 Awakening Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the 347 Awakening site into a multi-page brand site (Home + About + Method + Programs + Membership + Contact) matching the supplied earthy cream/sage/olive/gold mockup, with content from the brand docx.

**Architecture:** Astro 6 + Tailwind v4. A single `@theme` token block in `global.css` drives the palette; shared `Navbar`/`Footer`/`WhatsAppBar` compose every page; section components read copy from `src/data/site.ts`. Forms are WhatsApp/mailto links — no backend.

**Tech Stack:** Astro 6.1, Tailwind v4 (`@tailwindcss/vite`), Cormorant Garamond + Inter (already loaded). No new dependencies.

## Global Constraints

- Node `>=22.12.0`; no new runtime dependencies; no new fonts.
- Keep existing `@theme` token **names**; only remap their hex values.
- All CTAs use WhatsApp (`wa = https://wa.me/66944265297`) or `mailto:347happylifehappyworld@gmail.com`. No form backend.
- Reuse existing `public/images/*.webp`; do not reference assets that don't exist.
- Each task ends green on `npm run build` (the project has no unit-test runner; build + visual check is the verification cycle).
- WCAG AA for text colors after the palette remap.
- Preserve existing content (instructors, FAQs, map, pricing) by relocating it, not deleting it.

---

## File Structure

**Modified:**
- `src/styles/global.css` — palette token remap (Task 1).
- `src/data/site.ts` — extend with new brand data (Tasks 4, 6, 8, 10, 11).
- `src/components/Navbar.astro`, `Footer.astro`, `WhatsAppBar.astro` — rebuild to mockup (Tasks 2–3).
- `src/components/index.astro` — barrel: add new section exports (Tasks 5–7).
- `src/pages/index.astro` — recompose homepage (Task 7).
- `src/pages/meditation-retreat-chiang-mai.astro`, `src/pages/booking.astro`, `src/pages/blog/best-meditation-retreat-chiang-mai.astro` — recolor (Task 12).

**Created (homepage sections):**
- `src/components/home/HeroPresence.astro`, `MethodOverview.astro`, `ProgramsOverview.astro`, `RetreatsBand.astro`, `FreeMeditationCTA.astro` (Tasks 5–7). Existing `Testimonials.astro` reused.

**Created (pages):**
- `src/pages/about.astro`, `src/pages/method.astro`, `src/pages/programs.astro`, `src/pages/membership.astro`, `src/pages/contact.astro` (Tasks 8–11).
- Page section components under `src/components/about/`, `method/`, `programs/`, etc. as noted per task.

---

## Task 1: Palette token remap

**Files:**
- Modify: `src/styles/global.css:1-90` (the `@theme` block)

**Interfaces:**
- Produces: recolored tokens reused everywhere — `bg-ivory`, `bg-cream`, `text-body`, `bg-royal`/`text-royal`, `bg-gold`/`text-gold`, `bg-deep-blue`, `text-gold-ink`, plus aliases `violet`, `violet-dark`, `deep-calm`.

- [ ] **Step 1: Remap the core palette values** (keep names, change hex)

In the `@theme` block replace the color values so the named tokens resolve to the earthy palette:

```css
  /* White / Ivory backgrounds -> Cream base */
  --color-ivory: #F5F0E6;
  --color-ivory-dark: #EAE3D4;

  /* Primary brand -> Olive / sage */
  --color-royal: #6E7559;
  --color-royal-light: #828A6B;
  --color-royal-mid: #61684E;

  /* Dark sections -> Deep forest */
  --color-deep-blue: #3B4232;
  --color-navy: #2F3528;

  /* Accent -> Brass gold */
  --color-gold: #B8995A;
  --color-gold-light: #CBB079;
  --color-gold-bright: #D8C081;
  --color-gold-dark: #9A7F44;
  --color-gold-muted: #B0A079;

  /* Light accents -> warm sand tints */
  --color-sky-mist: #E3DAC6;
  --color-sky-mist-light: #EFE8D8;
  --color-sky-blue: #A8AE8C;

  /* Soft surfaces -> sage tints */
  --color-soft-aura: #E8E2D2;
  --color-soft-aura-dark: #D9D1BC;
  --color-morning-sage: #D5DCC4;
  --color-morning-sage-dark: #C2CBAC;

  /* Body text */
  --color-body: #3A352C;
  --color-body-light: #5B5547;
  --color-body-muted: #7A7363;

  /* Mapped aliases (keep names; point at new palette) */
  --color-violet: #6E7559;
  --color-violet-dark: #3B4232;
  --color-violet-light: #828A6B;
  --color-deep-calm: #B8995A;
  --color-deep-calm-dark: #9A7F44;
  --color-deep-calm-light: #CBB079;

  /* gold-ink: AA-safe gold text on cream (#F5F0E6) */
  --color-gold-ink: #7A6326;
  --color-gold-ink-dark: #5E4C1D;

  /* Legacy aliases -> cream family */
  --color-cream: #F5F0E6;
  --color-cream-dark: #EAE3D4;
  --color-oat-border: #D9D1BC;
  --color-oat-light: #EFE8D8;
  --color-warm-silver: #7A7363;
  --color-warm-charcoal: #5B5547;
  --color-dark-charcoal: #3A352C;
  --color-deep-purple: #6E7559;
  --color-purple-600: #3B4232;
  --color-purple-300: #E3DAC6;
```

- [ ] **Step 2: Recolor the selection + scrollbar rules** (`global.css`, just below `@theme`)

```css
::selection { background: rgba(184, 153, 90, 0.25); color: #3B4232; }
::-moz-selection { background: rgba(184, 153, 90, 0.25); color: #3B4232; }
::-webkit-scrollbar-track { background: #F5F0E6; }
::-webkit-scrollbar-thumb { background: rgba(184, 153, 90, 0.35); }
::-webkit-scrollbar-thumb:hover { background: rgba(184, 153, 90, 0.55); }
```

- [ ] **Step 3: Build + visual verify**

Run: `npm run build`
Expected: build succeeds. Then `npm run dev` and confirm the existing homepage now renders in cream/olive/gold with no contrast failures (headings/body legible).

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "Remap palette to earthy cream/sage/olive/gold theme"
```

---

## Task 2: Navbar rebuild

**Files:**
- Modify: `src/components/Navbar.astro`
- Modify: `src/data/site.ts` (add `navLinks`)

**Interfaces:**
- Consumes: `wa` prop (WhatsApp URL).
- Produces: `<Navbar wa={wa} />` used by every page; `navLinks` array.

- [ ] **Step 1: Add `navLinks` to `site.ts`**

```ts
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'The Method', href: '/method' },
  { label: 'Programs', href: '/programs' },
  { label: 'Retreats', href: '/programs#retreats' },
  { label: 'Membership', href: '/membership' },
  { label: 'Journal', href: '/blog/best-meditation-retreat-chiang-mai' },
  { label: 'Contact', href: '/contact' },
];
```

- [ ] **Step 2: Rebuild `Navbar.astro`** to the mockup

Replace the file body. Frontmatter imports `navLinks`; accepts `wa`. Markup:
- Left: stacked wordmark — `347` (font-heading, large), `AWAKENING` (uppercase tracking-widest, small), `Happy Life Happy World` (xs, muted). Wrap in `<a href="/">`.
- Center (lg+): map `navLinks` to `<a class="text-sm font-medium text-body hover:text-gold-ink transition-colors">`. Mark current page with `aria-current` by comparing `Astro.url.pathname` to `link.href`.
- Right: `<a href={wa}>` brass pill — `bg-gold text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gold-dark transition-all` reading "Join the Journey".
- Nav shell: `sticky top-0 z-50`. Default transparent over hero via `data-navbar` + a scroll script that toggles `bg-cream/95 backdrop-blur-md shadow-sm` after 40px scroll. (Keep it simple: start with `bg-cream/95 backdrop-blur-md border-b border-oat-border/60` always-on for safety; transparency-over-hero is a nice-to-have — implement the scroll toggle only if time allows.)
- Mobile (<lg): hamburger button toggles a full-width drawer listing `navLinks` + the WhatsApp pill. Reuse the existing mobile-menu script pattern already in the file if present.

- [ ] **Step 3: Build + visual verify**

Run: `npm run build` → succeeds. `npm run dev` → navbar shows new wordmark, 8 links, brass "Join the Journey"; mobile drawer opens/closes.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.astro src/data/site.ts
git commit -m "Rebuild Navbar to mockup: wordmark, 8-link nav, Join the Journey pill"
```

---

## Task 3: Footer + WhatsAppBar rebuild

**Files:**
- Modify: `src/components/Footer.astro`
- Modify: `src/components/WhatsAppBar.astro`

**Interfaces:**
- Consumes: `wa`, `email`, `fb`, `ig`, `yt`, `tt` props (already passed in `index.astro`).
- Produces: `<Footer .../>` for every page.

- [ ] **Step 1: Rebuild `Footer.astro`** — deep-forest band (`bg-deep-blue text-cream`):
  - Col 1: stacked `347 / AWAKENING / Happy Life Happy World` wordmark.
  - Col 2 "QUICK LINKS": About `/about`, The Method `/method`, Programs `/programs`, Retreats `/programs#retreats`.
  - Col 3 "RESOURCES": Journal (blog), FAQ (`/programs#faq` or `/contact`), Terms & Conditions, Privacy Policy. (Link Terms/Privacy to `#` placeholders if pages don't exist — note in commit.)
  - Col 4 "STAY CONNECTED": one-line blurb + social icon row (Instagram `ig`, Facebook `fb`, YouTube `yt`, email `mailto:email`). Reuse existing inline SVG icons from the current Footer.
  - Bottom row: `© 2024 347 Awakening. All rights reserved.` centered, muted.
  - Column labels: `text-xs uppercase tracking-[0.2em] text-gold-light`.

- [ ] **Step 2: Recolor `WhatsAppBar.astro`** — swap any blue/violet classes for `bg-royal`/`bg-deep-blue`; keep WhatsApp green for the icon. Verify `position:fixed` still works (no transform on ancestors).

- [ ] **Step 3: Build + visual verify** — `npm run build` succeeds; footer matches mockup layout; mobile WhatsApp bar still pinned.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/components/WhatsAppBar.astro
git commit -m "Rebuild Footer to mockup 4-column deep-forest layout; recolor WhatsAppBar"
```

---

## Task 4: Homepage data — hero, method, programs

**Files:**
- Modify: `src/data/site.ts`

**Interfaces:**
- Produces: `methodPillars`, `pathCards` consumed by Tasks 5–6.

- [ ] **Step 1: Add data exports**

```ts
export const methodPillars = [
  { num: '3', title: 'Body Alignment', icon: 'leaf',
    body: 'Reset your nervous system, awaken your energy, and create balance in your body.', href: '/method#alignment' },
  { num: '4', title: 'Mind Alignment', icon: 'lotus',
    body: 'Clear your thoughts, regulate your emotions, and cultivate clarity and presence.', href: '/method#awakening' },
  { num: '7', title: 'Spirit Alignment', icon: 'sun',
    body: 'Connect with your inner wisdom, live with purpose, and awaken your highest potential.', href: '/method#transformation' },
];

export const pathCards = [
  { title: 'Online Courses', img: '/images/retreat-meditation.webp',
    body: 'Self-paced courses for your personal growth and awakening.', cta: 'Explore', href: '/programs#online' },
  { title: 'Membership', img: '/images/retreat-photo-1.webp',
    body: 'Join our global community and grow together every day.', cta: 'Learn More', href: '/membership' },
  { title: 'Retreats', img: '/images/retreat-photo-2.webp',
    body: 'Luxury retreats in stunning locations for deep healing and awakening.', cta: 'View Retreats', href: '/programs#retreats' },
  { title: 'Private Mentoring', img: '/images/retreat-photo-3.webp',
    body: 'Receive personalized guidance and support for your transformation.', cta: 'Apply Now', href: '/programs#mentoring' },
];

export const retreatFeatures = ['Meditation', 'Healing', 'Nature', 'Conscious Living', 'Inner Connection'];
```

- [ ] **Step 2: Build verify** — `npm run build` succeeds (unused exports are fine).

- [ ] **Step 3: Commit**

```bash
git add src/data/site.ts
git commit -m "Add homepage data: method pillars, path cards, retreat features"
```

---

## Task 5: Homepage hero + method sections

**Files:**
- Create: `src/components/home/HeroPresence.astro`, `src/components/home/MethodOverview.astro`
- Modify: `src/components/index.astro` (export both)

**Interfaces:**
- Consumes: `wa` (hero), `methodPillars` (method).
- Produces: `<HeroPresence wa={wa} />`, `<MethodOverview />`.

- [ ] **Step 1: `HeroPresence.astro`** — full-bleed hero:
  - Background: `hero-main.webp` via `<img>` or bg, with a left-to-right cream-to-transparent gradient overlay so left-aligned text is legible.
  - Content (max-w container, left): eyebrow `RETURN TO ALIGNMENT` (`text-xs uppercase tracking-[0.3em] text-gold-light`); H1 `Awaken Through Presence` (`font-heading text-6xl md:text-7xl text-white` with text-shadow); subcopy "A sanctuary for conscious leaders to reconnect with peace, clarity, and true awakening."; two buttons — **Begin Your Journey** (`bg-gold text-white` → `wa`) and **Free Meditation** (outline `border border-white/70 text-white` → `#free-meditation`).
  - Min height `min-h-[88vh] flex items-center`.

- [ ] **Step 2: `MethodOverview.astro`** — `bg-cream py-24`:
  - Centered eyebrow `THE 347 AWAKENING METHOD`; H2 `Body. Mind. Spirit. Aligned.` (font-heading); short intro line; brass divider rule.
  - 3-col grid (`md:grid-cols-3`) mapping `methodPillars`: each = olive circle (`w-16 h-16 rounded-full bg-royal` — gold for the `7` item) holding an inline SVG icon (`leaf`/`lotus`/`sun` — small inline SVGs defined in the component), title `{num} – {title}`, body, `LEARN MORE →` link to `pillar.href`. Vertical divider lines between columns on `md+`.

- [ ] **Step 3: Export in `index.astro` barrel**

```astro
export { default as HeroPresence } from './home/HeroPresence.astro';
export { default as MethodOverview } from './home/MethodOverview.astro';
```

- [ ] **Step 4: Build + visual verify** — temporarily not required to be wired into index yet; `npm run build` succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroPresence.astro src/components/home/MethodOverview.astro src/components/index.astro
git commit -m "Add homepage Hero (Awaken Through Presence) and Method overview sections"
```

---

## Task 6: Homepage programs + retreats + free-meditation sections

**Files:**
- Create: `src/components/home/ProgramsOverview.astro`, `src/components/home/RetreatsBand.astro`, `src/components/home/FreeMeditationCTA.astro`
- Modify: `src/components/index.astro`

**Interfaces:**
- Consumes: `pathCards`, `retreatFeatures`, `wa`.
- Produces: `<ProgramsOverview />`, `<RetreatsBand />`, `<FreeMeditationCTA wa={wa} />`.

- [ ] **Step 1: `ProgramsOverview.astro`** — `bg-cream-dark py-24`: eyebrow `TRANSFORMATIONAL PROGRAMS`; H2 `Find the Path for You`; 4-col grid (`lg:grid-cols-4 md:grid-cols-2`) of `pathCards` — each a white card (`bg-white rounded-card shadow-card`) with top image, title, body, `{cta} →` link to `card.href`.

- [ ] **Step 2: `RetreatsBand.astro`** — two-column band: left = eyebrow `LUXURY AWAKENING RETREATS` + H2 `A Journey Back to Yourself` + brass divider + a horizontal row of the 5 `retreatFeatures` (each a tiny inline icon + label) + **Explore Retreats** button (`bg-royal text-white` → `/programs#retreats`); right = `retreat-photo-4.webp` rounded image bleeding to the right edge.

- [ ] **Step 3: `FreeMeditationCTA.astro`** (`id="free-meditation"`) — `bg-cream-dark` band: gift icon circle + heading `FREE MEDITATION FOR BUSY LEADERS` + line "Get instant access to a 5-minute meditation to reset your mind and nervous system." + two **decorative** inputs (Your Name, Your Email — `disabled`/no submit) + **Get Free Access** button (`bg-deep-blue text-white` → `wa`). Add a `<noscript>`-safe note: the button is a WhatsApp link, inputs are visual only.

- [ ] **Step 4: Export all three in the barrel.**

- [ ] **Step 5: Build verify** — `npm run build` succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/components/index.astro
git commit -m "Add homepage Programs, Retreats band, and Free Meditation CTA sections"
```

---

## Task 7: Recompose homepage

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: all Task 5–6 components + existing `Navbar`, `Footer`, `WhatsAppBar`, `Testimonials`.

- [ ] **Step 1: Rewrite `index.astro`** to the mockup order:

```astro
---
import Layout from '../layouts/Layout.astro';
import {
  Navbar, Footer, WhatsAppBar,
  HeroPresence, MethodOverview, ProgramsOverview, RetreatsBand,
  Testimonials, FreeMeditationCTA,
} from '../components/index.astro';
import { wa, email, social, googleMapsLink, testimonials } from '../data/site';
---
<Layout title="347 Awakening — Awaken Through Presence | Happy Life Happy World">
  <Navbar wa={wa} />
  <HeroPresence wa={wa} />
  <MethodOverview />
  <ProgramsOverview />
  <RetreatsBand />
  <Testimonials testimonials={testimonials} googleMapsLink={googleMapsLink} wa={wa} />
  <FreeMeditationCTA wa={wa} />
  <Footer wa={wa} email={email} fb={social.fb} ig={social.ig} yt={social.yt} tt={social.tt} />
  <WhatsAppBar wa={wa} />
</Layout>
```

- [ ] **Step 2: Recolor `Testimonials.astro`** if it carries hardcoded blue/violet — swap to `bg-deep-blue`/cream so the carousel matches the mockup's dark testimonial band.

- [ ] **Step 3: Build + visual verify** — `npm run build` succeeds; homepage matches mockup top-to-bottom at desktop + mobile widths; all CTAs resolve.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro src/components/Testimonials.astro
git commit -m "Recompose homepage to mockup section order"
```

---

## Task 8: About page

**Files:**
- Create: `src/pages/about.astro`
- Modify: `src/data/site.ts` (add `threePowerfulQuestions`, `gpsHappiness`, `silverTemple`, `mission`)

**Interfaces:**
- Produces: `/about` route.

- [ ] **Step 1: Add data to `site.ts`**

```ts
export const mission = 'To help humanity awaken consciousness, heal from within, and create a peaceful world through inner transformation.';

export const threePowerfulQuestions = [
  { n: '1', q: 'Who Am I?', body: 'Beyond your name, career, status, and identity… who are you truly?' },
  { n: '2', q: 'Why Was I Born on This Earth?', body: 'Every human being has a unique purpose, gift, and reason for existence.' },
  { n: '3', q: 'What Is My Mission?', body: 'How can we use our life to create meaning, happiness, and positive impact for the world?' },
];

export const gpsHappiness = [
  { letter: 'G', title: 'Gratitude', body: 'Living with appreciation, humility, and gratitude for life.' },
  { letter: 'P', title: 'Presence', body: 'Being fully aware and mindful in the present moment.' },
  { letter: 'S', title: 'Service', body: 'Using our life, gifts, and consciousness to serve others and create a better world.' },
];

export const silverTemple = {
  title: 'The Silver Temple & GPS Happiness',
  body: 'Wat Sri Suphan, the "Silver Temple," is one of the most spiritually beautiful temples in Chiang Mai, Thailand. For 347 Awakening it represents the symbol of inner awakening — the Silver Temple within every human being. In its silence people reconnect with inner peace, clarity of life, emotional balance, and true happiness from within.',
};
```

- [ ] **Step 2: Build `about.astro`** — `Layout` + `Navbar` + sections + `Footer` + `WhatsAppBar`:
  - Page hero band: eyebrow `ABOUT`, H1 `Awaken Your True Self`, intro paragraph (the docx HOME intro).
  - **The Problem** — copy from docx ("Today many people are successful externally but suffering internally…") + the "People are:" bullet list.
  - **3 Powerful Questions** — map `threePowerfulQuestions` into 3 cards.
  - **Silver Temple** — `silverTemple` text + image (`silver-temple-front.webp`) + the 3 `gpsHappiness` cards (G/P/S brass letters).
  - **Mission** — centered `mission` statement on a sage band.

- [ ] **Step 3: Build + visual verify** — `npm run build`; `/about` renders, nav highlights About.

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro src/data/site.ts
git commit -m "Add About page: Problem, 3 Questions, Silver Temple/GPS, Mission"
```

---

## Task 9: The Method page

**Files:**
- Create: `src/pages/method.astro`

**Interfaces:**
- Consumes: existing `philosophy347` export in `site.ts` (already has `alignment`/`awakening`/`transformations` with items).

- [ ] **Step 1: Build `method.astro`** — `Layout` + shell + sections:
  - Page hero: eyebrow `347 METHOD`, H1 `The Core Framework of Transformation`.
  - `#alignment` — "3 – Alignment" + the 3 `philosophy347.alignment.items` (Body / Mind / Spirit) as cards; use docx bodies (Body Alignment = "Healing the body through breath, movement, nutrition, rest, and energy balance." etc. — prefer the richer docx copy where it differs).
  - `#awakening` — "4 – Awakening": Morality, Mindfulness, Meditation, Wisdom (docx bodies).
  - `#transformation` — "7 – Life Transformation": the 7 items (Health, Emotional Balance, Love & Relationship, Self Development, Soul Work, Holistic Wealth, Life Purpose) in a 7-item grid with brass numbers.
  - Alternate section backgrounds cream / cream-dark; brass dividers between.

- [ ] **Step 2: Build + visual verify** — `/method` renders; the 3 homepage `LEARN MORE` anchors (`#alignment`, `#awakening`, `#transformation`) jump correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/method.astro
git commit -m "Add The Method page: 3 Alignment, 4 Awakening, 7 Transformation"
```

---

## Task 10: Programs page

**Files:**
- Create: `src/pages/programs.astro`
- Modify: `src/data/site.ts` (add `onSiteExperiences`, `onlineCourses`, `mentoringPrograms`)

**Interfaces:**
- Consumes: `wa`, `waMsg(course)` (existing), new data arrays.
- Produces: `/programs` with anchors `#online`, `#retreats`, `#mentoring`.

- [ ] **Step 1: Add data to `site.ts`**

```ts
export const onSiteExperiences = [
  { title: '347 Awakening Reset™', dur: '3 Hours', tagline: 'Reset Your Mind. Reconnect Your Life.',
    body: 'A transformative 3-hour experience to reset your mind, release emotional stress, and reconnect with inner peace and clarity.' },
  { title: '347 Inner Peace Experience™', dur: '1 Day', tagline: 'Return to Your True Self',
    body: 'A one-day awakening journey to reconnect with yourself, release emotional stress, and rediscover inner peace.' },
  { title: '347 Deep Awakening Retreat™', dur: '2 Days', tagline: 'Expand Your Consciousness',
    body: 'A two-day retreat guiding you through deep emotional healing, inner awakening, and conscious life transformation.' },
  { title: '347 Consciousness Intensive™', dur: '3 Days', tagline: 'The Ultimate Life Transformation Experience',
    body: 'A three-day journey to expand consciousness, awaken inner wisdom, and create profound life transformation.' },
];

export const onlineCourses = [
  { name: 'Awakening Starter Program', price: '$47', tagline: 'Calm Your Mind & Reconnect Yourself',
    duration: '1.5 Hours · 1 Live Online Session',
    learn: ['Quiet the busy mind', 'Basic awakening meditation', 'Breath & energy awareness', 'Emotional reset techniques', 'Daily 10-minute routine'],
    includes: ['Live Zoom Session', 'Guided Meditation Audio', 'Reflection Workbook PDF'] },
  { name: 'Deep Awakening Program', price: '$97', tagline: 'Break Inner Blocks & Transform Your Energy',
    duration: '3 Hours · 2 Live Sessions (90 min each)',
    learn: ['Deep emotional release meditation', 'Understanding subconscious patterns', 'Energy balancing', 'Reconnect with purpose', 'Confidence & abundance'],
    includes: ['2 Live Zoom Sessions', 'Guided Meditation Audio Pack', 'Self-Discovery Worksheet', 'Private Community Access'] },
  { name: 'Premium Life Transformation Program', price: '$147', tagline: 'Awaken Your True Self & Transform Your Life',
    duration: '6 Hours · 4 Live Sessions (90 min each)',
    learn: ['Advanced awakening meditation', 'Mind-body-spirit alignment', 'Healing trauma patterns', 'Finding life mission', 'Inner peace with success', 'Conscious living'],
    includes: ['4 Premium Live Sessions', 'Personal Meditation Guidance', 'Energy Alignment Practice', 'Life Mission Assessment', 'VIP Private Support', 'Certificate of Completion'] },
];

export const mentoringPrograms = [
  { name: '347 Clarity Session', tagline: 'One Session Can Change Your Direction.', duration: '90 Minutes',
    includes: ['1:1 Private Mentoring', 'Emotional Clearing', 'Consciousness Guidance', 'Personalized Insight'],
    pricing: ['Online: $147', 'In-Person: $197'] },
  { name: '347 Inner Reset Mentoring', tagline: 'Reset Your Energy. Reconnect with Your True Self.', duration: '1 Month',
    includes: ['4 Private Sessions', 'Meditation Guidance', 'Emotional & Energy Reset', 'Weekly Practice', 'WhatsApp / LINE Support'],
    pricing: ['Online: $888', 'VIP In-Person: $1,200'] },
  { name: '347 Conscious Leadership Mentoring', tagline: 'Success Without Inner Suffering.', duration: '2 Months',
    includes: ['8 Private Sessions', 'Mind Reprogramming', 'Emotional Mastery', 'Business + Life Alignment', 'Voice Message Support', 'Private Meditation Library'],
    pricing: ['Online: $2,500', 'VIP Private: $3,500'] },
];
```

- [ ] **Step 2: Build `programs.astro`** — shell + sections:
  - Page hero: eyebrow `PROGRAMS`, H1 `Premium Life Transformation Experiences`, 4 category intro cards (On-Site, Online, Retreats, Private Mentoring).
  - **On-Site — Chiang Mai** (`#retreats`) — map `onSiteExperiences` into cards; each "Book" → `waMsg(title)`.
  - **Online Courses** (`#online`) — map `onlineCourses` into 3 pricing cards with price, duration, "What you'll learn" list, "Includes" list, "Enroll" → `waMsg(name)`.
  - **Private Mentoring** (`#mentoring`) — map `mentoringPrograms` into 3 cards with includes + pricing, "Apply" → `waMsg(name)`.
  - Optionally append the existing FAQ (`#faq`) and Map at the bottom (relocated from old homepage) — import existing `FAQ`, `MapSection`.

- [ ] **Step 3: Build + visual verify** — `/programs` renders; `#online`, `#retreats`, `#mentoring` anchors work from homepage cards; WhatsApp links prefill the right course.

- [ ] **Step 4: Commit**

```bash
git add src/pages/programs.astro src/data/site.ts
git commit -m "Add Programs page: on-site, online courses, private mentoring"
```

---

## Task 11: Membership + Contact pages

**Files:**
- Create: `src/pages/membership.astro`, `src/pages/contact.astro`
- Modify: `src/data/site.ts` (add `membership`, `volunteer`)

**Interfaces:**
- Consumes: `wa`, `email`, `social`.
- Produces: `/membership`, `/contact` routes.

- [ ] **Step 1: Add data to `site.ts`**

```ts
export const membership = {
  name: '347 Inner Circle™ Essential',
  blurb: 'A global conscious community for ongoing growth, healing, and awakening.',
  priceMonth: '$27 / Month', priceYear: '$270 / Year',
  includes: ['Weekly Group Meditation', 'Monthly Consciousness Workshop', 'Private Community Access',
    'Emotional Healing Sharing Circle', 'Inspirational Teachings & Practices', 'Global Conscious Community'],
  perfectFor: 'People seeking peace, emotional healing, and spiritual connection.',
};

export const volunteer = {
  blurb: '347 Awakening is more than a program. It is a global mission to create a happier and more conscious world.',
  roles: ['Meditation', 'Healing', 'Conscious living', 'Community service', 'Event support', 'Content creation', 'Global impact'],
};

export const collaboration = ['Retreat partners', 'Wellness centers', 'Conscious leaders', 'Volunteers', 'Global ambassadors'];
```

- [ ] **Step 2: Build `membership.astro`** — shell + a centered membership card (name, blurb, two prices, includes checklist, "Perfect For") with **Join the Inner Circle** → `wa`; then a **Volunteer** band ("Become Part of the Movement", `volunteer.roles` chips, "Together We Create: Happy Life • Happy World", **Apply as Volunteer** → `wa`).

- [ ] **Step 3: Build `contact.astro`** — shell + hero `Begin Your Awakening Journey`; a contact-channels grid (Email → `mailto:email`, WhatsApp → `wa`, Instagram → `social.ig`, Facebook → `social.fb`, YouTube → `social.yt`); a **Collaboration Opportunities** list (`collaboration`). No form backend — channels are links.

- [ ] **Step 4: Build + visual verify** — both routes render; all links resolve.

- [ ] **Step 5: Commit**

```bash
git add src/pages/membership.astro src/pages/contact.astro src/data/site.ts
git commit -m "Add Membership and Contact pages"
```

---

## Task 12: Restyle remaining pages + final audit

**Files:**
- Modify: `src/pages/meditation-retreat-chiang-mai.astro`, `src/pages/booking.astro`, `src/pages/blog/best-meditation-retreat-chiang-mai.astro`
- Audit: all `src/components/*.astro` still used (About, OriginStory, MasterKaie, etc. if referenced by sub-pages).

- [ ] **Step 1: Recolor lingering hardcoded colors** — grep for raw hex / `violet`/`blue` utility usage in those three pages and the relocated section components; swap to the new tokens.

Run: `grep -rIn "bg-blue\|text-blue\|#1B2D5B\|#0D1B3E\|indigo\|purple-" src/` and fix hits.

- [ ] **Step 2: Update those pages' Navbar/Footer props** if their signatures changed; ensure each imports the rebuilt shell.

- [ ] **Step 3: Full link audit** — start `npm run dev`, click every nav link + footer link + CTA across all 6 pages; confirm no 404s and WhatsApp/mailto targets are correct.

- [ ] **Step 4: Build + verify** — `npm run build` succeeds with zero errors/warnings; check `dist/` produced all routes (`about`, `method`, `programs`, `membership`, `contact`, `index`).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Recolor legacy pages to new palette; final link + build audit"
```

---

## Self-Review

**Spec coverage:**
- Palette remap → Task 1. ✓
- Navbar/Footer/WhatsAppBar shell → Tasks 2–3. ✓
- Homepage 6 sections → Tasks 4–7. ✓
- About / Method / Programs / Membership / Contact → Tasks 8–11. ✓
- Journal = existing blog restyled → Task 12. ✓
- Preserved content (instructors, FAQ, map, pricing relocated) → Tasks 9–10 + 12. ✓
- WhatsApp/mailto-only forms → Tasks 6, 10, 11. ✓
- Data centralized in `site.ts` → Tasks 4, 8, 10, 11. ✓

**Placeholder scan:** Terms & Conditions / Privacy Policy footer links intentionally `#` placeholders (no pages requested) — flagged in Task 3 commit. Transparency-over-hero navbar marked optional in Task 2. No code-step placeholders.

**Type/name consistency:** `methodPillars`, `pathCards`, `retreatFeatures`, `threePowerfulQuestions`, `gpsHappiness`, `silverTemple`, `mission`, `onSiteExperiences`, `onlineCourses`, `mentoringPrograms`, `membership`, `volunteer`, `collaboration`, `navLinks` — each defined once and consumed by name. Anchors `#alignment/#awakening/#transformation` (Method), `#online/#retreats/#mentoring` (Programs), `#free-meditation` (home) are consistent between producer and consumer tasks.

## Risks

- Hero/program imagery reuses existing webp assets; if the user supplies closer matches, drop into `public/images/` and swap the `src`.
- `philosophy347` docx bodies differ slightly from existing `site.ts` bodies — Task 9 prefers the richer docx copy.
