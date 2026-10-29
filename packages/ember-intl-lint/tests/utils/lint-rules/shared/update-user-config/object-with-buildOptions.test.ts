import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { updateUserConfig } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | update-user-config > object with buildOptions', function () {
  const file = normalizeFile([
    `export default {`,
    `  buildOptions: {`,
    `    fallbackLocale: 'en-us',`,
    `    namespaceKeysByDir: true,`,
    `    translationsDir: 'public/assets/translations',`,
    `  },`,
    `};`,
    ``,
  ]);

  const newFile = updateUserConfig(file, {
    ignoresNew: {
      exact: new Set(['key04', 'key02', 'key03']),
      regex: [],
    },
    lintRule: 'no-unused-keys',
    userConfig: {
      buildOptions: {
        fallbackLocale: 'en-us',
        namespaceKeysByDir: true,
        translationsDir: 'public/assets/translations',
      },
    },
  });

  assert.strictEqual(
    newFile,
    normalizeFile([
      `export default {`,
      `  "buildOptions": {`,
      `    "fallbackLocale": "en-us",`,
      `    "namespaceKeysByDir": true,`,
      `    "translationsDir": "public/assets/translations"`,
      `  },`,
      `  "lintOptions": {`,
      `    "rules": {`,
      `      "no-unused-keys": {`,
      `        "ignores": [`,
      `          "key02",`,
      `          "key03",`,
      `          "key04"`,
      `        ]`,
      `      }`,
      `    }`,
      `  }`,
      `};`,
      ``,
    ]),
  );
});
