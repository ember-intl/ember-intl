import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > dependencies (1)', function () {
  const file = normalizeFile([
    `import { t, tKey } from 'ember-intl';`,
    `import { t as appT } from 'my-app/utils/intl';`,
    ``,
    `t('key01');`,
    `appT('key02');`,
    `tKey('key03');`,
    ``,
  ]);

  const dependencies = {
    t: [{ importName: 't', importPath: 'my-app/utils/intl' }],
    tKey: [
      { importName: 'tKey', importPath: 'ember-intl' },
      { importName: 'default', importPath: 'ember-intl/helpers/t-key' },
    ],
  };

  assert.deepStrictEqual(inJsTs(file, dependencies), ['key02', 'key03']);
});
