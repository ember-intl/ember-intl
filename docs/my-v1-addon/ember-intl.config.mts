import type { UserConfig } from 'ember-intl/config';

export default {
  lintOptions: {
    rules: {
      'no-unused-keys': {
        ignores: ['routes.index.key-to-overwrite'],
      },
    },
  },
} satisfies UserConfig;
