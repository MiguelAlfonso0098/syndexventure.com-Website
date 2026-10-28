// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Thank-you pages are noindex and stay out of the sitemap.
const EXCLUDED = ['/thanks/', '/404'];

export default defineConfig({
  site: 'https://syndexventure.com',
  output: 'static',
  trailingSlash: 'always',
  // No inline scripts or styles, so the CSP in public/_headers can stay strict.
  build: { format: 'directory', inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  prefetch: false,
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED.some((p) => page.includes(p)),
      changefreq: 'monthly',
      priority: 0.7,
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-MX' } },
    }),
  ],
});
