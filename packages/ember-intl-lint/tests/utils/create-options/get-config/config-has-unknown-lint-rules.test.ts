import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has unknown lint rules', async function () {
  const inputProject = {
    'ember-intl.config.mjs': [
      `export default {`,
      `  lintRules: {`,
      `    'unknown-rule-1': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'unknown-rule-2': false,`,
      `  },`,
      `};`,
      ``,
    ].join('\n'),
  };

  const projectRoot = 'tmp/utils/get-config/config-has-unknown-lint-rules';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (unknown lint rule: unknown-rule-1)`,
      );

      return true;
    },
  );
});
