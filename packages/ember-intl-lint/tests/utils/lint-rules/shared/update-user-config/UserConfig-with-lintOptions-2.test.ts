import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > UserConfig with lintOptions (2)', function () {
  const file = normalizeFile([
    `import type { UserConfig } from 'ember-intl/config';`,
    ``,
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
    `    }`,
    `  },`,
    `} satisfies UserConfig;`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(['key04', 'key02', 'key03']),
      regex: [/^global\./, /^backend\.error\./],
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
      `import type { UserConfig } from 'ember-intl/config';`,
      ``,
      `export default {`,
      `  "lintOptions": {`,
      `    "rules": {`,
      `      "no-unused-keys": {`,
      `        "ignores": [`,
      `          "key02",`,
      `          "key03",`,
      `          "key04",`,
      `          /^backend\\.error\\./,`,
      `          /^global\\./`,
      `        ]`,
      `      }`,
      `    }`,
      `  }`,
      `} satisfies UserConfig;`,
      ``,
    ]),
  );
});
