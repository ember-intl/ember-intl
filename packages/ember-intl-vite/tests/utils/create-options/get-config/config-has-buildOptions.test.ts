import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has buildOptions', function () {
  const userConfig = {
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'public/assets/translations',
      publicOnly: true,
      wrapTranslationsWithNamespace: true,
    },
  };

  const config = getConfig(userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'public/assets/translations',
      publicOnly: true,
      wrapTranslationsWithNamespace: true,
    },
  });
});
