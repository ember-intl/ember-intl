import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > edge case (2)', function () {
  const message = undefined;

  assert.throws(
    () => {
      // @ts-expect-error: Incorrect type
      findIcuArguments(message);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to parse \`undefined\` (Cannot read properties of undefined (reading 'length'))`,
      );

      return true;
    },
  );
});
