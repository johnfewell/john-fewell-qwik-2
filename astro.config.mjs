import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import { SITE } from './src/config.mjs';

export default defineConfig({
  site: SITE.origin,
  trailingSlash: 'always',
  integrations: [react(), sitemap(), tailwind({ applyBaseStyles: false })],
});
