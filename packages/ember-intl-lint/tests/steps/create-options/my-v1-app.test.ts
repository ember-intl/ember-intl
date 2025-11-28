import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | create-options > my-v1-app', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
