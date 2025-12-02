import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is select (1)', function () {
  const message =
    '{gender, select, female {She is} male {He is} other {They are}} cool.}';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(['gender']),
    time: new Set(),
  });
});
