import { assert, test } from '@codemod-utils/tests';

import { findMissingKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | find-missing-keys > all keys are present', function () {
  const project = {
    availableKeys: new Map([
      ['key01', ['translations/de-de.json']],
      ['key02', ['translations/en-us.json']],
      ['key03', ['translations/de-de.json', 'translations/en-us.json']],
      ['key04', ['translations/de-de.json', 'translations/en-us.json']],
      ['key05', ['translations/en-us.json']],
      ['key06', ['translations/de-de.json']],
      ['key07', ['translations/de-de.json', 'translations/en-us.json']],
    ]),
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

  const keys = findMissingKeys(project);

  assert.deepStrictEqual(keys, []);
});
