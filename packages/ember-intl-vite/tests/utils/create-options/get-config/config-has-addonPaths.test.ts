import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has addonPaths', function () {
  const userConfig = {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  };

  const config = getConfig(userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      publicOnly: false,
      wrapTranslationsWithNamespace: false,
    },
  });
});
