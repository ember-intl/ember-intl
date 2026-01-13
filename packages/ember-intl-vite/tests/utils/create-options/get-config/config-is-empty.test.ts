import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config is empty', function () {
  const userConfig = {};

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
