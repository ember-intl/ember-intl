import { assert, test } from '@codemod-utils/tests';

import { getTargetVersion } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-target-version > edge case (version is approximate)', function () {
  assert.strictEqual(getTargetVersion('6'), 7);
  assert.strictEqual(getTargetVersion('6.5'), 7);
  assert.strictEqual(getTargetVersion('7.0.0-beta.1'), 8);
});
