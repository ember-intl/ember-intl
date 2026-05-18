import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v2-app-v7/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v2-app-v7.js';

test('index > v2-app-v7', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
