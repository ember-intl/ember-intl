import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noMissingKeys } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubTranslationFiles,
} from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-missing-keys > some keys are missing', function () {
  const translations = new Map([
    [
      'de-de',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/de-de.json',
            message: 'Hello!',
          },
        ],
        [
          'key06',
          {
            filePath: 'node_modules/my-v1-addon/translations/de-de.json',
            message: 'It is now {timestamp, time, short}.',
          },
        ],
        [
          'key07',
          {
            filePath: 'node_modules/my-v2-addon/translations/de-de.json',
            message:
              '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}',
          },
        ],
      ]),
    ],
    [
      'en-us',
      new Map([
        [
          'key02',
          {
            filePath: 'translations/en-us.json',
            message: '{timestamp, date, long}',
          },
        ],
        [
          'key07',
          {
            filePath: 'node_modules/my-v2-addon/translations/en-us.json',
            message:
              '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}',
          },
        ],
      ]),
    ],
  ]);

  const project = normalizeProject({
    availableKeys: findAvailableKeys(translations),
    translationFiles: stubTranslationFiles(),
    translations,
    usedKeys: new Set(['key03', 'key04', 'key05', 'key06']),
  });

  const lintErrors = noMissingKeys(project, {}, options);

  assert.deepStrictEqual(lintErrors, ['key03', 'key04', 'key05']);
});
