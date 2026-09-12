# Task 4 Report: Inner Pages and Content

## Status

Implemented and verified the Task 4 inner-page redesign without changing the
Task 3 homepage or sourcing new images.

## Changes

- Expanded About with the Silver Temple's Lanna history, inner-temple
  symbolism, GPS Happiness context, and the approved mission/problem content.
- Kept the Method page's 3 Alignment, 4 Awakening, and 7 Life Transformation
  structure and anchors, and made the seven transformation terms explicit in
  the section hierarchy.
- Rebuilt Programs around “More Than Meditation. It Is Awakening.” with
  separate on-site, retreat, online, and private mentoring sections.
- Rendered all centralized authoritative on-site, online, and retreat prices in
  both THB and USD on visible cards. Mentoring retains the approved USD prices
  and explicitly marks THB pricing as available on request because the DOCX
  does not provide authoritative THB values.
- Updated Programs anchors to `#onsite`, `#retreats`, `#online`, and
  `#mentoring`, with working WhatsApp booking links for every applicable card.
- Updated Membership, Volunteer, and Contact content while preserving existing
  WhatsApp, email, Facebook, Instagram, and YouTube links; added the available
  TikTok channel to Contact.
- Updated Booking to retain the Google Form, add current category/pricing
  context, and provide WhatsApp and email alternatives within the shared shell.
- Updated the meditation landing page and journal page to use current
  awakening language, current retreat pricing, and working WhatsApp CTAs.
- Restyled FAQ and map content to the approved ivory/forest/brass system and
  added a location anchor.

## Verification

- `npm run build`: passed; 11 static pages generated.
- Generated route existence check: passed for all 11 routes.
- Programs content/anchor check: passed for `onsite`, `retreats`, `online`,
  `mentoring`, `faq`, and `location`, plus all authoritative visible pricing
  strings and the approved introduction.
- Internal route and same-page fragment check: passed after excluding valid
  static asset and generated CSS paths.
- `git diff --check`: passed.

## Scope

Only the Task 4 page/component/data files and this report are intended for the
Task 4 commit. Existing modifications to image assets, `package-lock.json`,
and untracked redesign plan/spec documents were not staged.

## Concerns

- The DOCX provides no authoritative THB prices for private mentoring or
  membership. Those surfaces show the existing USD amounts and a clear
  “THB pricing available/on request” note rather than inventing exchange-rate
  conversions.
- The legacy `src/components/CourseCards.astro` still contains pre-existing
  catalogue prices, but it is not rendered by the current routes and was
  outside the Task 4 file list. It remains a Task 6/cleanup consideration.
- No automated test script is configured. The checks above are generated-site
  assertions executed directly with Node.

## Task 4 Follow-up Fixes

- Expanded Booking to render every item from the centralized on-site,
  online-course, and retreat arrays, plus a clear private-mentoring
  contact/on-request panel. No pricing tiers are hardcoded in the page.
- Changed Booking metadata to describe booking an on-site experience, online
  program, retreat, or private mentoring path rather than only a retreat.
- Added the typed `MentoringPrice` shape and normalized `label`, `usd`, and
  `display` values in `src/data/site.ts`. Programs now renders `display`
  directly, and Layout structured data consumes `label`/`usd` without
  render-time string replacement.
- Left legacy `CourseCards.astro` unchanged as requested.

## Follow-up Verification

- Pre-fix regression assertion: failed as expected because Booking used sliced
  partial data, stale retreat metadata, and render-time mentoring formatting.
- Follow-up source assertion: passed for full centralized collections, general
  booking metadata, typed mentoring data, and normalized schema consumption.
- `npm run build`: passed; 11 static pages generated.
- `git diff --check`: passed before staging.

## Approved Instructor Follow-up

- Added the existing approved instructor section to About immediately before
  the mission CTA, reusing `Instructors.astro` and centralized instructor data.
  Master Swan renders `/images/master-sawan.webp`; Master Kaie retains the
  existing initials fallback until a photo is supplied. The homepage was not
  changed.
