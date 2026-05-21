import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v7-v1-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v7-v1-app.js';

test('index > v7-v1-app', async function () {
  loadFixture(inputProject, codemodOptions);

  const todos = await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  assert.deepEqual(todos, []);
});
