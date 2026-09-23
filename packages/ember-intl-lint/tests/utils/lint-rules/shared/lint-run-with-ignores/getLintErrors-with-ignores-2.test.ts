import { assert, test } from '@codemod-utils/tests';

import { LintRunWithIgnores } from '../../../../../src/utils/lint-rules/shared/index.js';

test('utils | lint-rules | shared | lint-run-with-ignores > getLintErrors with ignores (2)', function () {
  const lintRun = new LintRunWithIgnores({
    ignores: [/^global\./],
    lintRule: 'no-unused-keys',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    key: 'global.01',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    key: 'global.02',
    status: 'pass',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), []);

  lintRun.record({
    key: 'global.03',
    lintError: 'global.03',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['global.03']);

  lintRun.record({
    key: 'global.04',
    lintError: 'global.04',
    status: 'fail',
  });

  assert.deepStrictEqual(lintRun.getLintErrors(), ['global.03', 'global.04']);
});
