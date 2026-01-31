import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | find-user-config > config exists (js)', function () {
  const inputProject = {
    'ember-intl.config.js': '',
  };

  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  assert.strictEqual(findUserConfig(projectRoot), 'ember-intl.config.js');
});
