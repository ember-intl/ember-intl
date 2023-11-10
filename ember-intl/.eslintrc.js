'use strict';

require('@shared-configs/eslint-config-ember/patch');

module.exports = {
  extends: ['@shared-configs/eslint-config-ember/addon'],
  rules: {
    'ember/no-get': 'off', // TODO: Remove support for old Ember
  },
  overrides: [
    // Node files
    {
      files: ['./lib/**/*.js'],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
