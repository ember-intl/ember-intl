import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has unknown build options', async function () {
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

  const projectRoot = 'tmp/utils/get-config/config-has-unknown-build-options';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (unknown build option: unknown-option-1)`,
      );

      return true;
    },
  );
});
