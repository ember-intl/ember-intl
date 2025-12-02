import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | no-inconsistent-messages > base case', function () {
  const project: Project = {
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Map(),
  };

  const keys = noInconsistentMessages(project);

  assert.deepStrictEqual(keys, []);
});
