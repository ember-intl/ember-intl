import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has lintRules', function () {
  const userConfig = {
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  };

  // @ts-expect-error: Incorrect type
  const config = getConfig(userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      publicOnly: false,
      wrapTranslationsWithNamespace: false,
    },
  });
});
