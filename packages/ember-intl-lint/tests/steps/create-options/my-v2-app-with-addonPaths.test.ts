import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-addonPaths/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('steps | create-options > my-v2-app-with-addonPaths', async function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(await createOptions(codemodOptions), options);
});
