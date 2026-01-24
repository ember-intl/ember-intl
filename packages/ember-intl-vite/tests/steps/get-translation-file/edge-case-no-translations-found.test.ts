import { assert, test } from '@codemod-utils/tests';

import { getTranslationFile } from '../../../src/steps/index.js';
import type { Project } from '../../../src/types/index.js';

test('steps | get-translation-file > edge case (no translations found)', function () {
  const translations: Project['translations'] = new Map();

  assert.throws(
    () => {
      getTranslationFile(translations, 'en-us');
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to find translations. (unknown locale: en-us)`,
      );

      return true;
    },
  );
});
