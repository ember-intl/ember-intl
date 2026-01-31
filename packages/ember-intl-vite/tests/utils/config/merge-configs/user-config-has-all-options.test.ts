import { assert, test } from '@codemod-utils/tests';

import {
  getDefaultConfig,
  mergeConfigs,
} from '../../../../src/utils/config/index.js';

test('utils | config | merge-configs > user config has all options', function () {
  const userConfig = {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: true,
    },
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  };

  const config = mergeConfigs(getDefaultConfig(), userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: true,
    },
  });
});
