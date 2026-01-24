import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../../src/types/index.js';
import { sortTranslations } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';
import { getTranslationKeys } from '../../../../helpers/index.js';

test('utils | analyze-project | merge-translation-files | sort-translations > keys are sorted', function () {
  const translations: Project['translations'] = new Map([
    [
      'de-de',
      new Map([
        [
          'components.component-from-app.message',
          {
            filePath: 'translations/components/component-from-app/de-de.yml',
            message: 'Dies ist eine Komponente aus der App.',
          },
        ],
        [
          'components.title',
          {
            filePath: 'translations/components/de-de.yml',
            message: 'Komponenten',
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
          'components.component-from-app.message',
          {
            filePath: 'translations/components/component-from-app/en-us.yml',
            message: 'This is a component from the app.',
          },
        ],
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
        [
          'routes.index.title',
          {
            filePath: 'translations/routes/index/en-us.yml',
            message: 'Welcome to <code>ember-intl</code>',
          },
        ],
      ]),
    ],
  ]);

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'de-de'), [
    'components.component-from-app.message',
    'components.title',
    'components.translation-with-arguments.message',
    'components.translation-with-arguments.title',
    'routes.application.title',
    'routes.index.key-to-overwrite',
    'routes.index.title',
  ]);

  assert.deepStrictEqual(getTranslationKeys(translationsSorted, 'en-us'), [
    'components.component-from-app.message',
    'components.title',
    'components.translation-with-arguments.message',
    'components.translation-with-arguments.title',
    'routes.application.title',
    'routes.index.key-to-overwrite',
    'routes.index.title',
  ]);
});
