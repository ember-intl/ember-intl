import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config is missing', async function () {
  const inputProject = {};

  const projectRoot = 'tmp/utils/get-config/config-is-missing';

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
