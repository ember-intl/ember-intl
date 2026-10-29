import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has lintOptions', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export default {`,
      `  lintOptions: {`,
      `    rules: {`,
      `      'no-missing-keys': {`,
      `        ignores: ['hello.message'],`,
      `      },`,
      `      'no-unused-keys': false,`,
      `    },`,
      `  },`,
      `};`,
      ``,
    ]),
  };

  const projectRoot = 'tmp/utils/config/get-user-config/config-has-lintOptions';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    lintOptions: {
      rules: {
        'no-missing-keys': {
          ignores: ['hello.message'],
        },
        'no-unused-keys': false,
      },
    },
  });
});
