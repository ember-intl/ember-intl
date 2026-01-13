import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('steps | analyze-project > my-v2-app-with-fallbacks', function () {
  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/components/en-us.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/de-de.yml',
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
                filePath:
                  'translations/components/translation-with-arguments/en-us.yml',
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
                filePath: 'translations/routes/application/de-de.yml',
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
                filePath: 'translations/routes/application/en-us.yml',
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
                filePath: 'translations/routes/index/de-de.yml',
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
                filePath: 'translations/routes/index/en-us.yml',
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
                filePath: 'translations/routes/index/de-de.yml',
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
          ]),
        ],
      ]),
      translationFiles: new Map([
        [
          'translations/components/component-from-app/de-de.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/component-from-app/en-us.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/de-de.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/en-us.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/translation-with-arguments/de-de.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/translation-with-arguments/en-us.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/application/de-de.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/application/en-us.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/de-de.yml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/en-us.yml',
          {
            format: 'yaml',
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
