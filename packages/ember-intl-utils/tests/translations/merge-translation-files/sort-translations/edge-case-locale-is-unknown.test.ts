import { assert, test } from '@codemod-utils/tests';

import { sortTranslations } from '../../../../src/translations/merge-translation-files/index.js';
import type { Project } from '../../../../src/translations/types.js';

test('translations | merge-translation-files | sort-translations > edge case (locale is unknown)', function () {
  const translations: Project['translations'] = new Map();

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);
});
