import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > component (1)', function () {
  const file = normalizeFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `const Hello = templateOnlyComponent<HelloSignature>();`,
    ``,
    `export default Hello;`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, []);
});
