import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getTranslationFile } from '../../../src/steps/index.js';
import type {
  Project,
  ProjectTranslationData,
  TranslationKey,
} from '../../../src/types/index.js';

test('steps | get-translation-file > base case (1)', function () {
  const translations: Project['translations'] = new Map([
    ['de-de', new Map<TranslationKey, ProjectTranslationData>()],
    ['en-us', new Map<TranslationKey, ProjectTranslationData>()],
  ]);

  let translationFile = getTranslationFile(translations, 'de-de');

  assert.strictEqual(
    translationFile,
    normalizeFile([`const translations = {};`, `export default translations;`]),
  );

  translationFile = getTranslationFile(translations, 'en-us');

  assert.strictEqual(
    translationFile,
    normalizeFile([`const translations = {};`, `export default translations;`]),
  );
});
