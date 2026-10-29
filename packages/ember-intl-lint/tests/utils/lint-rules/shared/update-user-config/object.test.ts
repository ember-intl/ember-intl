import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object', function () {
  const file = normalizeFile([`export default {};`, ``]);

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
      `  "lintOptions": {`,
      `    "rules": {`,
      `      "no-unused-keys": {`,
      `        "ignores": []`,
      `      }`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
