import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has unknown lint rules', async function () {
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

  const projectRoot = 'tmp/utils/get-config/config-has-unknown-lint-rules';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(projectRoot);

  assert.deepStrictEqual(config, {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
  });
});
