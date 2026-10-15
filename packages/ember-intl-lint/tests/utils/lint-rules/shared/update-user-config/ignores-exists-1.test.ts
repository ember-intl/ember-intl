import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > ignores exists (1)', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintRules: {`,
    `    'no-unused-keys': {`,
    `      ignores: [`,
    `        'key01',`,
    `        /^global\\./,`,
    `        /^backend\\.error\\./`,
    `      ],`,
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
      lintRules: {
        'no-unused-keys': {
          ignores: ['key01', /^global\./, /^backend\.error\./],
        },
      },
    },
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
