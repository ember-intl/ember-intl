import { assert, test } from '@codemod-utils/tests';

import { extractTranslations } from '../../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | extract-translations | json > file is empty', function () {
  const file = '';

  const translationJson = extractTranslations(file, {
    filePath: 'translations/en-us.json',
    namespaceKeysByDir: false,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationJson, {});
});
