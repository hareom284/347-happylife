# 347 Awakening Full-Site Reference Redesign

## Goal

Update the entire 347 Awakening Astro website to closely match the supplied
reference screenshot while applying the content and pricing from
`347 Awakening website_B.docx`.

The existing Astro/Tailwind architecture and reusable components should be
retained where they support the new design. The work should favor focused
component and data updates over an unnecessary rewrite.

## Approved Decisions

- Scope includes the homepage and all existing inner pages.
- The DOCX is authoritative for program names and pricing.
- Existing local images may be replaced or supplemented with royalty-free
  Unsplash/Pexels images.
- Selected external images will be downloaded into `public/images` rather than
  hot-linked, then optimized for responsive delivery.
- The free meditation strip will use a `mailto:` submission flow.
- Existing private mentoring details may remain where the DOCX gives names but
  no descriptions or prices.

## Visual System

- Use the supplied screenshot as the visual reference for hierarchy, spacing,
  section order, card proportions, and overall density.
- Use a warm ivory background, forest/deep green sections, and brass/gold
  accents.
- Continue using Cormorant Garamond for display headings and Inter for body
  text.
- Use editorial whitespace, thin warm borders, rounded cards, restrained
  shadows, and image-led sections.
- Preserve clear hover, focus, pressed, and reduced-motion states.
- Keep interactive targets usable on touch screens and prevent fixed mobile UI
  from covering content.

## Homepage Structure

The homepage will follow this order:

1. Sticky header with logo, primary navigation, active-page state, and Journey
   CTA.
2. Full-width hero with a locally stored meditation/mountain image, the
   headline “Awaken Through Presence,” supporting copy, Journey and Free
   Meditation CTAs, and the Chiang Mai location label.
3. 347 Method section presenting “Align · Awaken · Transform” through the 3,
   4, and 7 pillars.
4. “Find the Path for You” program grid with five cards: On-Site Courses,
   Online Courses, Retreats, Private Mentoring, and Membership.
5. Luxury retreat feature section with image, feature icons/labels, and an
   Explore Retreats CTA.
6. Testimonial section styled as a dark visual band with a featured testimonial
   and accessible navigation if carousel behavior is retained.
7. Free meditation strip with visible Name and Email labels and a mailto-based
   submission action.
8. Dark green footer with quick links, resources, social links, and legal-link
   behavior that does not use placeholder `#` destinations.

## Inner Pages

### About

Use the DOCX content for the problem statement, three questions, Silver Temple
history and symbolism, GPS Happiness, and mission. Preserve readable sections
and meaningful image alt text.

### Method

Present the complete framework:

- 3 Alignment: Body, Mind, Spirit
- 4 Awakening: Morality, Mindfulness, Meditation, Wisdom
- 7 Life Transformation: Health, Emotional Balance, Love & Relationship, Self
  Development, Soul Work, Holistic Wealth, Life Purpose

### Programs

Add the DOCX introduction explaining “More Than Meditation. It Is Awakening,”
then separate the content into clearly labeled on-site, online, retreat, and
private mentoring sections.

The displayed pricing must use both THB and USD where provided by the DOCX.

### Membership, Volunteer, and Contact

Apply the DOCX copy and preserve the current working WhatsApp, email, social,
and collaboration pathways. The contact page should expose all channels listed
in the requirements where URLs are available.

### Booking

Retain the Google Form as the primary booking flow, but show current program
categories/pricing context and a prominent WhatsApp fallback.

## Authoritative Pricing

### On-site Experiences

- 347 Alignment Experience: 3 hours, THB 1,500 / USD 47
- 347 Awakening Experience: 3 hours, THB 2,500 / USD 77
- 347 Life Transformation Experience: 3 hours, THB 3,500 / USD 111
- 347 Awakening Journey: 1 day, THB 7,000 / USD 219

### Online Programs

- 347 Awakening Starter Program: THB 800 / USD 27
- 347 Deep Awakening Program: THB 2,500 / USD 77
- 347 Premium Life Transformation Program: THB 7,000 / USD 219

### Retreats

- 1 day: THB 7,000 / USD 219
- 2 days: THB 12,000 / USD 347
- 3 days: THB 15,000 / USD 477

These values must stay synchronized across visible cards, WhatsApp message
labels, FAQ copy, and JSON-LD offers.

## Image Strategy

- Prefer existing local images when they fit the composition.
- Add royalty-free images from Unsplash or Pexels when the reference requires
  mountain meditation, retreat, nature, mentoring, or community imagery that is
  not available locally.
- Store downloaded assets in `public/images` with descriptive names.
- Provide dimensions, responsive variants, and suitable `srcset`/`sizes` for
  large images.
- Use high priority only for the actual homepage hero image; lazy-load below-
  fold images.
- Record source/credit information in a project document or asset manifest if
  required by the chosen provider license.

## SEO and Accessibility

- Generate page-specific canonical and Open Graph URLs from the current route.
- Only emit FAQ and breadcrumb structured data where the corresponding page
  content is present, with page-appropriate breadcrumb items.
- Update LocalBusiness/Course/Offer structured data to match DOCX pricing.
- Preserve one clear `h1` per page and sequential heading hierarchy.
- Add accessible labels or `aria-hidden` attributes for icon-only/decorative
  SVGs.
- Ensure all external new-tab links use `rel="noopener noreferrer"`.
- Ensure the mobile WhatsApp bar reserves bottom space and respects safe-area
  insets.

## Acceptance Criteria

- Homepage section order and visual hierarchy closely match the supplied
  screenshot at desktop width.
- Homepage and inner pages remain usable at 375px, tablet, and desktop widths.
- All DOCX prices appear correctly in visible content and structured data.
- All primary CTAs lead to working internal routes, WhatsApp links, or the
  mailto flow.
- No intentional placeholder links remain in the footer.
- Production build succeeds.
- Astro type/content checks pass under the supported Node version.
- Generated pages have valid assets, metadata, and no known horizontal
  overflow.
