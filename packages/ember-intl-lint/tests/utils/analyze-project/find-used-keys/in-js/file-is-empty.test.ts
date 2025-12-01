import { assert, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > file is empty', function () {
  const file = '';

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
