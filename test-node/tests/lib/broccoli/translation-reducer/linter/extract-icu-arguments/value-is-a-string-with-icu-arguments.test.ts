// @ts-expect-error: Could not find a declaration file
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | extract-icu-arguments > value is a string with ICU arguments', function () {
  // Type: argument
  assert.deepStrictEqual(extractICUArguments('Hello {name}!'), ['name']);

  // Type: date
  assert.deepStrictEqual(
    extractICUArguments('It is now {timestamp, date, long}.'),
    ['timestamp'],
  );

  // Type: plural
  assert.deepStrictEqual(
    extractICUArguments(
      'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.',
    ),
    ['numPhotos'],
  );

  // Type: select
  assert.deepStrictEqual(
    extractICUArguments(
      '{gender, select, female {She is} male {He is} other {They are}} cool.}',
    ),
    ['gender'],
  );

  // Type: time
  assert.deepStrictEqual(
    extractICUArguments('It is now {timestamp, time, short}.'),
    ['timestamp'],
  );
});
