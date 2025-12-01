import { assert, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > utility (1)', function () {
  const file = [
    `import { service } from '@ember/service';`,
    `import { tKey } from 'ember-intl';`,
    ``,
    `export const list01 = [`,
    `  { id: '1', translationKey: 'key01' },`,
    `  { id: '2', translationKey: 'key02' },`,
    `];`,
    ``,
    `export const list02 = [`,
    `  { id: '1', translationKey: tKey('key03') },`,
    `  { id: '2', translationKey: tKey('key04') },`,
    `];`,
    ``,
    `export const mapping01 = {`,
    `  key1: 'key05',`,
    `  key2: 'key06',`,
    `};`,
    ``,
    `export const mapping02 = {`,
    `  key1: tKey('key07'),`,
    `  key2: tKey('key08'),`,
    `};`,
    ``,
    `export function callback01(intl) {`,
    `  return intl.t('key09');`,
    `}`,
    ``,
    `export function callback02(intl) {`,
    `  return intl.t(tKey('key10'));`,
    `}`,
    ``,
  ].join('\n');

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, ['key03', 'key04', 'key07', 'key08', 'key10']);
});
