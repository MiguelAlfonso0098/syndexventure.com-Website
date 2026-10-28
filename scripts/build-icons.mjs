// Generates favicons, app icons and the Open Graph image from the SVG mark.
// Run after changing the mark: npm run icons. Outputs are committed in public/.
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

const SLATE = '#0F172A', SKY = '#0284C7', SKY_LIGHT = '#38BDF8', EMERALD = '#10B981', EMERALD_LIGHT = '#34D399', WHITE = '#FFFFFF', LIGHT = '#F1F5F9';

/** The mark from the SEO kit (64x64): three bars with an emerald status dot. pad = inset ratio for maskable icons. */
const mark = ({ tile, bar, dot, rx = 14, pad = 0 }) => {
  const k = 1 - pad * 2, o = 64 * pad;
  const g = (x, y, w) => `<rect x="${o + x * k}" y="${o + y * k}" width="${w * k}" height="${6 * k}" rx="${3 * k}" fill="${bar}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rx}" fill="${tile}"/>${g(16, 17, 32)}${g(16, 29, 20)}<circle cx="${o + 44 * k}" cy="${o + 32 * k}" r="${4 * k}" fill="${dot}"/>${g(16, 41, 32)}</svg>`;
};

const light = { tile: SLATE, bar: SKY_LIGHT, dot: EMERALD };   // dark tile, for light browser UI
const dark = { tile: LIGHT, bar: SKY, dot: EMERALD };          // light tile, for dark browser UI

// SVG favicons are copied verbatim from the SEO kit.
const adaptive = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <style>.t{fill:#0F172A}.b{fill:#38BDF8}.d{fill:#10B981}
  @media (prefers-color-scheme: dark){.t{fill:#F1F5F9}.b{fill:#0284C7}}</style>
  <rect class="t" width="64" height="64" rx="14"/>
  <rect class="b" x="16" y="17" width="32" height="6" rx="3"/>
  <rect class="b" x="16" y="29" width="20" height="6" rx="3"/>
  <circle class="d" cx="44" cy="32" r="4"/>
  <rect class="b" x="16" y="41" width="32" height="6" rx="3"/>
</svg>
`;
const maskIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M19 17h26a3 3 0 010 6H19a3 3 0 010-6zm0 12h14a3 3 0 010 6H19a3 3 0 010-6zm25-1a4 4 0 110 8 4 4 0 010-8zM19 41h26a3 3 0 010 6H19a3 3 0 010-6z"/></svg>
`;

mkdirSync('public/icons', { recursive: true });
writeFileSync('public/favicon.svg', adaptive);
writeFileSync('public/favicon-light.svg', mark(light));
writeFileSync('public/favicon-dark.svg', mark(dark));
writeFileSync('public/icons/mask-icon.svg', maskIcon);

const png = (svg, size, file, opts = {}) =>
  sharp(Buffer.from(svg), { density: Math.max(72, (size / 64) * 72) }).resize(size, size).flatten(opts.flatten ? { background: opts.flatten } : false).png().toFile(file);

await png(mark(light), 16, 'public/icons/favicon-16-light.png');
await png(mark(light), 32, 'public/icons/favicon-32-light.png');
await png(mark(dark), 16, 'public/icons/favicon-16-dark.png');
await png(mark(dark), 32, 'public/icons/favicon-32-dark.png');
await png(mark(light), 48, 'public/icons/favicon-48-light.png');
await png(mark(dark), 48, 'public/icons/favicon-48-dark.png');
await png(mark({ ...light, rx: 0 }), 180, 'public/apple-touch-icon.png', { flatten: SLATE });
await png(mark(light), 192, 'public/icons/icon-192.png');
await png(mark(light), 512, 'public/icons/icon-512.png');
await png(mark({ ...light, rx: 0, pad: 0.12 }), 192, 'public/icons/maskable-192.png');
await png(mark({ ...light, rx: 0, pad: 0.12 }), 512, 'public/icons/maskable-512.png');
await png(mark({ ...light, rx: 0, pad: 0.2 }), 150, 'public/icons/mstile-150.png', { flatten: SLATE });

// favicon.ico: PNG-compressed entries at 16, 32 and 48 px.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => sharp(Buffer.from(mark(light)), { density: 108 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((img, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(sizes[i], e); header.writeUInt8(sizes[i], e + 1);
  header.writeUInt16LE(1, e + 4); header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(img.length, e + 8); header.writeUInt32LE(offset, e + 12);
  offset += img.length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...images]));

// Open Graph image, 1200x630.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="${WHITE}" fill-opacity="0.06"/></pattern></defs>
  <rect width="1200" height="630" fill="${SLATE}"/><rect width="1200" height="630" fill="url(#dots)"/>
  <g transform="translate(80 80) scale(1.5)">${mark(light).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>
  <text x="80" y="300" font-family="Inter, DejaVu Sans, sans-serif" font-size="30" font-weight="500" fill="${SKY_LIGHT}" letter-spacing="3">SYNDEX VENTURES</text>
  <text font-family="Inter, DejaVu Sans, sans-serif" font-size="64" font-weight="700" fill="${WHITE}" letter-spacing="-1"><tspan x="80" y="390">Architecting the Infrastructure</tspan><tspan x="80" y="466">of Digital Commerce.</tspan></text>
  <rect x="80" y="530" width="1040" height="1" fill="${WHITE}" fill-opacity="0.15"/>
  <circle cx="88" cy="568" r="6" fill="${EMERALD_LIGHT}"/>
  <text x="106" y="575" font-family="DejaVu Sans Mono, monospace" font-size="20" fill="${LIGHT}" fill-opacity="0.8">syndexventure.com</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og-image.png');
console.log('icons and og-image written');
