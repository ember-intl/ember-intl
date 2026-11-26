import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > dependencies (2)', function () {
  const file = normalizeFile([
    `import { t } from 'ember-intl';`,
    `import translate from 'my-app/utils/translate';`,
    `import { tKey as key } from 'my-app/utils/intl';`,
    ``,
    `const value = key('key03');`,
    ``,
    `<template>`,
    `  {{t "key01"}}`,
    `  {{translate "key02"}}`,
    `</template>`,
    ``,
  ]);

  const dependencies = {
    t: [
      { importName: 't', importPath: 'ember-intl' },
      { importName: 'default', importPath: 'my-app/utils/translate' },
    ],
    tKey: [{ importName: 'tKey', importPath: 'my-app/utils/intl' }],
  };

  assert.deepStrictEqual(inGjsGts(file, dependencies), [
    'key01',
    'key02',
    'key03',
  ]);
});
