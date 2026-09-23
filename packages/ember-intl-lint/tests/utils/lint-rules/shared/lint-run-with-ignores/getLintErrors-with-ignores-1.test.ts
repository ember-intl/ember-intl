import { assert, test } from '@codemod-utils/tests';

import { LintRunWithIgnores } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | lint-run-with-ignores > getLintErrors with ignores (1)', function () {
  const lintRun = new LintRunWithIgnores({
    ignores: ['key02', 'key04'],
    lintRule: 'no-unused-keys',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    ignore: 'key01',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    ignore: 'key02',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    ignore: 'key03',
    lintError: 'key03',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['key03']);

  lintRun.record({
    ignore: 'key04',
    lintError: 'key04',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['key03']);
});
