import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findTranslationFiles } from '../../../src/translations.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import { normalizeTranslationFiles } from '../../helpers/normalize.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('src | translations | find-translation-files > my-v2-app-with-fallbacks', function () {
  loadFixture(inputProject, codemodOptions);

  const translationFiles = findTranslationFiles(options);

  assert.deepStrictEqual(
    translationFiles,
    normalizeTranslationFiles(
      new Map([
        [
          'translations/components/component-from-app/de-de.yml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/component-from-app/en-us.yml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/de-de.yml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/en-us.yml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/translation-with-arguments/de-de.yml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/translation-with-arguments/en-us.yml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/application/de-de.yml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/application/en-us.yml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/de-de.yml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/en-us.yml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
      ]),
    ),
  );
});
