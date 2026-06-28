# 347 Awakening — Full Site Redesign

**Date:** 2026-06-28
**Status:** Approved (brainstorming) → ready for implementation plan

## Goal

Rebuild the existing single-page Chiang Mai meditation-retreat site into a multi-page
"347 Awakening" brand site that matches the supplied design mockup: a warm
cream/sage/olive/gold editorial aesthetic, a full top navigation, and broader brand
content sourced from `347 Awakening website_A.docx`.

## Decisions (from brainstorming)

- **Scope:** Homepage + real standalone sub-pages (About, The Method, Programs, Membership, Contact). Journal = existing blog (restyled). Retreats = anchor within Programs.
- **Palette:** Switch to the mockup's earthy palette (cream / sand / olive-sage / deep-forest / brass-gold / espresso ink).
- **Content:** Broader 347 brand from the docx ("Awaken Your True Self", 347 Method 3-Alignment / 4-Awakening / 7-Life-Transformation, programs, instructors, membership, volunteer, contact).
- **Forms:** WhatsApp / mailto links only. No backend. Email-capture box becomes a WhatsApp CTA.

## Non-goals

- No backend, CMS, or form-storage service.
- No new runtime dependencies (stay on Astro 6 + Tailwind v4).
- No new fonts (Cormorant Garamond + Inter already loaded and match the mockup).
- No unrelated refactoring beyond what the redesign touches.

## Architecture

Astro 6, component-per-section, Tailwind v4 with a `@theme` token block in
`src/styles/global.css`. Shared content lives in `src/data/site.ts`. Pages compose
shared shell components (`Navbar`, `Footer`, `WhatsAppBar`) plus page-specific section
components.

### 1. Design system (`src/styles/global.css`)

Replace the royal-blue `@theme` tokens with the earthy palette, **keeping the existing
token names** (`--color-royal`, `--color-gold`, `--color-deep-blue`, `--color-cream`,
the `violet`/`deep-calm` aliases, etc.) remapped to new hex values so existing component
class names keep working and recolor in one place.

| Role | Token(s) | Hex |
|---|---|---|
| Cream base (page bg) | `--color-cream`, `--color-ivory` | `#F5F0E6` |
| Warm sand (alt sections) | `--color-ivory-dark`, `--color-cream-dark` | `#EAE3D4` |
| Olive / sage (buttons, icon circles, primary) | `--color-royal`, `--color-violet` | `#6E7559` |
| Deep forest (footer, dark CTA) | `--color-deep-blue`, `--color-violet-dark` | `#3B4232` |
| Brass gold (accents, dividers) | `--color-gold`, `--color-deep-calm` | `#B8995A` |
| Gold-ink (AA-safe gold text on light) | `--color-gold-ink` | `#8A6F26` (re-verify contrast) |
| Espresso ink (text) | `--color-body`, `--color-dark-charcoal` | `#3A352C` |
| Body light / muted | `--color-body-light`, `--color-body-muted` | `#5B5547` / `#7A7363` |

Keep all existing animation/utility classes (`breathe`, `pageArrive`, lotus divider,
particles) — recolor where they reference blue/gold. Re-verify WCAG AA on text colors
after remap.

### 2. Shared shell

- **`Navbar.astro`** — rebuild to mockup: stacked `347 / AWAKENING / Happy Life Happy World`
  wordmark left; centered nav (Home, About, The Method, Programs, Retreats, Membership,
  Journal, Contact); brass pill **"Join the Journey"** → WhatsApp, right. Transparent over
  hero, cream background + shadow on scroll. Mobile hamburger → drawer.
- **`Footer.astro`** — deep-forest band: wordmark + "Happy Life Happy World"; three columns
  (Quick Links / Resources / Stay Connected) + Instagram / Facebook / YouTube / email icons;
  copyright row.
- **`WhatsAppBar.astro`** — keep, recolored.

### 3. Homepage (`src/pages/index.astro`)

Section order (each its own component):

1. **`Hero`** — eyebrow "RETURN TO ALIGNMENT" → headline *Awaken Through Presence* →
   subcopy → buttons **Begin Your Journey** (WhatsApp) + **Free Meditation** (#free-meditation).
   Background reuses `hero-main.webp` with a soft overlay.
2. **`MethodOverview`** — "THE 347 AWAKENING METHOD" / "Body. Mind. Spirit. Aligned." +
   3 icon cards: *3 – Body Alignment*, *4 – Mind Alignment*, *7 – Spirit Alignment*,
   each "Learn More" → `/method`.
3. **`ProgramsOverview`** ("Find the Path for You") — 4 cards: Online Courses → `/programs`,
   Membership → `/membership`, Retreats → `/programs#retreats`, Private Mentoring → WhatsApp.
4. **`RetreatsBand`** ("A Journey Back to Yourself") — image + 5 mini-icons (Meditation,
   Healing, Nature, Conscious Living, Inner Connection) + "Explore Retreats" → `/programs#retreats`.
5. **`Testimonials`** — carousel reusing the 6 existing Google reviews.
6. **`FreeMeditationCTA`** (`#free-meditation`) — "Free Meditation for Busy Leaders" band,
   name/email fields are decorative; primary action = WhatsApp "Get Free Access".
7. **`Footer`**.

### 4. Sub-pages

Each = `Layout` + `Navbar` + page sections + `Footer` + `WhatsAppBar`.

- **`/about`** (`about.astro`) — The Problem · 3 Powerful Questions (Who Am I / Why Born /
  My Mission) · Silver Temple & GPS Happiness (Gratitude / Presence / Service) · Mission.
- **`/method`** (`method.astro`) — 3 Alignment (Body/Mind/Spirit) · 4 Awakening
  (Morality/Mindfulness/Meditation/Wisdom) · 7 Life Transformations (the 7 items).
- **`/programs`** (`programs.astro`) — On-Site Chiang Mai (4 experiences) · Online Courses
  ($47 Starter / $97 Deep Awakening / $147 Premium, with duration/audience/learn/includes/result) ·
  `#retreats` anchor · Private Mentoring (Clarity $147/$197 · Inner Reset $888/$1,200 ·
  Conscious Leadership $2,500/$3,500). Each "Book"/"Apply" → WhatsApp with prefilled message.
- **`/membership`** (`membership.astro`) — 347 Inner Circle Essential ($27/mo · $270/yr,
  includes list, "Perfect For") + Volunteer section ("Become Part of the Movement", roles,
  "Apply as Volunteer" → WhatsApp).
- **`/contact`** (`contact.astro`) — Begin Your Awakening Journey; contact channels
  (Email mailto, WhatsApp, Instagram, Facebook, YouTube); Collaboration Opportunities list.

### 5. Preserved existing content

Instructors (Master Swan, Master Kaie), FAQs, Google map, and detailed pricing are not
deleted — they relocate: instructors → About or Method; FAQ + map → Programs or Contact;
pricing → Programs. The existing `meditation-retreat-chiang-mai.astro` SEO page and blog
post stay and get recolored.

### 6. Data (`src/data/site.ts`)

Extend (do not rewrite) existing exports. Add: `gpsHappiness`, `silverTemple`,
`threePowerfulQuestions`, `onlineCourses[]`, `onSiteExperiences[]`, `mentoringPrograms[]`,
`membership`, `volunteer`, `instructors[]`, `navLinks[]`. Components import data rather than
hardcoding copy.

## Build phases (each independently testable via `npm run build` + visual check)

1. **Design tokens** — remap palette in `global.css`; verify existing site builds & renders.
2. **Shell** — rebuild `Navbar` + `Footer` to mockup; verify on existing homepage.
3. **Homepage** — build the 6 new section components + recompose `index.astro`.
4. **Sub-pages** — `/about`, `/method`, `/programs`, `/membership`, `/contact` + data.
5. **Restyle** — blog + SEO + booking pages to new palette; final nav-link audit.

## Testing / verification

- `npm run build` passes after each phase (Astro type-checks pages).
- `npm run dev` + manual visual check of each page against the mockup at desktop + mobile widths.
- Nav links resolve (no 404s); all CTAs open correct WhatsApp/mailto targets.
- WCAG AA spot-check on recolored text via contrast ratios.
- No console errors; images use existing webp assets (no missing assets).

## Risks / open items

- Mockup hero shows a person meditating on a deck; we reuse `hero-main.webp` (Silver Temple).
  If a closer-matching image is wanted, user can drop one into `public/images/`.
- Some program/mentoring imagery has no asset yet — reuse existing retreat photos as placeholders.
