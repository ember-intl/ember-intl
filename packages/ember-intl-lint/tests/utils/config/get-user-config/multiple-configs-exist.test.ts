import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > multiple configs exist', async function () {
  const inputProject = {
    'ember-intl.config.js': normalizeFile([`export default {};`, ``]),
    'ember-intl.config.mjs': normalizeFile([`export default {};`, ``]),
  };

  const projectRoot = 'tmp/utils/config/get-user-config/multiple-configs-exist';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (Found multiple config files)`,
      );

      return true;
    },
  );
});
