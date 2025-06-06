'use strict';

const baseConfiguration = require('@shared-configs/ember-template-lint');

module.exports = {
  ...baseConfiguration,
  overrides: [
    {
      files: ['app/snippets/**'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
