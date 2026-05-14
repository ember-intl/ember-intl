import { assert, test } from '@codemod-utils/tests';

import { getTargetVersion } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-target-version > base case (2)', function () {
  assert.strictEqual(getTargetVersion('6.5.6'), 7);
  assert.strictEqual(getTargetVersion('~6.5.6'), 7);
});
