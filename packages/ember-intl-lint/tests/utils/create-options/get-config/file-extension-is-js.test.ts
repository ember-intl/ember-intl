import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > file extension is js', async function () {
  const inputProject = {
    'ember-intl-lint.config.js': [`export default {};`, ``].join('\n'),
  };

  const projectRoot = 'tmp/utils/get-config/file-extension-is-js';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    rules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': true,
      'no-unused-keys': true,
    },
  });
});
