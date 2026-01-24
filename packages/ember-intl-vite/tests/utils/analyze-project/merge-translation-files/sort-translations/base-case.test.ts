import { assert, test } from '@codemod-utils/tests';

import type {
  Project,
  ProjectTranslationData,
  TranslationKey,
} from '../../../../../src/types/index.js';
import { sortTranslations } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';
import { getTranslationKeys } from '../../../../helpers/index.js';

test('utils | analyze-project | merge-translation-files | sort-translations > base case', function () {
  const translations: Project['translations'] = new Map([
    ['de-de', new Map<TranslationKey, ProjectTranslationData>()],
    ['en-us', new Map<TranslationKey, ProjectTranslationData>()],
  ]);

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'de-de'), []);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'en-us'), []);
});
