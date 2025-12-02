import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { noUnusedKeys } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | no-unused-keys > base case', function () {
  const project: Project = {
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Map(),
  };

  const keys = noUnusedKeys(project);

  assert.deepStrictEqual(keys, []);
});
