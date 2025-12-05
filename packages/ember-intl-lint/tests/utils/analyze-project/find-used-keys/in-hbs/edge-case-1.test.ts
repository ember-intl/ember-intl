import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > edge case (1)', function () {
  const file = normalizeFile([
    `{{(t)}}`,
    `{{t "key01" "key02"}}`,
    `{{t false}}`,
    `{{t true}}`,
    `{{t null}}`,
    `{{t undefined}}`,
    `{{t 0}}`,
    `{{t (array)}}`,
    `{{t (hash)}}`,
    ``,
    `{{(t-key)}}`,
    `{{t-key "key03" "key04"}}`,
    `{{t-key false}}`,
    `{{t-key true}}`,
    `{{t-key null}}`,
    `{{t-key undefined}}`,
    `{{t-key 0}}`,
    `{{t-key (array)}}`,
    `{{t-key (hash)}}`,
  ]);

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, ['key01', 'key03']);
});
