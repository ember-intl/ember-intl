import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-addon/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-addon.js';

test('steps | create-options > my-v1-addon', async function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(await createOptions(codemodOptions), options);
});
