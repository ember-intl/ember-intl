import { assert, test } from '@codemod-utils/tests';

import type { IcuArguments } from '../../../../src/types/index.js';
import { compareIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | compare-icu-arguments > arguments do not match (2)', function () {
  const a: IcuArguments = {
    argument: new Set(),
    date: new Set(),
    number: new Set(['e', 'f', 'g']),
    plural: new Set(),
    select: new Set(),
    time: new Set(['m', 'n', 'o', 'p']),
  };

  const b: IcuArguments = {
    argument: new Set(),
    date: new Set(),
    number: new Set(['e', 'h', 'f']),
    plural: new Set(),
    select: new Set(),
    time: new Set(['l', 'm', 'n', 'o']),
  };

  assert.strictEqual(compareIcuArguments(a, b), false);
});
