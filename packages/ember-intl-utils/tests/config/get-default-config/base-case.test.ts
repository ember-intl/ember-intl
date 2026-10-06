import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig } from '../../../src/config.js';

test('src | config | get-default-config > base case', function () {
  assert.deepStrictEqual(getDefaultConfig(), {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
