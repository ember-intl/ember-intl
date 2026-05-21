import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v6-v1-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v6-v1-app.js';

test('index > v6-v1-app', function () {
  loadFixture(inputProject, codemodOptions);

  runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
