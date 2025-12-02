import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config is shared', async function () {
  const inputProject = {
    apps: {
      'my-app': {
        'ember-intl-lint.config.mjs': [
          `export { default } from '../../configs/ember-intl-lint/index.mjs';`,
          ``,
        ].join('\n'),
      },
    },
    configs: {
      'ember-intl-lint': {
        'index.mjs': [
          `export default {`,
          `  addonPaths: [`,
          `    'node_modules/my-v1-addon',`,
          `    'node_modules/my-v2-addon',`,
          `  ],`,
          `  rules: {`,
          `    'no-missing-keys': {`,
          `      ignores: ['hello.message'],`,
          `    },`,
          `    'no-unused-keys': false,`,
          `  },`,
          `};`,
          ``,
        ].join('\n'),
      },
    },
  };

  const projectRoot = 'tmp/utils/get-config/config-is-shared';

  loadFixture(inputProject, { projectRoot });

  const config = await getConfig(`${projectRoot}/apps/my-app`);

  assert.deepStrictEqual(config, {
    addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    rules: {
      'no-inconsistent-messages': true,
      'no-missing-keys': {
        ignores: ['hello.message'],
      },
      'no-unused-keys': false,
    },
  });
});
