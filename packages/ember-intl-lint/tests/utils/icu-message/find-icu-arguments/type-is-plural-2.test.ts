import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is plural (2)', function () {
  const message =
    '{itemCount, plural, =0 {You have no items.} one {You have {itemCount, number} item.} other {You have {itemCount, number} items.}}';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(['itemCount']),
    plural: new Set(['itemCount']),
    select: new Set(),
    time: new Set(),
  });
});
