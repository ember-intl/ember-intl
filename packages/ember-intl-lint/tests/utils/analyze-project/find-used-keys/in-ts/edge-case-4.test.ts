import { assert, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > edge case (4)', function () {
  const file = [
    `import { type Registry as Services, service } from '@ember/service';`,
    `import { tKey as t } from 'ember-intl';`,
    ``,
    `type ListItem = {`,
    `  id: string;`,
    `  translationKey: string;`,
    `};`,
    ``,
    `export const list01: ListItem[] = [`,
    `  { id: '1', translationKey: 'key01' },`,
    `  { id: '2', translationKey: 'key02' },`,
    `];`,
    ``,
    `export const list02: ListItem[] = [`,
    `  { id: '1', translationKey: t('key03') },`,
    `  { id: '2', translationKey: t('key04') },`,
    `];`,
    ``,
    `export const mapping01 = {`,
    `  key1: 'key05',`,
    `  key2: 'key06',`,
    `} as const;`,
    ``,
    `export const mapping02 = {`,
    `  key1: t('key07'),`,
    `  key2: t('key08'),`,
    `} as const;`,
    ``,
    `export const mapping1 = {`,
    `  key1: 'key05',`,
    `  key2: 'key06',`,
    `} as const;`,
    ``,
    `export const mapping2 = {`,
    `  key1: t('key07'),`,
    `  key2: t('key08'),`,
    `} as const;`,
    ``,
    `export function callback1(intl: Services['intl']): string {`,
    `  return intl.t('key09');`,
    `}`,
    ``,
    `export function callback2(intl: Services['intl']): string {`,
    `  return intl.t(t('key10'));`,
    `}`,
    ``,
  ].join('\n');

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, ['key03', 'key04', 'key07', 'key08', 'key10']);
});
