import { assert, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > file is empty', function () {
  const file = '';

  const keys = inJsTs(file);

  assert.deepStrictEqual(keys, []);
});
