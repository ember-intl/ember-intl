import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-v1-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v1-app.js';

test('index > my-app', function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'find-missing-keys': [],
    'find-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'find-missing-keys': [],
    'find-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);
});
