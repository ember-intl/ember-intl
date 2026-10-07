import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findUserConfig } from '../../../src/config.js';

test('src | config | find-user-config > config exists (mts)', function () {
  const inputProject = {
    'ember-intl.config.mts': '',
  };

  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  assert.strictEqual(findUserConfig(projectRoot), 'ember-intl.config.mts');
});
