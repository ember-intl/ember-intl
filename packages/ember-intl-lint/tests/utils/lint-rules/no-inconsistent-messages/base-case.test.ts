import { assert, test } from '@codemod-utils/tests';

import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-rules | no-inconsistent-messages > base case', function () {
  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Set(),
  });

  const lintErrors = noInconsistentMessages(project);

  assert.deepStrictEqual(lintErrors, []);
});
