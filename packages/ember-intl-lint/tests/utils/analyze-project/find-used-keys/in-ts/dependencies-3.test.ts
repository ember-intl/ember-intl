import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > dependencies (3)', function () {
  const file = normalizeFile([
    `import { t as translate } from 'ember-intl';`,
    `import t from 'ember-intl/helpers/t';`,
    `import tKey from 'ember-intl/helpers/t-key';`,
    ``,
    `t('key01');`,
    `translate('key02');`,
    `tKey('key03');`,
    ``,
  ]);

  assert.deepStrictEqual(inJsTs(file), ['key01', 'key02', 'key03']);
});
