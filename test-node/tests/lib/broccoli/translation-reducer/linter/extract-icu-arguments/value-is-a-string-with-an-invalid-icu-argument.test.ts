// @ts-expect-error: Could not find a declaration file
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | extract-icu-arguments > value is a string with an invalid ICU argument', function () {
  assert.throws(
    () => {
      extractICUArguments('It is now {timestamp, unknownType, short}.');
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `An error occurred (INVALID_ARGUMENT_TYPE) when extracting ICU arguments for 'It is now {timestamp, unknownType, short}.'`,
      );

      return true;
    },
  );
});
