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
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
