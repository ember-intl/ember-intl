import { assert, test } from '@codemod-utils/tests';

import { noUnusedKeys } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-project | no-unused-keys > base case', function () {
  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Map(),
  });

  const failed = noUnusedKeys({ project });
  const keys = failed.map(({ key }) => key);

  assert.deepStrictEqual(keys, []);
});
