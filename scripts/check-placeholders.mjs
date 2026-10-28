// Lists every pending-fact marker left in the build (see src/lib/pending.ts),
// grouped by LLC inventory ID. With --strict, exits 1 while any remain,
// so it can gate production deploys.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const strict = process.argv.includes('--strict');
const found = new Map();

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) {
      const page = '/' + p.slice('dist/'.length).replace(/index\.html$/, '');
      for (const m of readFileSync(p, 'utf8').matchAll(/data-pending="([^"]+)"/g)) {
        if (!found.has(m[1])) found.set(m[1], new Set());
        found.get(m[1]).add(page);
      }
    }
  }
};
walk('dist');

if (found.size === 0) {
  console.log('Placeholders: none. All facts supplied.');
} else {
  const ids = [...found.keys()].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  console.log(`\nPlaceholders: ${ids.length} inventory items still pending\n`);
  for (const id of ids) console.log(`  ${id.padEnd(8)} ${found.get(id).size} page(s)  e.g. ${[...found.get(id)][0]}`);
  console.log('');
  if (strict) {
    console.error('Strict mode: pending facts remain. Not ready for production.');
    process.exit(1);
  }
}
