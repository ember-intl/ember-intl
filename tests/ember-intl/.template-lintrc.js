'use strict';

const baseConfiguration = require('@shared-configs/ember-template-lint');

module.exports = {
  plugins: baseConfiguration.plugins,

  extends: baseConfiguration.extends,

  rules: baseConfiguration.rules,

  overrides: [
    ...baseConfiguration.overrides,
    {
      files: ['tests/**/*-test.{js,ts}'],
      rules: {
        'no-curly-component-invocation': {
          allow: [
            'format-date',
            'format-message',
            'format-number',
            'format-relative',
            'format-time',
            't',
          ],
        },
      },
    },
  ],
};
