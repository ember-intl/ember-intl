import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-dependencies/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-dependencies.js';

test('steps | analyze-project > my-v2-app-with-dependencies', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    project.usedKeys,
    new Set([
      'routes.index.description',
      'routes.index.label',
      'routes.index.subtitle',
      'routes.index.title',
    ]),
  );
});
