import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > defineConfig exists (3)', function () {
  const file = normalizeFile([
    `import { defineConfig } from 'ember-intl/config';`,
    ``,
    `export default defineConfig({`,
    `  lintRules: {`,
    `    'no-unused-keys': {`,
    `      ignores: [`,
    `        'key01',`,
    `        /^global\\./,`,
    `        /^backend\\.error\\./`,
    `      ],`,
    `    },`,
    `  },`,
    `});`,
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
        'no-unused-keys': {
          ignores: ['key01', /^global\./, /^backend\.error\./],
        },
      },
    },
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `import { defineConfig } from 'ember-intl/config';`,
      ``,
      `export default defineConfig({`,
      `  "lintRules": {`,
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
      `});`,
      ``,
    ]),
  );
});
