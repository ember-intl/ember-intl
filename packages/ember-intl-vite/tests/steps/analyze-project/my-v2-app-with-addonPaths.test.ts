import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-addonPaths/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('steps | analyze-project > my-v2-app-with-addonPaths', function () {
  loadFixture(inputProject, { projectRoot });

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      translationFiles: new Map([
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
      translations: new Map([
        [
          'de-de',
          new Map([
            [
              'components.component-from-app.message',
              {
                filePath: 'translations/de-de.json',
                message: 'Dies ist eine Komponente aus der App.',
              },
            ],
            [
              'components.component-from-v1-addon.message',
              {
                filePath:
                  'node_modules/my-v1-addon/translations/components/component-from-v1-addon/de-de.yml',
                message: 'Dies ist eine Komponente aus einem v1 Addon.',
              },
            ],
            [
              'components.component-from-v2-addon.message',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/component-from-v2-addon/de-de.yml',
                message: 'Dies ist eine Komponente aus einem v2 Addon.',
              },
            ],
            [
              'components.select-locale.label',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                message: 'Sprache',
              },
            ],
            [
              'components.select-locale.option.de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                message: 'Deutsch',
              },
            ],
            [
              'components.select-locale.option.default',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                message: 'Sprache auswählen',
              },
            ],
            [
              'components.select-locale.option.en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                message: 'Englisch',
              },
            ],
            [
              'components.title',
              {
                filePath: 'translations/de-de.json',
                message: 'Komponenten',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath: 'translations/de-de.json',
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath: 'translations/de-de.json',
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'translations/de-de.json',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/de-de.json',
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'routes.index.title',
              {
                filePath: 'translations/de-de.json',
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
                filePath: 'translations/en-us.json',
                message: 'This is a component from the app.',
              },
            ],
            [
              'components.component-from-v1-addon.message',
              {
                filePath:
                  'node_modules/my-v1-addon/translations/components/component-from-v1-addon/en-us.yml',
                message: 'This is a component from a v1 addon.',
              },
            ],
            [
              'components.component-from-v2-addon.message',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/component-from-v2-addon/en-us.yml',
                message: 'This is a component from a v2 addon.',
              },
            ],
            [
              'components.select-locale.label',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                message: 'Language',
              },
            ],
            [
              'components.select-locale.option.de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                message: 'German',
              },
            ],
            [
              'components.select-locale.option.default',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                message: 'Choose your language',
              },
            ],
            [
              'components.select-locale.option.en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                message: 'English',
              },
            ],
            [
              'components.title',
              {
                filePath: 'translations/en-us.json',
                message: 'Components',
              },
            ],
            [
              'components.translation-with-arguments.message',
              {
                filePath: 'translations/en-us.json',
                message:
                  '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              },
            ],
            [
              'components.translation-with-arguments.title',
              {
                filePath: 'translations/en-us.json',
                message: 'Translation with Arguments',
              },
            ],
            [
              'routes.application.title',
              {
                filePath: 'translations/en-us.json',
                message: 'ember-intl',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/en-us.json',
                message: "The app's translations take precedence.",
              },
            ],
            [
              'routes.index.title',
              {
                filePath: 'translations/en-us.json',
                message: 'Welcome to <code>ember-intl</code>',
              },
            ],
          ]),
        ],
      ]),
    }),
  );
});
