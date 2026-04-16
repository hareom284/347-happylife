/**
 * Generate responsive WebP variants for the large images in public/images/.
 *
 * Run with:  node scripts/optimize-images.mjs
 *
 * Output files are written alongside the source in public/images/ as:
 *   <name>-<width>.webp    (e.g. silver-temple-front-800.webp)
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

// Source -> target widths to generate. We pick widths that cover common
// display sizes on mobile (~400), tablet (~800) and desktop (~1200-1600).
const TARGETS = [
  // Hero background + About/PhotoGallery/FinalCTA usage. Source is 1024x741.
  { src: 'silver-temple-front.webp', widths: [480, 800, 1280], quality: 72 },
  // PhotoGallery only. Source is 1742x940 — way bigger than displayed.
  { src: 'retreat-2.webp',           widths: [480, 800, 1280], quality: 72 },
  // PhotoGallery only. Source is 1080x1434 — portrait card.
  { src: 'retreat-3.webp',           widths: [400, 800, 1080], quality: 72 },
  // PhotoGallery only. Source is 1024x1024 — square.
  { src: 'hero-main.webp',           widths: [400, 800],       quality: 74 },
];

if (!existsSync(IMG_DIR)) {
  mkdirSync(IMG_DIR, { recursive: true });
}

for (const { src, widths, quality } of TARGETS) {
  const srcPath = join(IMG_DIR, src);
  if (!existsSync(srcPath)) {
    console.warn(`skip (missing): ${src}`);
    continue;
  }
  const meta = await sharp(srcPath).metadata();
  const base = src.replace(/\.webp$/, '');
  for (const w of widths) {
    if (w >= meta.width) {
      // Don't upscale; skip wider targets than the source.
      continue;
    }
    const outPath = join(IMG_DIR, `${base}-${w}.webp`);
    await sharp(srcPath)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outPath);
    console.log(`  ${base}-${w}.webp`);
  }
}

console.log('done');
