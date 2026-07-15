import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > supports v1 config', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  addonPaths: [`,
      `    'node_modules/my-v1-addon',`,
      `    'node_modules/my-v2-addon',`,
      `  ],`,
      `  buildOptions: {`,
      `    fallbackLocale: 'en-us',`,
      `    inputPath: 'public/assets/translations',`,
      `    wrapTranslationsWithNamespace: true,`,
      `  },`,
      `  lintRules: {`,
      `    'no-missing-keys': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'no-unused-keys': false,`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot = 'tmp/utils/config/get-user-config/supports-v1-config';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    buildOptions: {
      fallbackLocale: 'en-us',
      translationsDir: 'public/assets/translations',
      namespaceKeysByDir: true,
    },
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
