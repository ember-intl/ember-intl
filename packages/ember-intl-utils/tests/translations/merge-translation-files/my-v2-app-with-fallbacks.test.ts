import { assert, loadFixture, test } from '@codemod-utils/tests';

import {
  findTranslationFiles,
  mergeTranslationFiles,
} from '../../../src/translations.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import { normalizeTranslations } from '../../helpers/normalize.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('src | translations | merge-translation-files > my-v2-app-with-fallbacks', function () {
  loadFixture(inputProject, codemodOptions);

  const translationFiles = findTranslationFiles(options);
  const translations = mergeTranslationFiles(translationFiles, options);

  assert.deepStrictEqual(
    translations,
    normalizeTranslations(
      new Map([
        [
          'de-de',
          new Map([
            [
              'components.title',
              {
                filePath: 'translations/components/en-us.yml',
                message: 'Components',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'translations/routes/application/de-de.yml',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/de-de.yml',
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'routes.index.title',
              {
                filePath: 'translations/routes/index/de-de.yml',
                message: 'Willkommen bei <code>ember-intl</code>',
              },
            ],
          ]),
        ],
        [
          'en-us',
          new Map([
            [
              'components.title',
              {
                filePath: 'translations/components/en-us.yml',
                message: 'Components',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
                message:
                  '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
                message: 'Translation with Arguments',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'translations/routes/application/en-us.yml',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/en-us.yml',
                message: "The app's translations take precedence.",
              },
            ],
          ]),
        ],
      ]),
    ),
  );
});
