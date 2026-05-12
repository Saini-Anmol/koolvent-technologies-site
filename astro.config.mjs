// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Production domain. Update here if the domain ever changes.
const SITE_URL = 'https://koolvent.in';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // All internal links use a trailing slash; keep canonical URLs, the
  // sitemap and Vercel routing consistent with that.
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      // Keep utility pages (e.g. the post-submit thank-you page) out of the sitemap.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
