import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('steps | analyze-project > my-v2-app-with-fallbacks', function () {
  loadFixture(inputProject, { projectRoot });

  const { translations } = analyzeProject(options);

  assert.deepStrictEqual(
    translations,
    new Map([
      [
        'de-de',
        {
          'components.title': 'Components',
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
          'components.title': 'Components',
          'components.translation-with-arguments.message':
            '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
          'components.translation-with-arguments.title':
            'Translation with Arguments',
          'routes.application.title': 'ember-intl',
          'routes.index.key-to-overwrite':
            "The app's translations take precedence.",
        },
      ],
    ]),
  );
});
