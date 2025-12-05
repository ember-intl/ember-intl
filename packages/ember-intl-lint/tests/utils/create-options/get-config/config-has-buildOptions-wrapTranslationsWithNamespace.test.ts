import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has buildOptions (wrapTranslationsWithNamespace)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  buildOptions: {`,
      `    wrapTranslationsWithNamespace: true,`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/get-config/config-has-buildOptions-wrapTranslationsWithNamespace';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      inputPath: 'translations',
      wrapTranslationsWithNamespace: true,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
