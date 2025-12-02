import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > message has HTML', function () {
  const message =
    '<a class="{class}" href="{url}" target="_blank">Terms and Conditions</a>';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(['class', 'url']),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  });
});
