import './custom-styles.css';

import VitepressTheme from 'vitepress/theme';
import { setupEmber } from 'vite-plugin-ember/setup';
import type { Theme } from 'vitepress';

import { setupIntl } from './setup-intl.ts';

export default {
  enhanceApp({ app }) {
    const intl = setupIntl();

    setupEmber(app, {
      services: {
        intl,
      },
    });
  },
  extends: VitepressTheme,
} satisfies Theme;
