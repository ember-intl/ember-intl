import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v7-v1-addon/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v7-v1-addon.js';

test('index > v7-v1-addon', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
