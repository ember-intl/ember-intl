import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | find-user-config > multiple configs exist', function () {
  const inputProject = {
    'ember-intl.config.js': '',
    'ember-intl.config.mjs': '',
  };

  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  assert.throws(
    () => {
      findUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(error.message, 'Found multiple config files');

      return true;
    },
  );
});
