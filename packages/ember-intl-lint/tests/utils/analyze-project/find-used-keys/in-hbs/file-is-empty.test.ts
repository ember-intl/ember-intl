import { assert, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > file is empty', function () {
  const file = '';

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, []);
});
