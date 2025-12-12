import { assert, test } from '@codemod-utils/tests';

import { noMissingKeys } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubMapping,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-project | no-missing-keys > all keys are present', function () {
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
    usedKeys: new Map([
      ['key01', ['app/components/file01.hbs']],
      ['key02', ['app/components/file02.gjs']],
      ['key03', ['app/components/file03.gts']],
      ['key04', ['app/components/file02.gjs', 'app/components/file03.gts']],
      [
        'key05',
        [
          'app/components/file01.hbs',
          'app/components/file02.gjs',
          'app/components/file03.gts',
        ],
      ],
      ['key06', ['app/templates/file01.hbs', 'app/templates/file02.gjs']],
      ['key07', ['app/components/file03.gts', 'app/templates/file03.gts']],
    ]),
  });

  const keys = noMissingKeys.lint(project);

  assert.deepStrictEqual(keys, []);
});
