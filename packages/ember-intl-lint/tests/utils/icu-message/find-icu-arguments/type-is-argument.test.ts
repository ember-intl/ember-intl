import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is argument', function () {
  const message = 'Hello {name}!';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(['name']),
    date: new Set(),
    number: new Set(),
    plural: new Set(),
    select: new Set(),
    time: new Set(),
  });
});
