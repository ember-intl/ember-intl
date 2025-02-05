'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  overrides: [
    {
      files: '*.{cjs,cts,js,mjs,mts,ts}',
      options: {
        printWidth: 80,
        singleQuote: true,
      },
    },
    {
      files: '*.{gjs,gts}',
      options: {
        printWidth: 80,
        singleQuote: true,
        templateSingleQuote: false,
      },
    },
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
  ],
};
