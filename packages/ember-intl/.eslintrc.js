'use strict';

require('@shared-configs/eslint-config-ember/patch');

module.exports = {
  extends: ['@shared-configs/eslint-config-ember/v2-addon'],
  overrides: [
    // Ember files
    {
      files: ['**/*.{gts,ts}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
