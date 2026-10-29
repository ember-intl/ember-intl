import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > dependencies', function () {
  const file = normalizeFile([
    `import { t } from 'ember-intl';`,
    `import { t as appT } from 'my-app/utils/intl';`,
    ``,
    `<template>`,
    `  {{t "key01"}}`,
    `  {{appT "key02"}}`,
    `</template>`,
    ``,
  ]);

  assert.deepStrictEqual(inGjsGts(file), ['key01']);

  const keys = inGjsGts(file, [
    { importName: 't', importPath: 'my-app/utils/intl' },
  ]);

  assert.deepStrictEqual(keys, ['key01', 'key02']);
});
