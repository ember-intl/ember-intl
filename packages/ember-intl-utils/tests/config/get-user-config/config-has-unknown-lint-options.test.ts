import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has unknown lint options', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  lintOptions: {`,
      `    dependecies: {`,
      `      t: [{ importName: 't', importPath: 'my-app/utils/intl' }],`,
      `    },`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-unknown-lint-options';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to get ember-intl config (unknown lint option: dependecies)`,
      );

      return true;
    },
  );
});
