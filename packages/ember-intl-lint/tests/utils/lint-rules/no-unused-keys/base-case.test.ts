import { assert, test } from '@codemod-utils/tests';

import { noUnusedKeys } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-rules | no-unused-keys > base case', function () {
  const project = normalizeProject({
    availableKeys: new Map(),
    locales: [],
    translationFiles: new Map(),
    usedKeys: new Map(),
  });

  const lintErrors = noUnusedKeys(project);

  assert.deepStrictEqual(lintErrors, []);
});
