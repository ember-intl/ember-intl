import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > base case', async function () {
  const inputProject = {};

  const projectRoot = 'tmp/utils/config/get-user-config/base-case';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.strictEqual(userConfig, undefined);
});
