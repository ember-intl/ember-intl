import { assert, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gjs > file is empty', function () {
  const file = '';

  const keys = inGjsGts(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
