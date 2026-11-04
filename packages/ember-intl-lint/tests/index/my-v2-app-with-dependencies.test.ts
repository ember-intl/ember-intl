import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../fixtures/my-v2-app-with-dependencies/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-app-with-dependencies.js';

test('index > my-v2-app-with-dependencies', async function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': ['routes.index.subtitle'],
    'no-unused-keys': ['routes.index.key-from-ember-intl'],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': ['routes.index.subtitle'],
    'no-unused-keys': ['routes.index.key-from-ember-intl'],
  });

  assertFixture(outputProject, codemodOptions);
});
