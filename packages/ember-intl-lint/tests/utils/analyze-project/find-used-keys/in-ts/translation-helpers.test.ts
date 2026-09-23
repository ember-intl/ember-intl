import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > translation helpers', function () {
  const file = normalizeFile([
    `import { t as translate } from 'my-app/intl.ts';`,
    ``,
    `export function label(): string {`,
    `  return translate('key01');`,
    `}`,
    ``,
  ]);

  assert.deepStrictEqual(inJsTs(file), []);

  const keys = inJsTs(file, [
    { export: 't', kind: 't', source: 'my-app/intl.ts' },
  ]);

  assert.deepStrictEqual(keys, ['key01']);
});
