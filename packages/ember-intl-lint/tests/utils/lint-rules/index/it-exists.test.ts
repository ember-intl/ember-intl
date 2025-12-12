import { assert, test } from '@codemod-utils/tests';

import {
  lintRuleMapping,
  lintRules,
} from '../../../../src/utils/lint-rules.js';

test('utils | lint-rules > it exists', function () {
  assert.ok(lintRuleMapping);
  assert.ok(lintRules);
});
