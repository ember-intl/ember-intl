import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-fix/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app-fix.js';

test('steps | create-options > my-v2-app-fix', async function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(await createOptions(codemodOptions), options);
});
