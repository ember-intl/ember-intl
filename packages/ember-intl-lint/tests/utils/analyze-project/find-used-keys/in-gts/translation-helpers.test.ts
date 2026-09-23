import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > translation helpers', function () {
  const file = normalizeFile([
    `import translate from 'my-app/utils/translate';`,
    `import { t } from 'my-app/utils/intl';`,
    ``,
    `export function label(): string {`,
    `  return t('key01');`,
    `}`,
    ``,
    `<template>`,
    `  {{t "key02"}}`,
    `  {{translate "key03"}}`,
    `  <Hello @title={{t "key04"}} />`,
    `</template>`,
    ``,
  ]);

  assert.deepStrictEqual(inGjsGts(file), []);

  const keys = inGjsGts(file, [
    { export: 't', kind: 't', source: 'my-app/utils/intl' },
    { export: 'default', kind: 'tKey', source: 'my-app/utils/translate' },
  ]);

  assert.deepStrictEqual(keys, ['key01', 'key02', 'key03', 'key04']);
});
