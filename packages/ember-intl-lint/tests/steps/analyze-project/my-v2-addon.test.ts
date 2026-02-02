import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-addon/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-addon.js';

test('steps | analyze-project > my-v2-addon', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.component-from-v2-addon.message',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'translations/components/component-from-v2-addon/de-de.json',
                message: 'Dies ist eine Komponente aus einem v2 Addon.',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'translations/components/component-from-v2-addon/en-us.json',
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
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Sprache',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/components/select-locale/en-us.json',
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
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Deutsch',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/components/select-locale/en-us.json',
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
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Sprache auswählen',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/components/select-locale/en-us.json',
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
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Englisch',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/components/select-locale/en-us.json',
                message: 'English',
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
                filePath: 'translations/routes/index/de-de.json',
                message: 'Das v2 Addons Übersetzungen haben Vorrang.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/routes/index/en-us.json',
                message: "The v2 addon's translations take precedence.",
              },
            ],
          ]),
        ],
      ]),
      translationFiles: new Map([
        [
          'translations/components/component-from-v2-addon/de-de.json',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/component-from-v2-addon/en-us.json',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/select-locale/de-de.json',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/select-locale/en-us.json',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/de-de.json',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/en-us.json',
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
              'components.component-from-v2-addon.message',
              {
                filePath:
                  'translations/components/component-from-v2-addon/de-de.json',
                message: 'Dies ist eine Komponente aus einem v2 Addon.',
              },
            ],
            [
              'components.select-locale.label',
              {
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Sprache',
              },
            ],
            [
              'components.select-locale.option.de-de',
              {
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Deutsch',
              },
            ],
            [
              'components.select-locale.option.default',
              {
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Sprache auswählen',
              },
            ],
            [
              'components.select-locale.option.en-us',
              {
                filePath: 'translations/components/select-locale/de-de.json',
                message: 'Englisch',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/de-de.json',
                message: 'Das v2 Addons Übersetzungen haben Vorrang.',
              },
            ],
          ]),
        ],
        [
          'en-us',
          new Map([
            [
              'components.component-from-v2-addon.message',
              {
                filePath:
                  'translations/components/component-from-v2-addon/en-us.json',
                message: 'This is a component from a v2 addon.',
              },
            ],
            [
              'components.select-locale.label',
              {
                filePath: 'translations/components/select-locale/en-us.json',
                message: 'Language',
              },
            ],
            [
              'components.select-locale.option.de-de',
              {
                filePath: 'translations/components/select-locale/en-us.json',
                message: 'German',
              },
            ],
            [
              'components.select-locale.option.default',
              {
                filePath: 'translations/components/select-locale/en-us.json',
                message: 'Choose your language',
              },
            ],
            [
              'components.select-locale.option.en-us',
              {
                filePath: 'translations/components/select-locale/en-us.json',
                message: 'English',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/en-us.json',
                message: "The v2 addon's translations take precedence.",
              },
            ],
          ]),
        ],
      ]),
      usedKeys: new Set([
        'components.component-from-v2-addon.message',
        'components.select-locale.label',
        'components.select-locale.option.de-de',
        'components.select-locale.option.default',
        'components.select-locale.option.en-us',
      ]),
    }),
  );
});
