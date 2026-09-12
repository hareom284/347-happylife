import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { test } from 'node:test';
import { isValidLocalReference, isWithinRoot } from './validate-site.mjs';

test('rejects an existing route directory without an index file', async () => {
  const siteRoot = await mkdtemp(join(tmpdir(), 'validate-site-'));
  try {
    const page = join(siteRoot, 'pages', 'index.html');
    await mkdir(join(siteRoot, 'pages'), { recursive: true });
    await mkdir(join(siteRoot, 'empty-route'));
    assert.equal(await isValidLocalReference('/empty-route', page, siteRoot), false);
  } finally {
    await rm(siteRoot, { recursive: true, force: true });
  }
});

test('rejects relative references that escape the generated site root', async () => {
  const siteRoot = await mkdtemp(join(tmpdir(), 'validate-site-'));
  try {
    const page = join(siteRoot, 'pages', 'index.html');
    await mkdir(join(siteRoot, 'pages'), { recursive: true });
    await writeFile(join(siteRoot, 'outside.html'), 'outside');
    assert.equal(await isValidLocalReference('../../outside.html', page, siteRoot), false);
    assert.equal(isWithinRoot(join(siteRoot, '..', 'outside.html'), siteRoot), false);
  } finally {
    await rm(siteRoot, { recursive: true, force: true });
  }
});

test('accepts a real generated route index and local asset', async () => {
  const siteRoot = await mkdtemp(join(tmpdir(), 'validate-site-'));
  try {
    const page = join(siteRoot, 'pages', 'index.html');
    await mkdir(join(siteRoot, 'pages'), { recursive: true });
    await mkdir(join(siteRoot, 'valid-route'));
    await writeFile(join(siteRoot, 'valid-route', 'index.html'), 'route');
    await writeFile(join(siteRoot, 'asset.webp'), 'asset');
    assert.equal(await isValidLocalReference('/valid-route', page, siteRoot), true);
    assert.equal(await isValidLocalReference('../asset.webp', page, siteRoot), true);
  } finally {
    await rm(siteRoot, { recursive: true, force: true });
  }
});
