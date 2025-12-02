import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is plural (1)', function () {
  const message =
    'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.';

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(),
    date: new Set(),
    number: new Set(),
    plural: new Set(['numPhotos']),
    select: new Set(),
    time: new Set(),
  });
});
