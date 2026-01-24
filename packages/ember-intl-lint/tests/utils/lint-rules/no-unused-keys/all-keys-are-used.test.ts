import { assert, test } from '@codemod-utils/tests';

import { noUnusedKeys } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubMapping,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-rules | no-unused-keys > all keys are used', function () {
  const project = normalizeProject({
    availableKeys: new Map([
      [
        'key01',
        stubMapping({
          message: 'Hello!',
          translationFilePaths: ['translations/de-de.json'],
        }),
      ],
      [
        'key02',
        stubMapping({
          message: '{timestamp, date, long}',
          translationFilePaths: ['translations/en-us.json'],
        }),
      ],
      [
        'key03',
        stubMapping({
          message: '{name}',
          translationFilePaths: [
            'translations/de-de.json',
            'translations/en-us.json',
          ],
        }),
      ],
      [
        'key04',
        stubMapping({
          message:
            '{itemCount, plural, =0 {You have no items.} one {You have {itemCount, number} item.} other {You have {itemCount, number} items.}}',
          translationFilePaths: [
            'translations/de-de.json',
            'translations/en-us.json',
          ],
        }),
      ],
      [
        'key05',
        stubMapping({
          message: '{proportion, number, ::percent}',
          translationFilePaths: [
            'node_modules/my-v1-addon/translations/en-us.json',
          ],
        }),
      ],
      [
        'key06',
        stubMapping({
          message: 'It is now {timestamp, time, short}.',
          translationFilePaths: [
            'node_modules/my-v1-addon/translations/de-de.json',
          ],
        }),
      ],
      [
        'key07',
        stubMapping({
          message:
            '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}',
          translationFilePaths: [
            'node_modules/my-v2-addon/translations/de-de.json',
            'node_modules/my-v2-addon/translations/en-us.json',
          ],
        }),
      ],
    ]),
    translationFiles: stubTranslationFiles(),
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

  const lintErrors = noUnusedKeys(project);

  assert.deepStrictEqual(lintErrors, []);
});
