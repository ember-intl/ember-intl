import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/v2-app-v7/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/v2-app-v7.js';

test('steps | create-options > v2-app-v7', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
