import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has unknown lint rules', function () {
  const userConfig = {
    lintRules: {
      'unknown-rule-1': {
        ignores: ['hello.message'],
      },
      'unknown-rule-2': false,
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
