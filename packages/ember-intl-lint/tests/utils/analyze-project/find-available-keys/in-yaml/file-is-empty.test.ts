import { assert, test } from '@codemod-utils/tests';

import { inYaml } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-yaml > file is empty', function () {
  const file = '';

  const keys = inYaml(file);

  assert.deepStrictEqual(keys, []);
});
