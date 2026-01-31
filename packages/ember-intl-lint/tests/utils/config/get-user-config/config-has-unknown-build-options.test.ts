import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has unknown build options', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  buildOptions: {`,
      `    'unknown-option-1': false,`,
      `    'unknown-option-2': 'some-value',`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-unknown-build-options';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (Unknown build option: unknown-option-1)`,
      );

      return true;
    },
  );
});
