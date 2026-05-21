import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v7-v2-addon/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v7-v2-addon.js';

test('index > v7-v2-addon', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
