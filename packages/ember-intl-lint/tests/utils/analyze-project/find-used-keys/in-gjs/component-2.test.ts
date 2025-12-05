import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gjs > component (2)', function () {
  const file = normalizeFile([
    `const Hello = <template></template>;`,
    ``,
    `export default Hello;`,
    ``,
  ]);

  const keys = inGjsGts(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, []);
});
