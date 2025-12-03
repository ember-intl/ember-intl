import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { noUnusedKeys } from '../../../../src/utils/lint-project/index.js';
import { stubMapping, stubTranslationFiles } from '../../../helpers/index.js';

test('utils | lint-project | no-unused-keys > some keys are unused', function () {
  const project: Project = {
    availableKeys: new Map([
      ['key01', stubMapping('Hello!', ['translations/de-de.json'])],
      [
        'key02',
        stubMapping('{timestamp, date, long}', ['translations/en-us.json']),
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
    ]),
  };

  const keys = noUnusedKeys(project);

  assert.deepStrictEqual(keys, [
    'key01\n  - Found in translations/de-de.json',
    'key02\n  - Found in translations/en-us.json',
  ]);
});
