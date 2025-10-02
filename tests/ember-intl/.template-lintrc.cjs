'use strict';

const baseConfiguration = require('@shared-configs/ember-template-lint');

module.exports = {
  ...baseConfiguration,
  overrides: [
    {
      files: ['tests/**/*-test.{js,ts}'],
      rules: {
        'no-curly-component-invocation': {
          allow: [
            'format-date',
            'format-date-range',
            'format-list',
            'format-message',
            'format-number',
            'format-relative-time',
            'format-time',
            't',
          ],
        },
      },
    },
  ],
};
