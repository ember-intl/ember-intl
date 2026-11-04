import { assert, test } from '@codemod-utils/tests';

import { getDefaultConfig, mergeConfigs } from '../../../src/config.js';

test('src | config | merge-configs > user config has lintOptions', function () {
  const userConfig = {
    lintOptions: {
      dependencies: {
        t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
      },
      rules: {
        'no-missing-keys': {
          ignores: ['hello.message'],
        },
        'no-unused-keys': false,
      },
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
        t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
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
