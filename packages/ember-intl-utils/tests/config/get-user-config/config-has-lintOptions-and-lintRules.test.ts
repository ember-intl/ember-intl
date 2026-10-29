import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has lintOptions and lintRules', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  lintOptions: {`,
      `    rules: {`,
      `      'no-inconsistent-messages': false,`,
      `      'no-unused-keys': {`,
      `        ignores: ['hello.message'],`,
      `      },`,
      `    },`,
      `  },`,
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

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-lintOptions-and-lintRules';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    lintOptions: {
      rules: {
        'no-inconsistent-messages': false,
        'no-unused-keys': {
          ignores: ['hello.message'],
        },
      },
    },
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
