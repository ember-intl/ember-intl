import { assert, test } from '@codemod-utils/tests';

import {
  getDefaultConfig,
  mergeConfigs,
} from '../../../../src/utils/config/index.js';

test('utils | config | merge-configs > user config has lintRules', function () {
  const userConfig = {
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  };

  const config = mergeConfigs(getDefaultConfig(), userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
  });
});
