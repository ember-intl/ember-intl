import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > edge case (config is empty)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([`export default {};`, ``]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/edge-case-config-is-empty';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {});
});
