import type { UserConfig } from 'ember-intl';

export default {
  lintRules: {
    'no-missing-keys': {
      ignores: ['components.title', 'routes.index.key-without-translation'],
    },
  },
} satisfies UserConfig;
