import type { UserConfig } from 'ember-intl/config';

export default {
  lintRules: {
    'no-unused-keys': {
      ignores: ['routes.index.key-to-overwrite'],
    },
  },
} satisfies UserConfig;
