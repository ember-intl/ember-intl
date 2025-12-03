import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { noUnusedKeys } from '../../../../src/utils/lint-project/index.js';
import { stubMapping, stubTranslationFiles } from '../../../helpers/index.js';

test('utils | lint-project | no-unused-keys > all keys are used', function () {
  const project: Project = {
    availableKeys: new Map([
      ['key01', stubMapping('Hello!', ['translations/de-de.json'])],
      [
        'key02',
        stubMapping('{timestamp, date, long}', ['translations/en-us.json']),
      ],
      [
        'key03',
        stubMapping('{name}', [
          'translations/de-de.json',
          'translations/en-us.json',
        ]),
      ],
      [
        'key04',
        stubMapping(
          '{itemCount, plural, =0 {You have no items.} one {You have {itemCount, number} item.} other {You have {itemCount, number} items.}}',
          ['translations/de-de.json', 'translations/en-us.json'],
        ),
      ],
      [
        'key05',
        stubMapping('{proportion, number, ::percent}', [
          'node_modules/my-v1-addon/translations/en-us.json',
        ]),
      ],
      [
        'key06',
        stubMapping('It is now {timestamp, time, short}.', [
          'node_modules/my-v1-addon/translations/de-de.json',
        ]),
      ],
      [
        'key07',
        stubMapping(
          '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}',
          [
            'node_modules/my-v2-addon/translations/de-de.json',
            'node_modules/my-v2-addon/translations/en-us.json',
          ],
        ),
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
  };

  const keys = noUnusedKeys(project);

  assert.deepStrictEqual(keys, []);
});
