import { assert, test } from '@codemod-utils/tests';

import { noMissingKeys } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-project | no-missing-keys > base case', function () {
  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Map(),
  });

  const keys = noMissingKeys.lint(project);

  assert.deepStrictEqual(keys, []);
});
