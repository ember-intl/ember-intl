import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-lazy-loaded-translations/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-lazy-loaded-translations.js';

test('steps | analyze-project > my-v2-app-with-lazy-loaded-translations', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.component-from-app.message',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Dies ist eine Komponente aus der App.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'This is a component from the app.',
              },
            ],
          ]),
        ],
        [
          'components.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Komponenten',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Components',
              },
            ],
          ]),
        ],
        [
          'components.translation-with-arguments.message',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message:
                  '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              },
            ],
          ]),
        ],
        [
          'components.translation-with-arguments.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Translation with Arguments',
              },
            ],
          ]),
        ],
        [
          'routes.application.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'ember-intl',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'ember-intl',
              },
            ],
          ]),
        ],
        [
          'routes.index.key-to-overwrite',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: "The app's translations take precedence.",
              },
            ],
          ]),
        ],
        [
          'routes.index.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
                message: 'Willkommen bei <code>ember-intl</code>',
              },
            ],
            [
              'en-us',
              {
                filePath: 'public/assets/translations/en-us.json',
                message: 'Welcome to <code>ember-intl</code>',
              },
            ],
          ]),
        ],
      ]),
      translationFiles: new Map([
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
      translations: new Map([
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
      usedKeys: new Set(),
    }),
  );
});
