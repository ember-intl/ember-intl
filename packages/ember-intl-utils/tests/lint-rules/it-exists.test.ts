import { assert, test } from '@codemod-utils/tests';

import { lintRules } from '../../src/lint-rules.js';

test('src | lint-rules > it exists', function () {
  assert.deepStrictEqual(lintRules, [
    'no-inconsistent-messages',
    'no-missing-keys',
    'no-unused-keys',
  ]);
});
