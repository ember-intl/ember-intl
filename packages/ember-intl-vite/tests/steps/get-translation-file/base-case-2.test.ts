import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getTranslationFile } from '../../../src/steps/index.js';

test('steps | get-translation-file > base case (2)', function () {
  const translations = new Map([
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

  let translationFile = getTranslationFile(translations, 'de-de');

  assert.strictEqual(
    translationFile,
    normalizeFile([
      `const translations = {"components.component-from-app.message":"Dies ist eine Komponente aus der App.","components.title":"Komponenten","components.translation-with-arguments.message":"{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.","components.translation-with-arguments.title":"Übersetzung mit Argumenten","routes.application.title":"ember-intl","routes.index.key-to-overwrite":"Die Apps Übersetzungen haben Vorrang.","routes.index.title":"Willkommen bei <code>ember-intl</code>"};`,
      `export default translations;`,
    ]),
  );

  translationFile = getTranslationFile(translations, 'en-us');

  assert.strictEqual(
    translationFile,
    normalizeFile([
      `const translations = {"components.component-from-app.message":"This is a component from the app.","components.title":"Components","components.translation-with-arguments.message":"{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.","components.translation-with-arguments.title":"Translation with Arguments","routes.application.title":"ember-intl","routes.index.key-to-overwrite":"The app's translations take precedence.","routes.index.title":"Welcome to <code>ember-intl</code>"};`,
      `export default translations;`,
    ]),
  );
});
