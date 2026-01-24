import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../../src/types/index.js';
import { sortTranslations } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | sort-translations > keys are unsorted', function () {
  const translations: Project['translations'] = new Map([
    [
      'de-de',
      {
        'components.component-from-v1-addon.message':
          'Dies ist eine Komponente aus einem v1 Addon.',
        'routes.index.key-to-overwrite':
          'Die Apps Übersetzungen haben Vorrang.',
        'components.component-from-v2-addon.message':
          'Dies ist eine Komponente aus einem v2 Addon.',
        'components.select-locale.label': 'Sprache',
        'components.select-locale.option.de-de': 'Deutsch',
        'components.select-locale.option.default': 'Sprache auswählen',
        'components.select-locale.option.en-us': 'Englisch',
        'components.component-from-app.message':
          'Dies ist eine Komponente aus der App.',
        'components.title': 'Komponenten',
        'components.translation-with-arguments.message':
          '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
        'components.translation-with-arguments.title':
          'Übersetzung mit Argumenten',
        'routes.application.title': 'ember-intl',
        'routes.index.title': 'Willkommen bei <code>ember-intl</code>',
      },
    ],
    [
      'en-us',
      {
        'components.component-from-v1-addon.message':
          'This is a component from a v1 addon.',
        'routes.index.key-to-overwrite':
          "The app's translations take precedence.",
        'components.component-from-v2-addon.message':
          'This is a component from a v2 addon.',
        'components.select-locale.label': 'Language',
        'components.select-locale.option.de-de': 'German',
        'components.select-locale.option.default': 'Choose your language',
        'components.select-locale.option.en-us': 'English',
        'components.component-from-app.message':
          'This is a component from the app.',
        'components.title': 'Components',
        'components.translation-with-arguments.message':
          '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
        'components.translation-with-arguments.title':
          'Translation with Arguments',
        'routes.application.title': 'ember-intl',
        'routes.index.title': 'Welcome to <code>ember-intl</code>',
      },
    ],
  ]);

  const translationsSorted = sortTranslations(translations);

  assert.deepStrictEqual(translationsSorted, translations);

  assert.deepStrictEqual(Object.keys(translationsSorted.get('de-de')!), [
    'components.component-from-app.message',
    'components.component-from-v1-addon.message',
    'components.component-from-v2-addon.message',
    'components.select-locale.label',
    'components.select-locale.option.de-de',
    'components.select-locale.option.default',
    'components.select-locale.option.en-us',
    'components.title',
    'components.translation-with-arguments.message',
    'components.translation-with-arguments.title',
    'routes.application.title',
    'routes.index.key-to-overwrite',
    'routes.index.title',
  ]);

  assert.deepStrictEqual(Object.keys(translationsSorted.get('en-us')!), [
    'components.component-from-app.message',
    'components.component-from-v1-addon.message',
    'components.component-from-v2-addon.message',
    'components.select-locale.label',
    'components.select-locale.option.de-de',
    'components.select-locale.option.default',
    'components.select-locale.option.en-us',
    'components.title',
    'components.translation-with-arguments.message',
    'components.translation-with-arguments.title',
    'routes.application.title',
    'routes.index.key-to-overwrite',
    'routes.index.title',
  ]);
});
