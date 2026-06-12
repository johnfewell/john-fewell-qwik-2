import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import { SITE } from './src/config.mjs';

export default defineConfig({
  site: SITE.origin,
  integrations: [react(), tailwind({ applyBaseStyles: false })],
});
