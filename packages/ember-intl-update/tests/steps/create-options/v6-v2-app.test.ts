import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/v6-v2-app/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/v6-v2-app.js';

test('steps | create-options > v6-v2-app', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
