import { assert, test } from '@codemod-utils/tests';

import { inJson } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-json > file is empty', function () {
  const file = '';

  const keys = inJson(file);

  assert.deepStrictEqual(keys, []);
});
