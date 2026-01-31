import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has buildOptions', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  buildOptions: {`,
      `    fallbackLocale: 'en-us',`,
      `    inputPath: 'public/assets/translations',`,
      `    wrapTranslationsWithNamespace: true,`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-buildOptions-inputPath';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    buildOptions: {
      fallbackLocale: 'en-us',
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: true,
    },
  });
});
