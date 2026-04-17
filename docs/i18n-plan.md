# Multi-language plan — 347 Awakening

Scope: add Thai (TH) and Simplified Chinese (ZH) alongside the existing English site, with proper SEO (hreflang, per-language canonicals) and without regressing Core Web Vitals.

This document is a plan only — no code is written yet. It exists so we can argue about approach before committing to the 1–2 weeks of work.

## 1. URL structure

Decision: path-based prefixing, English as default without prefix.

```
https://347awakening.com/          ← English (default, no prefix)
https://347awakening.com/th/       ← Thai
https://347awakening.com/zh/       ← Simplified Chinese
```

Why path-based (not subdomain, not country-TLD):
- GitHub Pages hosting only supports one apex + one `CNAME` cleanly.
- Astro's built-in i18n routing uses path prefixes by default.
- Single domain means all localized versions inherit the same backlink authority.

Alternative considered: `?lang=th` query strings — rejected because Google treats it as one URL and won't index the translations separately.

## 2. Astro i18n configuration

Astro has native i18n since 3.5. In `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://347awakening.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th', 'zh'],
    routing: {
      prefixDefaultLocale: false,   // keep / for EN
      redirectToDefaultLocale: false,
    },
    fallback: { th: 'en', zh: 'en' }, // if a page is missing in TH/ZH, serve EN
  },
});
```

Pages will live at:

```
src/pages/index.astro        → /
src/pages/th/index.astro     → /th/
src/pages/zh/index.astro     → /zh/
```

Each is a thin shell that imports the same components and a locale-specific data file.

## 3. Content externalization

The blocker. Right now all copy is hardcoded inside `.astro` components (e.g. the hero H1 is a string literal inside `Hero.astro`). Translation is impossible until copy is externalized.

Recommended approach: a per-locale data file, keyed by section.

```
src/data/
  site.ts              ← contact info, links (locale-agnostic)
  copy.en.ts           ← all English strings
  copy.th.ts           ← Thai strings
  copy.zh.ts           ← Chinese strings
  copy.ts              ← helper that picks the right file based on Astro.currentLocale
```

Shape example (`copy.en.ts`):

```ts
export default {
  hero: {
    eyebrow: 'Awakening Meditation Experience, Chiang Mai',
    headline: 'Awaken Your Life Through Meditation',
    tagline: 'Awaken your mind. Transform your life. Create your happy world.',
    primaryCta: 'Book via WhatsApp',
    secondaryCta: 'Explore Courses',
  },
  about: { /* ... */ },
  faqs: [ /* array of {q, a} */ ],
  testimonials: [ /* unchanged; usually stay in source language */ ],
};
```

Components then become:

```astro
---
import copy from '../data/copy';
const t = copy.hero;
---
<h1>{t.headline}</h1>
<p>{t.tagline}</p>
```

Effort estimate: ~1 day to externalize EN copy across 17 components without changing the rendered output. This is the hidden cost that makes i18n a "real" project.

## 4. Translation workflow

Two options, pick one:

1. **Professional translator** (recommended for TH at minimum — Master Kaie is a Thai spiritual brand and machine-translated Thai meditation copy will read wrong). Budget ~$300–500 per language for a site this size.
2. **LLM draft + native review** — cheaper first pass. Use GPT-4 / Claude for the full translation, then pay a native speaker 2–3 hours to fix tone and religious terminology. Particularly important for Buddhist vocabulary (วิปัสสนา, อาราม, สมาธิ vs. literal English-origin translations).

For ZH specifically: confirm Simplified (PRC + Singapore) vs. Traditional (Taiwan + Hong Kong). For meditation retreat marketing, **Simplified is the higher-volume audience** but Traditional users will still read it. Only bother with both if analytics shows demand.

Testimonials: keep in the original language the person wrote them in and mark each with `lang="en|th|zh"` — don't machine-translate social proof.

## 5. hreflang

Every page must declare its language alternates. Add to `Layout.astro`:

```astro
---
const { locale } = Astro.currentLocale ? { locale: Astro.currentLocale } : { locale: 'en' };
const path = Astro.url.pathname.replace(/^\/(th|zh)/, '') || '/';
---
<link rel="alternate" hreflang="en"      href={`https://347awakening.com${path}`} />
<link rel="alternate" hreflang="th"      href={`https://347awakening.com/th${path}`} />
<link rel="alternate" hreflang="zh-Hans" href={`https://347awakening.com/zh${path}`} />
<link rel="alternate" hreflang="x-default" href={`https://347awakening.com${path}`} />
<link rel="canonical" href={`https://347awakening.com${Astro.url.pathname}`} />
```

Also update `<html lang={locale}>` per page — currently hardcoded to `"en"`.

## 6. Structured data updates

The JSON-LD blocks in `Layout.astro` contain English strings (description, slogan, keywords, offer names). These need locale-aware values. Simplest path: pass the localized copy into the schema builder.

- `inLanguage` on every schema block should be `"en" | "th" | "zh"` matching the page.
- `knowsLanguage` on LocalBusiness can stay as `["en", "th"]` (what Master Kaie actually teaches in).
- The `Course` offerings keep the same prices, but `description` and `name` change per locale.

## 7. Fonts

Cormorant Garamond ships Latin glyphs only. On a Thai or Chinese page the heading font will silently fall back to Georgia/serif — which looks OK but loses your brand voice.

- **Thai**: pair with a Google Font like "Noto Serif Thai" or "Sarabun" for body. Match weight to Cormorant (500/600/700).
- **Chinese**: "Noto Serif SC" (or Sans SC) for Simplified. These are large files — lazy-load by locale so EN pages don't download them.

Implementation: conditional font `<link>` based on `Astro.currentLocale`. Don't preload Chinese fonts on an English page.

## 8. Sitemap

`@astrojs/sitemap` handles i18n automatically when `i18n` is configured — it emits one `<url>` per locale per page with matching `<xhtml:link>` hreflang entries. Verify after deploy that the sitemap lists all three locale variants.

## 9. What stays English

Some content should NOT be translated:
- Brand name "347 Happy Life Happy World" (it's a brand, not a phrase)
- Master Kaie's name
- WhatsApp button label in Thai might stay "WhatsApp" (universally recognized)
- Prices in USD (but show THB conversion alongside in all locales)

## 10. Phased rollout

Don't ship all three at once.

1. **Phase 1 (week 1)** — Externalize EN copy into `copy.en.ts`. No visible change, tests that the refactor didn't break rendering. Ship to prod.
2. **Phase 2 (week 2)** — Add TH. Chiang Mai has a significant Thai meditation student audience and this is your highest-ROI locale. Get a native speaker to review.
3. **Phase 3 (later)** — Add ZH once TH is stable and traffic data confirms demand. Consider starting with a landing page only (`/zh/`) that covers the main value prop + WhatsApp CTA, rather than translating every long-form section.

## 11. Analytics

Before shipping TH/ZH, add language detection to Google Analytics:
- Track `page_location` + browser `language` property.
- Use this to prove demand for each language before investing in the full translation.

Cost to run the experiment: one custom dimension in GA, zero code.

## 12. Out of scope

- **RTL languages** (Arabic, Hebrew) — would require bidirectional CSS. Not in plan.
- **Dynamic locale detection** (auto-redirect based on Accept-Language) — actively hurts SEO and breaks when users share links. Let the user pick their language.
- **Translating review testimonials** — as noted above, keep in source language.

---

## Rough effort estimate

| Phase | Work | Owner | Time |
|---|---|---|---|
| 1 | Externalize EN copy into `copy.en.ts` | Dev | 1 day |
| 1 | Wire Astro i18n config + hreflang + `<html lang>` | Dev | 0.5 day |
| 2 | Translate to TH (LLM draft) | AI | 2 hours |
| 2 | Native review + polish TH | Translator | 3–4 hours |
| 2 | Thai font integration | Dev | 2 hours |
| 2 | QA on `/th/` | Both | 0.5 day |
| 3 | Same for ZH | Same | 1–2 days |

Total to ship EN+TH: **~3 dev days + translator cost**. ZH adds another ~2 days when you decide to add it.
