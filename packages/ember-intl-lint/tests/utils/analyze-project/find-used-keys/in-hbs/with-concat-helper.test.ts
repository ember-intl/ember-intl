import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > with concat helper', function () {
  const file = normalizeFile([
    `{{concat "key01" "key02"}}`,
    ``,
    `{{concat (t "key03") (t "key04")}}`,
    ``,
    `{{concat (t-key "key05") (t-key "key06")}}`,
    ``,
    `{{t (concat "key07" "key08")}}`,
    ``,
    `{{t (concat this.someProperty "key10")}}`,
    ``,
    `{{t (t-key (concat "key11" "key12"))}}`,
    ``,
    `{{t (t-key (concat this.someProperty "key14"))}}`,
  ]);

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, ['key03', 'key04', 'key05', 'key06']);
});
