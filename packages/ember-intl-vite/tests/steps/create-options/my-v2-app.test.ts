import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | create-options > my-v2-app', async function () {
  loadFixture(inputProject, { projectRoot });

  assert.deepStrictEqual(await createOptions(projectRoot), options);
});
