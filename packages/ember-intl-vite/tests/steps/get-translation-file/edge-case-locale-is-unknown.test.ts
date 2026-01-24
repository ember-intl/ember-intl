import { assert, test } from '@codemod-utils/tests';

import { getTranslationFile } from '../../../src/steps/index.js';
import type {
  Project,
  ProjectTranslationData,
  TranslationKey,
} from '../../../src/types/index.js';

test('steps | get-translation-file > edge case (locale is unknown)', function () {
  const translations: Project['translations'] = new Map([
    ['de-de', new Map<TranslationKey, ProjectTranslationData>()],
    ['en-us', new Map<TranslationKey, ProjectTranslationData>()],
  ]);

  assert.throws(
    () => {
      getTranslationFile(translations, 'es-es');
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to find translations. (unknown locale: es-es)`,
      );

      return true;
    },
  );
});
