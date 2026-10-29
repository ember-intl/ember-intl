import { defineConfig } from 'ember-intl/config';

export default defineConfig({
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  buildOptions: {
    translationsDir: 'public/assets/translations',
  },
  lintOptions: {
    rules: {
      'no-missing-keys': {
        ignores: ['routes.index.key-without-translation'],
      },
    },
  },
});
