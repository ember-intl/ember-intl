import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('steps | analyze-project > my-v2-app-with-fallbacks', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'translations/components/en-us.yml',
                message: 'Components',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/components/en-us.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
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
                filePath: 'translations/routes/application/de-de.yml',
                message: 'ember-intl',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/routes/application/en-us.yml',
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
                filePath: 'translations/routes/index/de-de.yml',
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/routes/index/en-us.yml',
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
                filePath: 'translations/routes/index/de-de.yml',
                message: 'Willkommen bei <code>ember-intl</code>',
              },
            ],
          ]),
        ],
      ]),
      translationFiles: new Map([
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
      translations: new Map([
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
      usedKeys: new Set(),
    }),
  );
});
