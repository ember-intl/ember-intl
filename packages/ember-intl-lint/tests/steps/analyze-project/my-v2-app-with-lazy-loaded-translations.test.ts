import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-lazy-loaded-translations/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-lazy-loaded-translations.js';

test('steps | analyze-project > my-v2-app-with-lazy-loaded-translations', function () {
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
          'components.title',
          new Map([
            [
              'de-de',
              {
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
                filePath: 'public/assets/translations/de-de.json',
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
                filePath: 'public/assets/translations/en-us.json',
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
      translationFiles: new Map([
        [
          'public/assets/translations/de-de.json',
          {
            format: 'json',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'public/assets/translations',
          },
        ],
        [
          'public/assets/translations/en-us.json',
          {
            format: 'json',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'public/assets/translations',
          },
        ],
      ]),
      usedKeys: new Map(),
    }),
  );
});
