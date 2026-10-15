import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has no default export (1)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': '',
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-no-default-export-1';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to get ember-intl config (missing default export)`,
      );

      return true;
    },
  );
});
