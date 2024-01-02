// @ts-expect-error: Could not find a declaration file
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | extract-icu-arguments > value is an empty string', function () {
  const output = extractICUArguments('');

  assert.deepStrictEqual(output, []);
});
