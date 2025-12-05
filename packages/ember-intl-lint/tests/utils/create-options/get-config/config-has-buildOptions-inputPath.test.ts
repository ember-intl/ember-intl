import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has buildOptions (inputPath)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  buildOptions: {`,
      `    inputPath: 'public/assets/translations',`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot = 'tmp/utils/get-config/config-has-buildOptions-inputPath';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      inputPath: 'public/assets/translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
