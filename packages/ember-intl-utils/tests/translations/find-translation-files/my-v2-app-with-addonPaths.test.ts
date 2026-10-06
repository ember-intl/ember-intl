import { assert, loadFixture, test } from '@codemod-utils/tests';

import { findTranslationFiles } from '../../../src/translations.js';
import { inputProject } from '../../fixtures/my-v2-app-with-addonPaths/index.js';
import { normalizeTranslationFiles } from '../../helpers/normalize.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('src | translations | find-translation-files > my-v2-app-with-addonPaths', function () {
  loadFixture(inputProject, codemodOptions);

  const translationFiles = findTranslationFiles(options);

  assert.deepStrictEqual(
    translationFiles,
    normalizeTranslationFiles(
      new Map([
        [
          'node_modules/my-v1-addon/translations/components/component-from-v1-addon/de-de.yml',
          {
            isInternal: false,
            locale: 'de-de',
            translationsDir: 'node_modules/my-v1-addon/translations',
          },
        ],
        [
          'node_modules/my-v1-addon/translations/components/component-from-v1-addon/en-us.yml',
          {
            isInternal: false,
            locale: 'en-us',
            translationsDir: 'node_modules/my-v1-addon/translations',
          },
        ],
        [
          'node_modules/my-v1-addon/translations/routes/index/de-de.yml',
          {
            isInternal: false,
            locale: 'de-de',
            translationsDir: 'node_modules/my-v1-addon/translations',
          },
        ],
        [
          'node_modules/my-v1-addon/translations/routes/index/en-us.yml',
          {
            isInternal: false,
            locale: 'en-us',
            translationsDir: 'node_modules/my-v1-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/components/component-from-v2-addon/de-de.yml',
          {
            isInternal: false,
            locale: 'de-de',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/components/component-from-v2-addon/en-us.yml',
          {
            isInternal: false,
            locale: 'en-us',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
          {
            isInternal: false,
            locale: 'de-de',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
          {
            isInternal: false,
            locale: 'en-us',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/routes/index/de-de.yml',
          {
            isInternal: false,
            locale: 'de-de',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'node_modules/my-v2-addon/translations/routes/index/en-us.yml',
          {
            isInternal: false,
            locale: 'en-us',
            translationsDir: 'node_modules/my-v2-addon/translations',
          },
        ],
        [
          'translations/de-de.json',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/en-us.json',
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
