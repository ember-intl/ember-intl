'use strict';

require('@shared-configs/eslint-config-ember/patch');

module.exports = {
  extends: ['@shared-configs/eslint-config-ember/v1-addon'],
  overrides: [
    // TypeScript files
    {
      files: ['**/*.{gts,ts}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
    // Node files
    {
      files: ['lib/**/*.js'],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
