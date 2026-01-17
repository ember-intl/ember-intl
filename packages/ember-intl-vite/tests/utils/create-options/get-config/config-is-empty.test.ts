import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config is empty', async function () {
  const inputProject = {
    'ember-intl.config.mjs': '',
  };

  const projectRoot = 'tmp/utils/get-config/config-is-empty';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
  });
});
