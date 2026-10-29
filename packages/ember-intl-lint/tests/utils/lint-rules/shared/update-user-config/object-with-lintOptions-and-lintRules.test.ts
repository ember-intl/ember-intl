import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with lintOptions and lintRules', function () {
  const file = normalizeFile([
    `export default {`,
    `  lintOptions: {`,
    `    rules: {`,
    `      'no-missing-keys': {`,
    `        ignores: [],`,
    `      },`,
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
        rules: {
          'no-missing-keys': {
            ignores: [],
          },
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
      `    "rules": {`,
      `      "no-missing-keys": {`,
      `        "ignores": []`,
      `      },`,
      `      "no-inconsistent-messages": {`,
      `        "ignores": [`,
      `          "key02",`,
      `          "key03",`,
      `          "key04"`,
      `        ]`,
      `      }`,
      `    }`,
      `  },`,
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
