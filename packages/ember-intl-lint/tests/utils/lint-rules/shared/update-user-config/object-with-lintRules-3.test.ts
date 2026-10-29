import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with lintRules (3)', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintRules: {`,
    `    'no-missing-keys': {`,
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
      exact: new Set(['key04', 'key02', 'key03']),
      regex: [/^global\./, /^backend\.error\./],
    },
    lintRule: 'no-unused-keys',
    userConfig: {
      lintRules: {
        'no-missing-keys': {
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
      `    "no-missing-keys": {`,
      `      "ignores": [`,
      `        "key01",`,
      `        /^global\\./,`,
      `        /^backend\\.error\\./`,
      `      ]`,
      `    },`,
      `    "no-unused-keys": {`,
      `      "ignores": [`,
      `        "key02",`,
      `        "key03",`,
      `        "key04",`,
      `        /^backend\\.error\\./,`,
      `        /^global\\./`,
      `      ]`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
