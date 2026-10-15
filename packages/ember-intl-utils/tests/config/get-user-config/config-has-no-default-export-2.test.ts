import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getUserConfig } from '../../../src/config.js';

test('src | config | get-user-config > config has no default export (2)', async function () {
  const inputProject = {
    'ember-intl.config.mjs': normalizeFile([
      `export const config = {`,
      `  addonPaths: [`,
      `    'node_modules/my-v1-addon',`,
      `    'node_modules/my-v2-addon',`,
      `  ],`,
      `  buildOptions: {`,
      `    fallbackLocale: 'en-us',`,
      `    namespaceKeysByDir: true,`,
      `    translationsDir: 'public/assets/translations',`,
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
    'tmp/utils/config/get-user-config/config-has-no-default-export-2';

  loadFixture(inputProject, { projectRoot });

  await assert.rejects(
    async () => {
      await getUserConfig(projectRoot);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to get ember-intl config (missing default export)`,
      );

      return true;
    },
  );
});
