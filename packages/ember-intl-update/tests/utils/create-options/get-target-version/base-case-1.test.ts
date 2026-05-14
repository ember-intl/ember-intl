import { assert, test } from '@codemod-utils/tests';

import { getTargetVersion } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-target-version > base case (1)', function () {
  assert.strictEqual(getTargetVersion('^5.0.0'), undefined);
  assert.strictEqual(getTargetVersion('^5.7.2'), undefined);
  assert.strictEqual(getTargetVersion('^6.0.0'), 7);
  assert.strictEqual(getTargetVersion('^6.5.6'), 7);
  assert.strictEqual(getTargetVersion('^7.0.0'), 8);
  assert.strictEqual(getTargetVersion('^7.5.0'), 8);
  assert.strictEqual(getTargetVersion('^8.0.0'), undefined);
  assert.strictEqual(getTargetVersion('^9.0.0'), undefined);
});
