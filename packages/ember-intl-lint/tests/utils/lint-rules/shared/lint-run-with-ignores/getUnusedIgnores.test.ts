import { assert, test } from '@codemod-utils/tests';

import { LintRunWithIgnores } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | lint-run-with-ignores > getUnusedIgnores', function () {
  const lintRun = new LintRunWithIgnores({
    lintRule: 'no-unused-keys',
  });

  assert.deepStrictEqual(lintRun.getUnusedIgnores(), []);

  lintRun.record({
    ignore: 'key01',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getUnusedIgnores(), []);

  lintRun.record({
    ignore: 'key02',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getUnusedIgnores(), []);

  lintRun.record({
    ignore: 'key03',
    lintError: 'key03',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getUnusedIgnores(), []);

  lintRun.record({
    ignore: 'key04',
    lintError: 'key04 (some description)',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getUnusedIgnores(), []);
});
