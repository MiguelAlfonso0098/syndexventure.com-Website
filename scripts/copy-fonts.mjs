// Copies the self-hosted fonts from the @fontsource packages into public/fonts/.
// Run after upgrading either package: npm run fonts
import { copyFileSync, mkdirSync } from 'node:fs';

// Inter keeps the file name the SEO kit preloads (BaseHead.astro).
const files = [
  ['node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'InterVariable.woff2'],
  ['node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff2', 'jetbrains-mono-latin-500-normal.woff2'],
];
mkdirSync('public/fonts', { recursive: true });
for (const [from, to] of files) {
  copyFileSync(from, `public/fonts/${to}`);
  console.log('copied', from, '->', to);
}
copyFileSync('node_modules/@fontsource-variable/inter/LICENSE', 'public/fonts/LICENSE-Inter.txt');
copyFileSync('node_modules/@fontsource/jetbrains-mono/LICENSE', 'public/fonts/LICENSE-JetBrainsMono.txt');
