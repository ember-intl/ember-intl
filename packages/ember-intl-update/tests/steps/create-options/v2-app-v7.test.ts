import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/v2-app-v7.js';

test('steps | create-options > v2-app-v7', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
