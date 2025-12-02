import { assert, test } from '@codemod-utils/tests';

import { noMissingKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | no-missing-keys > base case', function () {
  const project = {
    availableKeys: new Map(),
    usedKeys: new Map(),
  };

  const keys = noMissingKeys(project);

  assert.deepStrictEqual(keys, []);
});
