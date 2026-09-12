import { readFile } from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const source = async (path) => readFile(new URL(path, root), 'utf8');

test('reveal content has a no-JavaScript-visible fallback', async () => {
  const css = await source('src/styles/global.css');
  const layout = await source('src/layouts/Layout.astro');

  assert.match(css, /html\.js\s+\.reveal\s*\{/);
  assert.match(layout, /classList\.add\(['"]js['"]\)/);
  assert.match(layout, /IntersectionObserver.*available|IntersectionObserver.*in window/s);
});

test('course offers expose both authoritative currencies as valid offers', async () => {
  const layout = await source('src/layouts/Layout.astro');

  assert.match(layout, /priceCurrency: 'THB'/);
  assert.match(layout, /priceCurrency: 'USD'/);
  assert.match(layout, /price\.thb/);
  assert.match(layout, /price\.usd/);
});

test('privacy policy names every active third-party service and contact flow', async () => {
  const privacy = await source('src/pages/privacy.astro');

  for (const service of ['Google Analytics', 'Google Fonts', 'Google Forms', 'Google Maps', 'TikTok', 'mailto']) {
    assert.match(privacy, new RegExp(service.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
  }
});

test('Astro is pinned to the audited-compatible release line', async () => {
  const packageJson = JSON.parse(await source('package.json'));

  assert.equal(packageJson.dependencies.astro, '^7.3.2');
});
