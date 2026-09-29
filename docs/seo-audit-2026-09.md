# SEO audit — September 2026

Source: Google Search Console export, Web search, last 28 days (2026-08-30 → 2026-09-26).

## The numbers

| Metric | Value |
|---|---|
| Clicks | 13 |
| Impressions | 216 |
| Mobile | 13 clicks, 110 impr, avg position **5.3** |
| Desktop | 0 clicks, 106 impr, avg position **15.4** |

| Page | Clicks | Impr | Avg pos |
|---|---|---|---|
| `/` | 9 | 123 | 4.4 |
| `/blog/best-meditation-retreat-chiang-mai/` | 3 | 87 | 18.6 |
| `/membership/` | 1 | 25 | 4.5 |
| `/method/` | 0 | 25 | 6.4 |
| `/about/` | 0 | 21 | 4.9 |
| `/meditation-retreat-chiang-mai/` | — | **not in report** | — |

Money keywords are on page 3–5:

| Query | Avg pos |
|---|---|
| meditation retreat chiang mai | 32 |
| chiang mai meditation retreat | 25.8 |
| meditation retreat thailand chiang mai | 48.6 |
| vipassana chiang mai | 26 |
| chiang mai spiritual retreat | 71 |

Long-tail queries already rank #1–2 (few impressions each): "chiang mai meditation center",
"meditation class chiang mai", "silent retreat chiang mai", "chiang mai sound bath".

## Why Google Maps shows you first but the website does not rank

Google Maps (the "local pack") and the normal blue-link results are **two separate ranking systems**.

* **Maps / local pack** ranks your **Google Business Profile**: how close the searcher is,
  how well your category and name match the search, and your reviews and ratings. You are right
  at the Silver Temple and have a strong profile, so you win there.
* **Organic results** rank **web pages**: how much content the page has, how well it matches
  the search, and above all how many other sites link to yours. 347awakening.com is a
  young domain (redesigned in mid-2026) with almost no external links. For "meditation retreat
  chiang mai" it is competing with TripAdvisor, BookRetreats, Retreat Guru, Wikipedia-style
  guides and older retreat centres. Those sites have years of links.

Two things in the site made this worse (both fixed in this commit, see below):

1. **The page built for the main keyword was hidden.** `/meditation-retreat-chiang-mai/` had
   only one internal link, buried inside the blog post. It was not in the navbar, footer
   or homepage, so Google barely crawled it and it got zero impressions. Google ranked the blog
   post instead, at position 18–32.
2. **The homepage title didn't mention meditation, retreat, or Chiang Mai.** It was
   "347 Awakening — Awaken Through Presence | Happy Life Happy World". The homepage gets the most
   impressions, but its title matched nothing people search for.

On mobile in Chiang Mai your Maps listing *is* the result people click, which is why mobile has
all 13 clicks. Desktop searchers (often abroad and planning a trip) see organic results.
There you are on page 2 and get 0 clicks.

## Fixed in this commit

* New 347 Awakening logo in the navbar, footer, favicons, Apple/Android home-screen icons,
  and the logo in Google's structured data (`logo.png`, 512×512). Navbar and footer now load a
  7 KB version instead of the full-size file.
* Homepage title changed to **"347 Awakening | Meditation Retreat in Chiang Mai at Silver Temple"**,
  and the description now names Wat Sri Suphan, Vipassana, and the retreats.
* Internal links to `/meditation-retreat-chiang-mai/` from the footer (every page) and from
  the homepage retreats section, using the keyword as link text.
* Structured data cleanup:
  * Removed the `SearchAction`. The site has no search at `/?q=`, and Google retired the
    sitelinks search box.
  * Removed the `VideoObject`. The TikTok video is not embedded on any page, and markup for
    content that isn't on the page goes against Google's guidelines.
  * Added `@id` to LocalBusiness and Organization, and added the Google Maps listing name
    ("347 Happy life meditation retreat") as an `alternateName`. This helps Google connect the
    website to the Maps listing.

## Round 2: SEO + GEO fixes

"GEO" here covers both **local geo** (Google Maps / local search) and **generative engine
optimization** (being quoted by Google AI Overviews, ChatGPT, Perplexity, Gemini).

* **Map pin fixed.** The site told Google the business was at 18.7787367, 98.9810711. That is
  the map viewport centre from the Maps URL and is about 270 m west of the real pin. The
  LocalBusiness `geo`, `geo.position`, and `ICBM` now use the Maps listing's pin
  (18.7787316, 98.983646), and `hasMap` links to the exact listing.
* **`/meditation-retreat-chiang-mai/` rewritten** (~400 → ~1,080 words). It opens with a
  direct answer, then has a Quick Facts table, retreat and experience prices, what you practice,
  who it's for, four Google reviews, directions, a 12-question FAQ, and the map. The page also
  outputs its own FAQPage structured data. Every fact comes from existing site content.
  Answer-first paragraphs and fact tables are the format AI answers quote from.
* **`/llms.txt`** added: a plain-text summary of the business and key pages for AI crawlers.
* **Titles** for Programs, About, and Method now say what the page is about (for example,
  "Meditation Classes, Retreats & Online Courses in Chiang Mai").
* **Social share image** is now a 1200×630 JPEG (`og-silver-temple.jpg`), which WhatsApp,
  LINE, Facebook and LinkedIn all preview reliably. The Twitter description now matches each page.
* Removed the `meta keywords` tag, which Google ignores.

## What you need to do (outside the code), in priority order

1. **Google Business Profile**
   * Check that the **Website** field is exactly `https://347awakening.com/`. Optionally append
     `?utm_source=google&utm_medium=organic&utm_campaign=gbp` so Maps clicks show up separately in Analytics.
   * Use **one business name everywhere**. Today there are three: "347 Happy life meditation
     retreat" (Maps), "347 Happy Life Happy World" (site), and "347 Awakening" (logo). Choose the
     real brand name and use it on Maps, the website, Facebook, Instagram, TikTok and directories.
     Don't add keywords to the Maps name that aren't part of the real name; Google can suspend
     listings for that.
   * Keep asking every student for a review. Reviews that mention "meditation", "Silver Temple",
     or "Chiang Mai" in their own words help both Maps and organic results.
   * Post weekly (photos, upcoming retreats) and add the Products/Services list with prices.
2. **Search Console**
   * URL Inspection → `https://347awakening.com/meditation-retreat-chiang-mai/` → *Request indexing*.
     Do the same for `/` after this deploy.
   * Confirm `sitemap-index.xml` is submitted and shows "Success".
3. **Get links from other sites.** This is what's holding the organic ranking back most. List the
   retreats on BookRetreats, Retreat Guru, BookYogaRetreats/BookMeditationRetreats, TripAdvisor
   (Attractions → Classes & Workshops), Airbnb Experiences, GetYourGuide/Klook. Also get listed in
   Chiang Mai expat and digital-nomad directories and Facebook groups, and ask travel bloggers who
   attend to link to you. Each listing should use the same name, address and phone number and link
   to 347awakening.com.
4. **Make `/meditation-retreat-chiang-mai/` the best page for the keyword.** It is about 400
   words today. Add a typical day's schedule, what to bring and wear, how to get there, real photos
   of your sessions (not stock photos), student reviews, and 6–8 FAQs. Aim for 1,200+ useful words.
   The blog post should link to it as the main booking page, and the two shouldn't repeat each other.
5. **More long-tail pages.** You already rank #1–2 for small queries. Write one focused page or
   post each for: *Vipassana meditation in Chiang Mai*, *silent meditation retreat Chiang Mai*,
   *sound bath Chiang Mai* (only if you offer it), *meditation class for beginners in Chiang
   Mai*, and *Wat Sri Suphan meditation*. Link each one to the retreat page.
6. **Later:** a Thai-language version (see `docs/i18n-plan.md`) with `hreflang`. Many of your
   impressions come from Thailand.

## How to measure progress

Compare the next 28-day Search Console export with this one. Watch the average position for
"meditation retreat chiang mai" (32 today), whether `/meditation-retreat-chiang-mai/` appears in
the Pages report, and desktop clicks (0 today). New and small sites usually take 2–4 months to
show movement after changes like these.
