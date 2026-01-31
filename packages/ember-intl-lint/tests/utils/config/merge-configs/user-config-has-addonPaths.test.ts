import { assert, test } from '@codemod-utils/tests';

import {
  getDefaultConfig,
  mergeConfigs,
} from '../../../../src/utils/config/index.js';

test('utils | config | merge-configs > user config has addonPaths', function () {
  const userConfig = {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
  };

  const config = mergeConfigs(getDefaultConfig(), userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
