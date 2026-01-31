import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-inconsistent-messages > locale grouping', function () {
  const translations = new Map([
    [
      'de-de',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/de-de.json',
            message: 'Hallo, {name}!',
          },
        ],
      ]),
    ],
    [
      'en-us',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/en-us.json',
            message: 'Hello!',
          },
        ],
      ]),
    ],
    [
      'fr-fr',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/fr-fr.json',
            message: 'Bonjour, {name}!',
          },
        ],
      ]),
    ],
  ]);

  const project = normalizeProject({
    availableKeys: findAvailableKeys(translations),
    translationFiles: new Map([
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
      [
        'translations/fr-fr.json',
        {
          isInternal: true,
          locale: 'fr-fr',
          translationsDir: 'translations',
        },
      ],
    ]),
    translations,
    usedKeys: new Set(),
  });

  const lintErrors = noInconsistentMessages(project, {}, options);

  // de-de and fr-fr both use {name}, en-us does not
  assert.deepStrictEqual(lintErrors, ['key01 (de-de, fr-fr ≠ en-us)']);
});
