import { assert, test } from '@codemod-utils/tests';

import { LintRunWithIgnores } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | lint-run-with-ignores > getLintErrors with ignores (3)', function () {
  const lintRun = new LintRunWithIgnores({
    ignores: ['key01', /^global\./],
    lintRule: 'no-unused-keys',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    key: 'key01',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    key: 'key02',
    lintError: 'key02',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['key02']);

  lintRun.record({
    key: 'global.03',
    lintError: 'global.03',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['key02']);

  lintRun.record({
    key: 'global04',
    lintError: 'global04',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['key02', 'global04']);
});
