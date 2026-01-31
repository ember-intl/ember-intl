import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-default-config > base case', function () {
  assert.deepStrictEqual(getDefaultConfig(), {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
  });
});
