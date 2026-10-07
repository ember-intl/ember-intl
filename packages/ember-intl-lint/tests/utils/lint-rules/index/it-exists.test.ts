import { assert, test } from '@codemod-utils/tests';

import { lintRuleMapping } from '../../../../src/utils/lint-rules.js';

test('utils | lint-rules > it exists', function () {
  assert.ok(lintRuleMapping);
});
