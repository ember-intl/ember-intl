import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with lintOptions.dependencies', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintOptions: {`,
    `    dependencies: {`,
    `      t: [{ importName: 't', importPath: 'my-app/utils/intl' }],`,
    `    },`,
    `  },`,
    `};`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(['key02', 'key01']),
      regex: [],
    },
    lintRule: 'no-unused-keys',
    userConfig: {
      lintOptions: {
        dependencies: {
          t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
        },
      },
    },
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `export default {`,
      `  "lintOptions": {`,
      `    "dependencies": {`,
      `      "t": [`,
      `        {`,
      `          "importName": "t",`,
      `          "importPath": "my-app/utils/intl"`,
      `        }`,
      `      ]`,
      `    },`,
      `    "rules": {`,
      `      "no-unused-keys": {`,
      `        "ignores": [`,
      `          "key01",`,
      `          "key02"`,
      `        ]`,
      `      }`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
