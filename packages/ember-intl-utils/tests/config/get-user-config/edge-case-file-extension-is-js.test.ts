import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > edge case (file extension is js)', async function () {
  const inputProject = {
    'ember-intl.config.js': normalizeFile([`export default {};`, ``]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/edge-case-file-extension-is-js';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {});
});
