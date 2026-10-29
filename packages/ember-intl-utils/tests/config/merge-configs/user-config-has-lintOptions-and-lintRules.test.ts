import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';

test('src | config | merge-configs > user config has lintOptions and lintRules', function () {
  const userConfig = {
    lintOptions: {
      rules: {
        'no-inconsistent-messages': false,
        'no-unused-keys': {
          ignores: ['hello.message'],
        },
      },
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
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintOptions: {
      rules: {
        'no-inconsistent-messages': false,
        'no-missing-keys': true,
        'no-unused-keys': {
          ignores: ['hello.message'],
        },
      },
    },
  });
});
