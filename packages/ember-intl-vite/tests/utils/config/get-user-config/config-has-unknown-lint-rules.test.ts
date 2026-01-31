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

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    lintRules: {
      'unknown-rule-1': {
        ignores: ['hello.message'],
      },
      'unknown-rule-2': false,
    },
  });
});
