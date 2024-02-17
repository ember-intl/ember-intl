'use strict';

require('@shared-configs/eslint-config-node/patch');

module.exports = {
  extends: ['@shared-configs/eslint-config-node/typescript'],
  overrides: [
    // Test files
    {
      files: ['{tests,unit}/**/*.{cjs,cts,js,ts}'],
      env: {
        mocha: true,
      },
    },
  ],
};
