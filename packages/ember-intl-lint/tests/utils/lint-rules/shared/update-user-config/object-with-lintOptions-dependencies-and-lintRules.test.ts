import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with lintOptions.dependencies and lintRules', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintOptions: {`,
    `    dependencies: {`,
    `      t: [{ importName: 't', importPath: 'my-app/utils/intl' }],`,
    `    },`,
    `  },`,
    `  lintRules: {`,
    `    'no-unused-keys': {`,
    `      ignores: [],`,
    `    },`,
    `  },`,
    `};`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(['key04', 'key02', 'key03']),
      regex: [],
    },
    lintRule: 'no-inconsistent-messages',
    userConfig: {
      lintOptions: {
        dependencies: {
          t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
        },
      },
      lintRules: {
        'no-unused-keys': {
          ignores: [],
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
      `    }`,
      `  },`,
      `  "lintRules": {`,
      `    "no-unused-keys": {`,
      `      "ignores": []`,
      `    },`,
      `    "no-inconsistent-messages": {`,
      `      "ignores": [`,
      `        "key02",`,
      `        "key03",`,
      `        "key04"`,
      `      ]`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
