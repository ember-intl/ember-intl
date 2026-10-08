import { assert, test } from '@codemod-utils/tests';

import { defineConfig } from '../../../src/config.js';

test('src | config | define-config > it works', function () {
  const userConfig = defineConfig({
    buildOptions: {
      fallbackLocale: 'en-us',
    },
  });

  assert.deepStrictEqual(userConfig, {
    buildOptions: {
      fallbackLocale: 'en-us',
    },
  });
});
