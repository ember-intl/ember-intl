import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > component (2)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    ``,
    `export default class Hello extends Component {}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
