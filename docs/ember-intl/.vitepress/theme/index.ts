import './custom-styles.css';

import VitepressTheme from 'vitepress/theme';
import { setupEmber } from 'vite-plugin-ember/setup';
import type { Theme } from 'vitepress';

export default {
  enhanceApp({ app }) {
    setupEmber(app);
  },
  extends: VitepressTheme,
} satisfies Theme;
