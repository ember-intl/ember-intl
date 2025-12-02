import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > base case', function () {
  const message = '';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  });
});
