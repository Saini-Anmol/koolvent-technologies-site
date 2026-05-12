/**
 * Post-build guard: fails if any `TODO` placeholder text made it into the
 * generated HTML (i.e. is visible to visitors). Run automatically after
 * `npm run build` via the `postbuild` script.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const NEEDLE = /TODO/; // placeholders are always written as `TODO:`

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

const offenders = [];
for await (const file of htmlFiles(DIST)) {
  const text = await readFile(file, 'utf8');
  if (NEEDLE.test(text)) offenders.push(file.replace(DIST, 'dist/'));
}

if (offenders.length) {
  console.error('\n✗ Found TODO placeholder text in built pages:');
  for (const f of offenders) console.error('  - ' + f);
  console.error('\nReplace the real content or hide the section before shipping.\n');
  process.exit(1);
}
console.log('✓ No TODO placeholders in build output.');
