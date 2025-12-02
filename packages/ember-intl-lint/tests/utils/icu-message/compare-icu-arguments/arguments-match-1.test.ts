import { assert, test } from '@codemod-utils/tests';

import type { IcuArguments } from '../../../../src/types/index.js';
import { compareIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | compare-icu-arguments > arguments match (1)', function () {
  const a: IcuArguments = {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  };

  const b: IcuArguments = {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  };

  assert.strictEqual(compareIcuArguments(a, b), true);
});
