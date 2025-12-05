import { assert, test } from '@codemod-utils/tests';

import { noUnusedKeys } from '../../../../src/utils/lint-project/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-project | no-unused-keys > base case', function () {
  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Map(),
  });

  const keys = noUnusedKeys(project);

  assert.deepStrictEqual(keys, []);
});
