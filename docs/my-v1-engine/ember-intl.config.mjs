import { defineConfig } from 'ember-intl';

export default defineConfig({
  lintRules: {
    'no-missing-keys': {
      ignores: ['components.title', 'routes.index.key-without-translation'],
    },
  },
});
