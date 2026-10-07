import type { UserConfig } from 'ember-intl';

export default {
  lintRules: {
    'no-unused-keys': {
      ignores: ['routes.index.key-to-overwrite'],
    },
  },
} satisfies UserConfig;
