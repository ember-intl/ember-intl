import { assert, test } from '@codemod-utils/tests';

import { findMissingKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | find-missing-keys > with ignores option', function () {
  const project = {
    availableKeys: new Map([
      ['key01', ['translations/de-de.json']],
      ['key02', ['translations/en-us.json']],
      ['key06', ['translations/de-de.json']],
      ['key07', ['translations/de-de.json', 'translations/en-us.json']],
    ]),
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

  const keys = findMissingKeys(project, {
    ignores: ['key01', 'key03', 'key05', 'key07'],
  });

  assert.deepStrictEqual(keys, [
    'key04\n  - Found in app/components/file02.gjs, app/components/file03.gts',
  ]);
});
