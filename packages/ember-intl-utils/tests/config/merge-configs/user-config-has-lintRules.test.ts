import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';

test('src | config | merge-configs > user config has lintRules', function () {
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
      namespaceKeysByDir: false,
      translationsDir: 'translations',
    },
    lintOptions: {
      dependencies: {
        t: [
          { importName: 't', importPath: 'ember-intl' },
          { importName: 'default', importPath: 'ember-intl/helpers/t' },
        ],
        tKey: [
          { importName: 'tKey', importPath: 'ember-intl' },
          { importName: 'default', importPath: 'ember-intl/helpers/t-key' },
        ],
      },
      rules: {
        'no-inconsistent-messages': true,
        'no-missing-keys': {
          ignores: ['hello.message'],
        },
        'no-unused-keys': false,
      },
    },
  });
});
