import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > dependencies (3)', function () {
  const file = normalizeFile([
    `import { t as translate } from 'ember-intl';`,
    `import t from 'ember-intl/helpers/t';`,
    `import tKey from 'ember-intl/helpers/t-key';`,
    ``,
    `const key = tKey('key03');`,
    ``,
    `<template>`,
    `  {{t "key01"}}`,
    `  {{translate "key02"}}`,
    `</template>`,
    ``,
  ]);

  assert.deepStrictEqual(inGjsGts(file), ['key01', 'key02', 'key03']);
});
