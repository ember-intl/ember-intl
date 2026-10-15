import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > UserConfig exists (1)', function () {
  const file = normalizeFile([
    `import type { UserConfig } from 'ember-intl/config';`,
    ``,
    `export default {} satisfies UserConfig;`,
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
      `export default {`,
      `  "lintRules": {`,
      `    "no-unused-keys": {`,
      `      "ignores": []`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
