import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-addon/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-addon.js';

test('steps | analyze-project > my-v1-addon', function () {
  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.component-from-v1-addon.message',
          new Map([
            [
              'de-de',
              {
                filePath:
                  'translations/components/component-from-v1-addon/de-de.yaml',
                message: 'Dies ist eine Komponente aus einem v1 Addon.',
              },
            ],
            [
              'en-us',
              {
                filePath:
                  'translations/components/component-from-v1-addon/en-us.yaml',
                message: 'This is a component from a v1 addon.',
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
                filePath: 'translations/routes/index/de-de.yaml',
                message: 'Das v1 Addons Übersetzungen haben Vorrang.',
              },
            ],
            [
              'en-us',
              {
                filePath: 'translations/routes/index/en-us.yaml',
                message: "The v1 addon's translations take precedence.",
              },
            ],
          ]),
        ],
      ]),
      translationFiles: new Map([
        [
          'translations/components/component-from-v1-addon/de-de.yaml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/components/component-from-v1-addon/en-us.yaml',
          {
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/de-de.yaml',
          {
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/routes/index/en-us.yaml',
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
              'components.component-from-v1-addon.message',
              {
                filePath:
                  'translations/components/component-from-v1-addon/de-de.yaml',
                message: 'Dies ist eine Komponente aus einem v1 Addon.',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/de-de.yaml',
                message: 'Das v1 Addons Übersetzungen haben Vorrang.',
              },
            ],
          ]),
        ],
        [
          'en-us',
          new Map([
            [
              'components.component-from-v1-addon.message',
              {
                filePath:
                  'translations/components/component-from-v1-addon/en-us.yaml',
                message: 'This is a component from a v1 addon.',
              },
            ],
            [
              'routes.index.key-to-overwrite',
              {
                filePath: 'translations/routes/index/en-us.yaml',
                message: "The v1 addon's translations take precedence.",
              },
            ],
          ]),
        ],
      ]),
      usedKeys: new Set(['components.component-from-v1-addon.message']),
    }),
  );
});
