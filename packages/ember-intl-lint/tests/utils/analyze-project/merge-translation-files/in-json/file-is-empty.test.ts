import { assert, test } from '@codemod-utils/tests';

import { inJson } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | in-json > file is empty', function () {
  const file = '';

  const translationObject = inJson(file, {
    filePath: 'translations/en-us.json',
    namespaceKeys: false,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {});
});
