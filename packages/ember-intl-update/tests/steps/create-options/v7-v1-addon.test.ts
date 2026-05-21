import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/v7-v1-addon/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/v7-v1-addon.js';

test('steps | create-options > v7-v1-addon', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
