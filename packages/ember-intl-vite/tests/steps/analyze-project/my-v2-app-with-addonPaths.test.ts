import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-addonPaths/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('steps | analyze-project > my-v2-app-with-addonPaths', function () {
  loadFixture(inputProject, { projectRoot });

  const { translations } = analyzeProject(options);

  assert.deepStrictEqual(
    translations,
    new Map([
      [
        'de-de',
        {
          'components.component-from-app.message':
            'Dies ist eine Komponente aus der App.',
          'components.component-from-v1-addon.message':
            'Dies ist eine Komponente aus einem v1 Addon.',
          'components.component-from-v2-addon.message':
            'Dies ist eine Komponente aus einem v2 Addon.',
          'components.select-locale.label': 'Sprache',
          'components.select-locale.option.de-de': 'Deutsch',
          'components.select-locale.option.default': 'Sprache auswählen',
          'components.select-locale.option.en-us': 'Englisch',
          'components.title': 'Komponenten',
          'components.translation-with-arguments.message':
            '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
          'components.translation-with-arguments.title':
            'Übersetzung mit Argumenten',
          'routes.application.title': 'ember-intl',
          'routes.index.key-to-overwrite':
            'Die Apps Übersetzungen haben Vorrang.',
          'routes.index.title': 'Willkommen bei <code>ember-intl</code>',
        },
      ],
      [
        'en-us',
        {
          'components.component-from-app.message':
            'This is a component from the app.',
          'components.component-from-v1-addon.message':
            'This is a component from a v1 addon.',
          'components.component-from-v2-addon.message':
            'This is a component from a v2 addon.',
          'components.select-locale.label': 'Language',
          'components.select-locale.option.de-de': 'German',
          'components.select-locale.option.default': 'Choose your language',
          'components.select-locale.option.en-us': 'English',
          'components.title': 'Components',
          'components.translation-with-arguments.message':
            '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
          'components.translation-with-arguments.title':
            'Translation with Arguments',
          'routes.application.title': 'ember-intl',
          'routes.index.key-to-overwrite':
            "The app's translations take precedence.",
          'routes.index.title': 'Welcome to <code>ember-intl</code>',
        },
      ],
    ]),
  );
});
