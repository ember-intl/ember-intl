import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > dependencies (2)', function () {
  const file = normalizeFile([
    `import { t } from 'ember-intl';`,
    `import translate from 'my-app/utils/translate';`,
    `import { tKey as key } from 'my-app/utils/intl';`,
    ``,
    `t('key01');`,
    `translate('key02');`,
    `key('key03');`,
    ``,
  ]);

  const dependencies = {
    t: [
      { importName: 't', importPath: 'ember-intl' },
      { importName: 'default', importPath: 'my-app/utils/translate' },
    ],
    tKey: [{ importName: 'tKey', importPath: 'my-app/utils/intl' }],
  };

  assert.deepStrictEqual(inJsTs(file, dependencies), [
    'key01',
    'key02',
    'key03',
  ]);
});
