import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-inconsistent-messages > some keys are missing (2)', function () {
  const translations = new Map([
    [
      'de-de',
      new Map([
        [
          'key01',
          {
            filePath: 'node_modules/my-v1-addon/translations/de-de.json',
            message: 'Hallo!',
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
            filePath: 'node_modules/my-v1-addon/translations/en-us.json',
            message: 'Hello!',
          },
        ],
        [
          'key02',
          {
            filePath: 'node_modules/my-v2-addon/translations/en-us.json',
            message: 'Hello, {name}!',
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
        'translations/es-es.json',
        {
          isInternal: true,
          locale: 'es-es',
          translationsDir: 'translations',
        },
      ],
      [
        'node_modules/my-v1-addon/translations/de-de.json',
        {
          isInternal: false,
          locale: 'de-de',
          translationsDir: 'node_modules/my-v1-addon/translations',
        },
      ],
      [
        'node_modules/my-v1-addon/translations/en-us.json',
        {
          isInternal: false,
          locale: 'en-us',
          translationsDir: 'node_modules/my-v1-addon/translations',
        },
      ],
      [
        'node_modules/my-v2-addon/translations/de-de.json',
        {
          isInternal: false,
          locale: 'de-de',
          translationsDir: 'node_modules/my-v2-addon/translations',
        },
      ],
      [
        'node_modules/my-v2-addon/translations/en-us.json',
        {
          isInternal: false,
          locale: 'en-us',
          translationsDir: 'node_modules/my-v2-addon/translations',
        },
      ],
    ]),
    translations,
    usedKeys: new Set(),
  });

  const lintErrors = noInconsistentMessages(project, {}, options);

  assert.deepStrictEqual(lintErrors, ['key01', 'key02']);
});
