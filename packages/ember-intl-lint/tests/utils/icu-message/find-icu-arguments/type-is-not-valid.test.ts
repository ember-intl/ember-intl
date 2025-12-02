import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > type is not valid', function () {
  const message = 'It is now {timestamp, unknownType, short}.';

  assert.throws(
    () => {
      findIcuArguments(message);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to parse \`It is now {timestamp, unknownType, short}.\` (INVALID_ARGUMENT_TYPE)`,
      );

      return true;
    },
  );
});
