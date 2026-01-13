import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | get-resolve-module-ids > base case (1)', function () {
  const moduleTracker = new ModuleTracker();

  assert.deepStrictEqual(moduleTracker.getResolvedModuleIds(), []);
});
