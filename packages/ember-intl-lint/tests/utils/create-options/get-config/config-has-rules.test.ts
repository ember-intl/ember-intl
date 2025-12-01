import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has rules', async function () {
  const inputProject = {
    'ember-intl-lint.config.mjs': [
      `export default {`,
      `  rules: {`,
      `    'find-missing-keys': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'find-unused-keys': false,`,
      `  },`,
      `};`,
      ``,
    ].join('\n'),
  };

  const projectRoot = 'tmp/utils/get-config/config-has-rules';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    rules: {
      'find-missing-keys': {
        ignores: ['hello.message'],
      },
      'find-unused-keys': false,
    },
  });
});
