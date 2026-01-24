import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-addonPaths/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('steps | analyze-project > my-v2-app-with-addonPaths', function () {
  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Dies ist eine Komponente aus der App.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'This is a component from the app.',
              },
            ],
          ]),
        ],
        [
          'components.component-from-v1-addon.message',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v1-addon/translations/components/component-from-v1-addon/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Dies ist eine Komponente aus einem v1 Addon.',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v1-addon/translations/components/component-from-v1-addon/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'This is a component from a v1 addon.',
              },
            ],
          ]),
        ],
        [
          'components.component-from-v2-addon.message',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/component-from-v2-addon/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Dies ist eine Komponente aus einem v2 Addon.',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/component-from-v2-addon/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'This is a component from a v2 addon.',
              },
            ],
          ]),
        ],
        [
          'components.select-locale.label',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Sprache',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Language',
              },
            ],
          ]),
        ],
        [
          'components.select-locale.option.de-de',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Deutsch',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'German',
              },
            ],
          ]),
        ],
        [
          'components.select-locale.option.default',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Sprache auswählen',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Choose your language',
              },
            ],
          ]),
        ],
        [
          'components.select-locale.option.en-us',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/de-de.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Englisch',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'node_modules/my-v2-addon/translations/components/select-locale/en-us.yml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'English',
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Komponenten',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(['name']),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(['numPhotos']),
                  select: new Set(),
                  time: new Set(),
                },
                message:
                  '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(['name']),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(['numPhotos']),
                  select: new Set(),
                  time: new Set(),
                },
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Übersetzung mit Argumenten',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'ember-intl',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Die Apps Übersetzungen haben Vorrang.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
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
                filePath: 'translations/de-de.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Willkommen bei <code>ember-intl</code>',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/en-us.json',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Welcome to <code>ember-intl</code>',
              },
            ],
          ]),
        ],
      ]),
      locales: ['de-de', 'en-us'],
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
      usedKeys: new Map(),
    }),
  );
});
