import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | find-user-config > base case', function () {
  const inputProject = {};

  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  assert.strictEqual(findUserConfig(projectRoot), undefined);
});
