import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > translation helpers', function () {
  const file = normalizeFile([
    `import { t } from 'ember-intl';`,
    `import { t as appT, t as translate } from 'my-app/intl.ts';`,
    ``,
    `t('key01');`,
    `appT('key02');`,
    `translate('key03');`,
    ``,
  ]);

  assert.deepStrictEqual(inJsTs(file), ['key01']);

  const keys = inJsTs(file, [
    { importName: 't', importPath: 'my-app/intl.ts' },
  ]);

  assert.deepStrictEqual(keys, ['key01', 'key02', 'key03']);
});
