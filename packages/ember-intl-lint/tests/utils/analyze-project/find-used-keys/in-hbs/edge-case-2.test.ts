import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > edge case (2)', function () {
  const file = normalizeFile([
    `{{(tKey)}}`,
    `{{tKey "key01" "key02"}}`,
    ``,
    `{{#let (some-helper) as |t|}}`,
    `  {{t "key03"}}`,
    `{{/let}}`,
    ``,
    `{{#let (some-helper) as |tKey|}}`,
    `  {{tKey "key04"}}`,
    `{{/let}}`,
  ]);

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, ['key03']);
});
