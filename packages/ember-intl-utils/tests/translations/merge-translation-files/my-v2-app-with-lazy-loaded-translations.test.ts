import { assert, loadFixture, test } from '@codemod-utils/tests';

import {
  findTranslationFiles,
  mergeTranslationFiles,
} from '../../../src/translations.js';
import { inputProject } from '../../fixtures/my-v2-app-with-lazy-loaded-translations/index.js';
import { normalizeTranslations } from '../../helpers/normalize.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-lazy-loaded-translations.js';

test('src | translations | merge-translation-files > my-v2-app-with-lazy-loaded-translations', function () {
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
              'components.component-from-app.message',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Dies ist eine Komponente aus der App.',
              },
            ],
            [
              'components.title',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Komponenten',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath: 'public/assets/translations/de-de.json',
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'routes.index.title',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Willkommen bei <code>ember-intl</code>',
              },
            ],
          ]),
        ],
        [
          'en-us',
          new Map([
            [
              'components.component-from-app.message',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'This is a component from the app.',
              },
            ],
            [
              'components.title',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Components',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath: 'public/assets/translations/en-us.json',
                message:
                  '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Translation with Arguments',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: "The app's translations take precedence.",
              },
            ],
            [
              'routes.index.title',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Welcome to <code>ember-intl</code>',
              },
            ],
          ]),
        ],
      ]),
    ),
  );
});
