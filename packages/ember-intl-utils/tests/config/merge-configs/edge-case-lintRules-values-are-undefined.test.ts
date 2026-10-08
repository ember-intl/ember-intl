import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';

test('src | config | merge-configs > edge case (lintRules values are undefined)', function () {
  const userConfig = {
    lintRules: {
      'no-missing-keys': undefined,
      'no-unused-keys': undefined,
    },
  };

  // @ts-expect-error: Incorrect type
  const config = mergeConfigs(getDefaultConfig(), userConfig);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': undefined,
      'no-unused-keys': undefined,
    },
  });
});
