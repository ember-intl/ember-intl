import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has defineConfig', async function () {
  const inputProject = {
    'ember-intl': {
      'config.js': normalizeFile([
        `export function defineConfig(config) {`,
        `  return config;`,
        `}`,
      ]),
    },
    'ember-intl.config.mjs': normalizeFile([
      `import { defineConfig } from './ember-intl/config.js';`,
      ``,
      `export default defineConfig({`,
      `  buildOptions: {`,
      `    fallbackLocale: 'en-us',`,
      `  },`,
      `});`,
      ``,
    ]),
  };

  const projectRoot =
    'tmp/utils/config/get-user-config/config-has-defineConfig';

  loadFixture(inputProject, { projectRoot });

  const userConfig = await getUserConfig(projectRoot);

  assert.deepStrictEqual(userConfig, {
    buildOptions: {
      fallbackLocale: 'en-us',
    },
  });
});
