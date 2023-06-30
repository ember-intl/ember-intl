'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  overrides: [
    {
      files: ['**/*.{gjs,gts}'],
      rules: {
        'no-implicit-this': 'off',
      },
    },
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
        prettier: 'off',
      },
    },
    {
      files: ['tests/dummy/app/snippets/**'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
