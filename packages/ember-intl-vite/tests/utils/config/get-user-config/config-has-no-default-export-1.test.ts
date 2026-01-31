import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has no default export (1)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': '',
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-no-default-export-1';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.strictEqual(userConfig, undefined);
});
