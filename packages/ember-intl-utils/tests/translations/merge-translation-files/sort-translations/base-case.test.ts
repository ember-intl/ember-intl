import { assert, test } from '@codemod-utils/tests';

import { sortTranslations } from '../../../../src/translations/merge-translation-files/index.js';
import type {
  Project,
  ProjectTranslationData,
  TranslationKey,
} from '../../../../src/translations/types.js';
import { getTranslationKeys } from '../../../helpers/get-translation-keys.js';

test('translations | merge-translation-files | sort-translations > base case', function () {
  const translations: Project['translations'] = new Map([
    ['de-de', new Map<TranslationKey, ProjectTranslationData>()],
    ['en-us', new Map<TranslationKey, ProjectTranslationData>()],
  ]);

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'de-de'), []);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'en-us'), []);
});
