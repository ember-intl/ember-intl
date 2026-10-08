import { defineConfig } from 'ember-intl';

export default defineConfig({
  addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  lintRules: {
    'no-missing-keys': {
      ignores: ['routes.index.key-without-translation'],
    },
  },
});
