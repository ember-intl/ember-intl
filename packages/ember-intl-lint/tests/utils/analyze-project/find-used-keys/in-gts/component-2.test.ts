import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > component (2)', function () {
  const file = normalizeFile([
    `import type { TOC } from '@ember/component/template-only';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `const Hello: TOC<HelloSignature> = <template></template>;`,
    ``,
    `export default Hello;`,
    ``,
  ]);

  const keys = inGjsGts(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, []);
});
