import { assert, test } from '@codemod-utils/tests';

import { getConfig } from '../../../../src/utils/create-options/index.js';

test('utils | create-options | get-config > config has unknown build options', function () {
  const userConfig = {
    buildOptions: {
      'unknown-option-1': false,
      'unknown-option-2': 'some-value',
    },
  };

  assert.throws(
    () => {
      // @ts-expect-error: Incorrect type
      getConfig(userConfig);
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        `ERROR: Unable to read the config file. (unknown build option: unknown-option-1)`,
      );

      return true;
    },
  );
});
