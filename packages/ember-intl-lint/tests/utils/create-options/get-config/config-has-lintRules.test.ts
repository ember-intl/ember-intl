import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has lintRules', async function () {
  const inputProject = {
    'ember-intl.config.mjs': [
      `export default {`,
      `  lintRules: {`,
      `    'no-missing-keys': {`,
      `      ignores: ['hello.message'],`,
      `    },`,
      `    'no-unused-keys': false,`,
      `  },`,
      `};`,
      ``,
    ].join('\n'),
  };

  const projectRoot = 'tmp/utils/get-config/config-has-lintRules';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
