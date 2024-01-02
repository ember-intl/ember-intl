// @ts-expect-error: Could not find a declaration file
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | extract-icu-arguments > value is undefined', function () {
  assert.throws(
    () => {
      extractICUArguments();
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `An error occurred (Cannot read properties of undefined (reading 'length')) when extracting ICU arguments for 'undefined'`,
      );

      return true;
    },
  );
});
