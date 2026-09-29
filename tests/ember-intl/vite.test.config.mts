import { defineConfig } from 'vite';

import baseConfiguration from './vite.config.mts';

export default defineConfig({
  ...baseConfiguration,
  build: {
    minify: false,
    sourcemap: true,
  },
});
