/**
 * Generate responsive WebP and AVIF variants for the large images in public/images/.
 *
 * Run with:  node scripts/optimize-images.mjs
 *
 * Output files are written alongside the source in public/images/ as:
 *   <name>-<width>.webp    (e.g. silver-temple-front-800.webp)
 *   <name>-<width>.avif    (e.g. silver-temple-front-800.avif)
 *
 * Keep in sync with the <img srcset="..."> declarations in the Astro components
 * (Hero, PhotoGallery, About, FinalCTA). When you add a new oversized source,
 * add it to TARGETS below and re-run.
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG_DIR = join(__dirname, '..', 'public', 'images');
const SRC_DIR = join(__dirname, 'source-images');

// Source -> target widths to generate. We pick widths that cover common
// display sizes on mobile (~400), tablet (~800) and desktop (~1200-1600).
const TARGETS = [
  // About/FinalCTA usage. Source is 1024x741.
  { src: 'silver-temple-front.webp', widths: [480, 800, 1280], quality: 72 },
  // PhotoGallery only. Source is 600x352.
  { src: 'retreat-photo-2.webp',     widths: [480],       quality: 72 },
  // PhotoGallery only. Source is 600x265.
  { src: 'retreat-photo-3.webp',     widths: [400],       quality: 72 },
  // ProgramsOverview only. Source is 600x806 — portrait card.
  { src: 'retreat-meditation.webp',   widths: [400],       quality: 72 },
  // PhotoGallery only. Source is 1024x1024 — square.
  { src: 'hero-main.webp',           widths: [400, 800],       quality: 74 },
  // Homepage mentoring card. Source is 1600x1067.
  { src: 'mentoring-session.webp',    widths: [400, 800, 1280], quality: 74 },
  // Homepage membership card. Source is 1600x900.
  { src: 'community-circle.webp',     widths: [400, 800, 1280], quality: 74 },
  // Homepage hero. Source is 2400x1351 after local optimization.
  { src: 'silver-temple-peter-borter.webp', widths: [480, 800, 1280], quality: 76 },
  // Homepage retreat feature. Source is 2400x1600 after local optimization.
  { src: 'silver-temple-sergei-bezzubov.webp', widths: [480, 800, 1280], quality: 76 },
  // About page image. Source is 2400x1600 after local optimization.
  { src: 'silver-temple-vishal-chokkala.webp', widths: [480, 800, 1280], quality: 76 },
  // Below-the-fold About/location gallery. Supplied source is 612px wide.
  { src: 'buddha-statue-in-chiang-mai-thailand.webp', widths: [320, 480, 600], quality: 78 },
  { src: 'chiang-mai-thailand.webp', widths: [320, 480, 600], quality: 78 },
  { src: 'the-silver-temple-in-chiang-mai.webp', widths: [320, 480, 600], quality: 78 },
  { src: 'wat-sri-suphan-in-chiang-mai-thailand.webp', widths: [320, 480, 600], quality: 78 },
  // Membership hero background. Pexels monk meditation, 1920x1280.
  { src: 'monk-meditation-chiang-mai.jpg', widths: [480, 800, 1280, 1600], quality: 76 },
  // Contact hero background. Pexels temple & lotus pond, 1920x1281.
  { src: 'temple-lotus-pond.jpg', widths: [480, 800, 1280, 1600], quality: 76 },
  // Homepage free-meditation band. Pexels lotus pond, 1920x1278.
  { src: 'lotus-pond-thailand.jpg', widths: [480, 800, 1280, 1600], quality: 76 },
  // Homepage method section side image. Pexels misty lotus meditation, 1600x2397.
  { src: 'serene-meditation-lotus.jpg', widths: [400, 640, 960], quality: 76 },
  // Testimonials band background. Pexels morning mist mountains, 1600x900.
  { src: 'morning-mist-mountains.jpg', widths: [480, 800, 1280, 1600], quality: 74 },
  // Method page hero side image. Pexels incense meditation, 1600x2844.
  { src: 'incense-meditation.jpg', widths: [400, 640, 960], quality: 76 },
  // Programs retreats header side image. Pexels misty mountains, 1600x2400.
  { src: 'misty-mountains.jpg', widths: [400, 640, 960], quality: 76 },
  // Booking page hero background. Pexels misty sunrise, 1920x1281.
  { src: 'misty-sunrise.jpg', widths: [480, 800, 1280, 1600], quality: 74 },
];

if (!existsSync(IMG_DIR)) {
  mkdirSync(IMG_DIR, { recursive: true });
}

for (const { src, widths, quality } of TARGETS) {
  const srcPath = join(IMG_DIR, src);
  const altPath = join(SRC_DIR, src);
  const resolvedPath = existsSync(srcPath) ? srcPath : existsSync(altPath) ? altPath : null;
  if (!resolvedPath) {
    console.warn(`skip (missing): ${src}`);
    continue;
  }
  const meta = await sharp(resolvedPath).metadata();
  const base = src.replace(/\.(webp|jpe?g)$/, '');
  for (const w of widths) {
    if (w >= meta.width) {
      // Don't upscale; skip wider targets than the source.
      continue;
    }
    const outPath = join(IMG_DIR, `${base}-${w}.webp`);
    await sharp(resolvedPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outPath);
    console.log(`  ${base}-${w}.webp`);

    const avifPath = join(IMG_DIR, `${base}-${w}.avif`);
    await sharp(resolvedPath)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality, effort: 6 })
      .toFile(avifPath);
    console.log(`  ${base}-${w}.avif`);
  }
}

console.log('done');
