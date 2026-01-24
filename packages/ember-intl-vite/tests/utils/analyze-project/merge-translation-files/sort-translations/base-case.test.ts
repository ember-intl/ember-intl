import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../../src/types/index.js';
import { sortTranslations } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | sort-translations > base case', function () {
  const translations: Project['translations'] = new Map();

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);
});
