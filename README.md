# syndexventure.com

Public company profile of Syndex Ventures LLC. Astro 5, static output, deployed to Cloudflare Pages with Pages Functions for forms.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies (Node 22) |
| `npm run dev` | Local dev server |
| `npm run build` | Build to `dist/` and list facts still pending |
| `npm run build:strict` | Same, but fails while any fact is pending. Use as the production build command once content is complete |
| `npm run check` | Type-check Astro files |
| `npm run icons` | Regenerate favicons, app icons and `og-image.png` from the mark |
| `npm run fonts` | Re-copy self-hosted fonts from `@fontsource` |

## Pending facts

Company facts that have not been supplied are written as `pending('<ID>', '<label>')`, using the item IDs from the LLC information inventory in the spec (C1–C15, P1–P12, V1–V7, R1–R12, B rows, D1–D13). They render as a dashed amber marker such as `[C2: State of formation]`, and the build prints every ID still pending. Metadata and JSON-LD never carry a marker: pending fields are left out.

Where to fill them in:

- `src/config/site.ts`: company facts (C), mailboxes (V6), last reviewed date
- `src/data/registry.ts`: one row per brand (feeds Registry, `/registry.csv`, Identify a Charge and Verify)
- `src/data/contacts.ts`: official domains, emails and phones for Verify (V1–V3)
- `src/data/policies.ts`: policy effective dates, versions, PDFs (P3–P12)
- `src/data/documents.ts`: diligence documents (D1–D13)
- `src/data/lines.ts`, `src/data/programs.ts`: operating line and partner program details
- `src/content/insights/`: briefs (see `_template.md.txt`)

## Structure

- `src/components/BaseHead.astro`: all metadata (SEO, Open Graph, X, icons, PWA, JSON-LD)
- `src/styles/tokens.css`: design tokens from the spec. No colours outside this file
- `src/layouts/BaseLayout.astro`: header, breadcrumbs, next-step block, footer
- `functions/api/`: `diligence`, `inquiry`, `report` endpoints with Turnstile verification
- `public/`: robots.txt, ads.txt, app-ads.txt, manifest, security.txt, `_headers` (HSTS, CSP), `_redirects`, icons, fonts

## Client JavaScript

Zero by default. Small scripts run only where a feature needs them: Registry filter and drawer, Identify a Charge, Verify, form pre-selection and thank-you reference IDs, and the Turnstile widget on form pages. No inline scripts or styles, so the CSP stays strict.

## Cloudflare Pages

- Build command `npm run build`, output `dist`, Node 22
- Variables: `PUBLIC_TURNSTILE_SITE_KEY` (build), `TURNSTILE_SECRET_KEY` (secret, Functions)
- Mail delivery for forms is not wired: `functions/_lib/deliver.ts` returns a clear 503 with the mailbox to email until a provider is chosen
