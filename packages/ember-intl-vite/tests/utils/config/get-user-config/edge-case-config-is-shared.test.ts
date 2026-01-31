import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../../src/utils/config/index.js';

test('utils | config | get-user-config > edge case (config is shared)', async function () {
  const inputProject = {
    apps: {
      'my-app': {
        'ember-intl.config.mjs': normalizeFile([
          `export { default } from '../../configs/ember-intl/index.mjs';`,
          ``,
        ]),
      },
    },
    configs: {
      'ember-intl': {
        'index.mjs': normalizeFile([
          `export default {`,
          `  addonPaths: [`,
          `    'node_modules/my-v1-addon',`,
          `    'node_modules/my-v2-addon',`,
          `  ],`,
          `  lintRules: {`,
          `    'no-missing-keys': {`,
          `      ignores: ['hello.message'],`,
          `    },`,
          `    'no-unused-keys': false,`,
          `  },`,
          `};`,
          ``,
        ]),
      },
    },
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/edge-case-config-is-shared';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(`${projectRoot}/apps/my-app`);

  assert.deepStrictEqual(userConfig, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    lintRules: {
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
