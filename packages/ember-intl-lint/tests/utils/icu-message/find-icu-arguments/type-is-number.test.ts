import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is number', function () {
  const message = '{proportion, number, ::percent} of them are new.';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(['proportion']),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  });
});
