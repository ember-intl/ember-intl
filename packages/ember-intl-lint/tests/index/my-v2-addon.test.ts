import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-v2-addon/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-addon.js';

test('index > my-v2-addon', async function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);
});
