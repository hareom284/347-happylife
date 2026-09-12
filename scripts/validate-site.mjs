import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const requiredPrices = [
  'THB 1,500 / USD 47',
  'THB 2,500 / USD 77',
  'THB 3,500 / USD 111',
  'THB 7,000 / USD 219',
  'THB 800 / USD 27',
  'THB 2,500 / USD 77',
  'THB 7,000 / USD 219',
  'THB 7,000 / USD 219',
  'THB 12,000 / USD 347',
  'THB 15,000 / USD 477',
];

const errors = [];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && extname(entry.name) === '.html') files.push(path);
  }
  return files;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function localPath(value) {
  try {
    const url = new URL(value, 'https://validation.invalid');
    if (url.origin !== 'https://validation.invalid') return null;
    return decodeURIComponent(url.pathname);
  } catch {
    return null;
  }
}

function generatedCandidates(pathname) {
  const path = pathname.replace(/^\/+/, '');
  if (!path) return [join(dist, 'index.html')];
  return [join(dist, path, 'index.html'), join(dist, `${path}.html`), join(dist, path)];
}

async function checkLocalReference(value, page) {
  if (!value || value.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(value)) return;
  const pathname = localPath(value);
  if (pathname === null) return;
  const candidates = pathname.startsWith('/')
    ? generatedCandidates(pathname)
    : [resolve(dirname(page), pathname)];
  const found = (await Promise.all(candidates.map((candidate) => exists(candidate)))).some(Boolean);
  if (!found) {
    errors.push(`${relative(dist, page)} references missing local path: ${value}`);
  }
}

if (!await exists(dist)) {
  errors.push('dist/ does not exist; run the production build first');
} else {
  const pages = await htmlFiles(dist);
  if (pages.length === 0) errors.push('dist/ contains no generated HTML pages');

  for (const page of pages) {
    const html = await readFile(page, 'utf8');
    const label = relative(dist, page);
    const h1Count = (html.match(/<h1\b[^>]*>/gi) ?? []).length;
    if (h1Count !== 1) errors.push(`${label} has ${h1Count} h1 elements; expected exactly one`);

    const canonicals = [...html.matchAll(/<link\b[^>]*\brel=["']canonical["'][^>]*>/gi)];
    if (canonicals.length !== 1) errors.push(`${label} has ${canonicals.length} canonical links; expected exactly one`);
    else {
      const canonical = canonicals[0][0].match(/\bhref=["']([^"']+)["']/i)?.[1];
      if (!canonical || !/^https?:\/\//i.test(canonical)) errors.push(`${label} has an invalid canonical URL`);
    }

    if (/\bhref=["']#["']/i.test(html)) errors.push(`${label} contains placeholder href="#"`);
    const references = [...html.matchAll(/\b(?:href|src|poster)=["']([^"']+)["']/gi)].map((match) => match[1]);
    for (const srcset of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
      references.push(...srcset[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
    }
    for (const reference of references) await checkLocalReference(reference, page);
  }

  const allHtml = await Promise.all(pages.map((page) => readFile(page, 'utf8')));
  const generatedSite = allHtml.join('\n');
  for (const price of requiredPrices) {
    if (!generatedSite.includes(price)) errors.push(`missing required DOCX pricing string: ${price}`);
  }
}

if (errors.length) {
  console.error(`Site validation failed with ${errors.length} issue${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Site validation passed: local references, routes, h1 counts, canonical metadata, placeholder links, and DOCX pricing.');
}
