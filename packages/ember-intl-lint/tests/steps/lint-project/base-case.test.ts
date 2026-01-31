import { assert, loadFixture, test } from '@codemod-utils/tests';

import { lintProject } from '../../../src/steps/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | lint-project > base case', function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    translations: new Map(),
    usedKeys: new Set(),
  });

  const lintResults = lintProject(project, options);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });
});
