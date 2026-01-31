import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has unknown lint rules', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  lintRules: {`,
      `    'unknown-rule-1': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'unknown-rule-2': false,`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-unknown-lint-rules';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (Unknown lint rule: unknown-rule-1)`,
      );

      return true;
    },
  );
});
