import { defineConfig } from 'ember-intl/config';

export default defineConfig({
  lintOptions: {
    rules: {
      'no-missing-keys': {
        ignores: ['components.title', 'routes.index.key-without-translation'],
      },
    },
  },
});
