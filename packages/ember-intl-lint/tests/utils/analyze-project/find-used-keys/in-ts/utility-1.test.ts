import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > utility (1)', function () {
  const file = normalizeFile([
    `import { type Registry as Services, service } from '@ember/service';`,
    `import { tKey } from 'ember-intl';`,
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
    `  { id: '1', translationKey: tKey('key03') },`,
    `  { id: '2', translationKey: tKey('key04') },`,
    `];`,
    ``,
    `export const mapping01 = {`,
    `  key1: 'key05',`,
    `  key2: 'key06',`,
    `} as const;`,
    ``,
    `export const mapping02 = {`,
    `  key1: tKey('key07'),`,
    `  key2: tKey('key08'),`,
    `} as const;`,
    ``,
    `export function callback01(intl: Services['intl']): string {`,
    `  return intl.t('key08');`,
    `}`,
    ``,
    `export function callback02(intl: Services['intl']): string {`,
    `  return intl.t(tKey('key10'));`,
    `}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, ['key03', 'key04', 'key07', 'key08', 'key10']);
});
