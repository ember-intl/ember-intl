import { defineConfig } from 'vitepress';

import { sidebar } from './sidebar.mts';

export default defineConfig({
  description: 'Internationalization for Ember projects',
  srcDir: 'src',
  themeConfig: {
    sidebar,
  },
  title: 'ember-intl',
  vite: {
    plugins: [],
  },
});
