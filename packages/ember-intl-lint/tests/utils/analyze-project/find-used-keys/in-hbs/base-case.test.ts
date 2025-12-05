import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > base case', function () {
  const file = normalizeFile([
    `{{t "key01"}}`,
    `{{t "key02" key1="key03" key2="key04"}}`,
    `{{t "key05" (hash key1="key06" key2="key07")}}`,
    ``,
    `{{t-key "key08"}}`,
    `{{t (t-key "key09")}}`,
    ``,
    `{{intl.t "key10"}}`,
    `{{this.intl.t "key11"}}`,
    `{{this.intl.t (t-key "key12")}}`,
  ]);

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, [
    'key01',
    'key02',
    'key05',
    'key08',
    'key09',
    'key12',
  ]);
});
