'use strict';

const baseConfiguration = require('@shared-configs/ember-template-lint');

module.exports = {
  plugins: baseConfiguration.plugins,

  extends: baseConfiguration.extends,

  rules: baseConfiguration.rules,

  overrides: [
    ...baseConfiguration.overrides,
    {
      files: ['app/snippets/**'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
