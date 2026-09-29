import './custom-styles.css';

import VitepressTheme from 'vitepress/theme';
import { setupEmber } from 'vite-plugin-ember/setup';
import type { Theme } from 'vitepress';

import { setupIntl } from './setup-intl.ts';

const redirects: Record<string, string> = {
  '/ember-intl/docs/test-helpers/add-translations':
    '/ember-intl/docs/testing/add-translations',
  '/ember-intl/docs/test-helpers/introduction':
    '/ember-intl/docs/testing/introduction',
  '/ember-intl/docs/test-helpers/set-locale':
    '/ember-intl/docs/testing/set-locale',
  '/ember-intl/docs/test-helpers/setup-intl':
    '/ember-intl/docs/testing/setup-intl',
};

export default {
  enhanceApp({ app, router }) {
    const intl = setupIntl();

    setupEmber(app, {
      services: {
        intl,
      },
    });

    router.onBeforeRouteChange = (to: string) => {
      const [path, hash] = to.split('#') as [string, string | undefined];
      const pathNew = redirects[path];

      if (!pathNew) {
        return true;
      }

      const toNew = hash ? `${pathNew}#${hash}` : pathNew;
      router.go(toNew);

      return false;
    };
  },
  extends: VitepressTheme,
} satisfies Theme;
