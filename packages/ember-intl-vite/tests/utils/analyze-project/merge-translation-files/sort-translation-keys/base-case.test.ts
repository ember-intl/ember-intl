import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../../src/types/index.js';
import { sortTranslationKeys } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | sort-translation-keys > base case', function () {
  const translations: Project['translations'] = new Map();

  const translationsSorted = sortTranslationKeys(translations);

  assert.deepStrictEqual(translationsSorted, translations);
});
