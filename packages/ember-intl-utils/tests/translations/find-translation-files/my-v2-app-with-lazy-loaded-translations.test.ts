import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findTranslationFiles } from '../../../src/translations.js';
import { inputProject } from '../../fixtures/my-v2-app-with-lazy-loaded-translations/index.js';
import { normalizeTranslationFiles } from '../../helpers/normalize.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-lazy-loaded-translations.js';

test('src | translations | find-translation-files > my-v2-app-with-lazy-loaded-translations', function () {
  loadFixture(inputProject, codemodOptions);

  const translationFiles = findTranslationFiles(options);

  assert.deepStrictEqual(
    translationFiles,
    normalizeTranslationFiles(
      new Map([
        [
          'public/assets/translations/de-de.json',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'public/assets/translations',
          },
        ],
        [
          'public/assets/translations/en-us.json',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'public/assets/translations',
          },
        ],
      ]),
    ),
  );
});
