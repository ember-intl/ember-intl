import { assert, test } from '@codemod-utils/tests';

import { findMissingKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | find-missing-keys > base case', function () {
  const project = {
    availableKeys: new Map(),
    usedKeys: new Map(),
  };

  const keys = findMissingKeys(project);

  assert.deepStrictEqual(keys, []);
});
