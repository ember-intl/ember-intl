import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/index.js';

test('utils | icu-message | find-icu-arguments > edge case (1)', function () {
  const message = null;

  assert.throws(
    () => {
      // @ts-expect-error: Incorrect type
      findIcuArguments(message);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `Unable to parse \`null\` (Cannot read properties of null (reading 'length'))`,
      );

      return true;
    },
  );
});
