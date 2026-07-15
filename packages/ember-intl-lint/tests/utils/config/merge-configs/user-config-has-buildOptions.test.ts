import { assert, test } from '@codemod-utils/tests';

import {
  getDefaultConfig,
  mergeConfigs,
} from '../../../../src/utils/config/index.js';

test('utils | config | merge-configs > user config has buildOptions', function () {
  const userConfig = {
    buildOptions: {
      fallbackLocale: 'en-us',
      namespaceKeysByDir: true,
      translationsDir: 'public/assets/translations',
    },
  };

  const config = mergeConfigs(getDefaultConfig(), userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: 'en-us',
      namespaceKeysByDir: true,
      translationsDir: 'public/assets/translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
