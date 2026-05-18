import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/v1-app-v6/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/v1-app-v6.js';

test('steps | create-options > v1-app-v6', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
