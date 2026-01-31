import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | analyze-project > base case', function () {
  const inputProject = {};

  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map(),
      translationFiles: new Map(),
      translations: new Map(),
      usedKeys: new Set(),
    }),
  );
});
