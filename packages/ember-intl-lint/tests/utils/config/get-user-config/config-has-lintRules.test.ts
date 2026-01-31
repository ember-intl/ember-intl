import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > config has lintRules', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  lintRules: {`,
      `    'no-missing-keys': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'no-unused-keys': false,`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot = 'tmp/utils/config/get-user-config/config-has-lintRules';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
