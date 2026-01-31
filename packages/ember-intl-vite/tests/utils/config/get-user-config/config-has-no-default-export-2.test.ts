import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has no default export (2)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export const config = {`,
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

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-no-default-export-2';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.strictEqual(userConfig, undefined);
});
