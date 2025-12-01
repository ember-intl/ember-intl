import { assert, test } from '@codemod-utils/tests';

import { findUnusedKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | find-unused-keys > base case', function () {
  const project = {
    availableKeys: new Map(),
    usedKeys: new Map(),
  };

  const keys = findUnusedKeys(project);

  assert.deepStrictEqual(keys, []);
});
