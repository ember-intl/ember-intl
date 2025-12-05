import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > component (2)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `export default class Hello extends Component<HelloSignature> {}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, []);
});
