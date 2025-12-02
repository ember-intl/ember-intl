import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > message has multiple arguments', function () {
  const message = [
    'Hello {name}!',
    'It is now {timestamp, date, long}.',
    'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.',
    '{proportion, number, ::percent} of them are new.',
    'It is now {timestamp, time, short}.',
  ].join(' ');

  assert.deepStrictEqual(findIcuArguments(message), {
    argument: new Set(['name']),
    date: new Set(['timestamp']),
    number: new Set(['proportion']),
    plural: new Set(['numPhotos']),
    select: new Set(),
    time: new Set(['timestamp']),
  });
});
