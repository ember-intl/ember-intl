import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | find-user-config > file extension is not valid', function () {
  const inputProject = {
    'ember-intl.config.ts': '',
  };

  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  assert.strictEqual(findUserConfig(projectRoot), undefined);
});
