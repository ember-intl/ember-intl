import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with lintOptions (1)', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintOptions: {`,
    `    rules: {`,
    `      'no-unused-keys': {`,
    `        ignores: [`,
    `          'key01',`,
    `          /^global\\./,`,
    `          /^backend\\.error\\./`,
    `        ],`,
    `      },`,
    `    },`,
    `  },`,
    `};`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(),
      regex: [],
    },
    lintRule: 'no-unused-keys',
    userConfig: {
      lintOptions: {
        rules: {
          'no-unused-keys': {
            ignores: ['key01', /^global\./, /^backend\.error\./],
          },
        },
      },
    },
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
