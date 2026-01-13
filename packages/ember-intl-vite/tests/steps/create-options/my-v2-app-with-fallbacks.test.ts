import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-fallbacks/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('steps | create-options > my-v2-app-with-fallbacks', async function () {
  loadFixture(inputProject, { projectRoot });

  assert.deepStrictEqual(await createOptions(projectRoot), options);
});
