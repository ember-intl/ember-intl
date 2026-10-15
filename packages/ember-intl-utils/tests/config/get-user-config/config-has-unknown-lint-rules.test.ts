import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has unknown lint rules', async function () {
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
        `Unable to get ember-intl config (unknown lint rule: unknown-rule-1)`,
      );

      return true;
    },
  );
});
