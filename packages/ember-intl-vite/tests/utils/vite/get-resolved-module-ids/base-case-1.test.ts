import { assert, test } from '@codemod-utils/tests';

import { getResolvedModuleIds } from '../../../../src/utils/vite.js';

test('utils | vite | get-resolve-module-ids > base case (1)', function () {
  assert.deepStrictEqual(getResolvedModuleIds(), []);
}).ignore();
