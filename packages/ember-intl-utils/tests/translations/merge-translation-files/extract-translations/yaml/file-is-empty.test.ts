import { assert, test } from '@codemod-utils/tests';

import { extractTranslations } from '../../../../../src/translations/merge-translation-files/index.js';

test('translations | merge-translation-files | extract-translations | yaml > file is empty', function () {
  const file = '';

  const translationJson = extractTranslations(file, {
    filePath: 'translations/en-us.yaml',
    namespaceKeysByDir: false,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationJson, {});
});
