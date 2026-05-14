import { assert, test } from '@codemod-utils/tests';

import { getTargetVersion } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-target-version > edge case (version is incomplete)', function () {
  assert.strictEqual(getTargetVersion(undefined), undefined);
  assert.strictEqual(getTargetVersion(''), undefined);
});
