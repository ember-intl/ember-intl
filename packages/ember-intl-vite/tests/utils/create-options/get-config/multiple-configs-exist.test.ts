import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > multiple configs exist', async function () {
  const inputProject = {
    'ember-intl.config.js': normalizeFile([`export default {};`, ``]),
    'ember-intl.config.mjs': normalizeFile([`export default {};`, ``]),
  };

  const projectRoot = 'tmp/utils/get-config/multiple-configs-exist';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (found multiple config files)`,
      );

      return true;
    },
  );
});
