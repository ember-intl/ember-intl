import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is date', function () {
  const message = 'It is now {timestamp, date, long}.';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(['timestamp']),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  });
});
