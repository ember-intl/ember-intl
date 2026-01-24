import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../../src/types/index.js';
import { sortTranslations } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | sort-translations > edge case (translationObject is empty)', function () {
  const translations: Project['translations'] = new Map([
    ['de-de', {}],
    ['en-us', {}],
  ]);

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);

  assert.deepStrictEqual(Object.keys(translationsSorted.get('de-de')!), []);

  assert.deepStrictEqual(Object.keys(translationsSorted.get('en-us')!), []);
});
