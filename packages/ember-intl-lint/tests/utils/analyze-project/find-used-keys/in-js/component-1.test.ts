import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > component (1)', function () {
  const file = normalizeFile([
    `import templateOnlyComponent from '@ember/component/template-only';`,
    ``,
    `const Hello = templateOnlyComponent();`,
    ``,
    `export default Hello;`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
