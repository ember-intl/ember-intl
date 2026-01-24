import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noMissingKeys } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-rules | no-missing-keys > all keys are present', function () {
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
          'key03',
          {
            filePath: 'translations/de-de.json',
            message: '{name}',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/de-de.json',
            message:
              '{itemCount, plural, =0 {You have no items.} one {You have {itemCount, number} item.} other {You have {itemCount, number} items.}}',
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
          'key03',
          {
            filePath: 'translations/en-us.json',
            message: '{name}',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/en-us.json',
            message:
              '{itemCount, plural, =0 {You have no items.} one {You have {itemCount, number} item.} other {You have {itemCount, number} items.}}',
          },
        ],
        [
          'key05',
          {
            filePath: 'node_modules/my-v1-addon/translations/en-us.json',
            message: '{proportion, number, ::percent}',
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
    usedKeys: new Set([
      'key01',
      'key02',
      'key03',
      'key04',
      'key05',
      'key06',
      'key07',
    ]),
  });

  const lintErrors = noMissingKeys(project);

  assert.deepStrictEqual(lintErrors, []);
});
