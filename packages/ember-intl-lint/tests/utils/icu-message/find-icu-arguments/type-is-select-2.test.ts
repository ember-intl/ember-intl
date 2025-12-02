import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is select (2)', function () {
  const message =
    '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(['tax']),
    plural: new Set(),
    select: new Set(['isTaxed']),
    time: new Set(),
  });
});
