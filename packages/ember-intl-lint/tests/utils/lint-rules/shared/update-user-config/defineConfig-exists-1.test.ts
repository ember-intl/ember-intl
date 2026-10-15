import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > defineConfig exists (1)', function () {
  const file = normalizeFile([
    `import { defineConfig } from 'ember-intl/config';`,
    ``,
    `export default defineConfig({});`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(),
      regex: [],
    },
    lintRule: 'no-unused-keys',
    userConfig: {},
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import { defineConfig } from 'ember-intl/config';`,
      ``,
      `export default defineConfig({`,
      `  "lintRules": {`,
      `    "no-unused-keys": {`,
      `      "ignores": []`,
      `    }`,
      `  }`,
      `});`,
      ``,
    ]),
  );
});
