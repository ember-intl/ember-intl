'use strict';

module.exports = {
  overrides: [
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
    {
      files: '*.{cjs,cts,gjs,gts,js,mjs,mts,ts}',
      options: {
        printWidth: 80,
        singleQuote: true,
      },
    },
  ],
};
