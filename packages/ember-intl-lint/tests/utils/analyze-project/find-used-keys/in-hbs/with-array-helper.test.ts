import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > with array helper', function () {
  const file = normalizeFile([
    `{{#each (array "key1" "key02") as |value|}}`,
    `  {{value}}`,
    `{{/each}}`,
    ``,
    `{{#each (array "key03" "key04") as |key|}}`,
    `  {{t key}}`,
    `{{/each}}`,
    ``,
    `{{#each (array "key05" "key06") as |key|}}`,
    `  {{t (t-key key)}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t "key07") (t "key08")) as |value|}}`,
    `  {{value}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t "key09") (t "key10")) as |value|}}`,
    `  {{t value}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t "key11") (t "key12")) as |value|}}`,
    `  {{t (t-key value)}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t-key "key13") (t-key "key14")) as |key|}}`,
    `  {{key}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t-key "key15") (t-key "key16")) as |key|}}`,
    `  {{t key}}`,
    `{{/each}}`,
    ``,
    `{{#each (array (t-key "key17") (t-key "key18")) as |key|}}`,
    `  {{t (t-key key)}}`,
    `{{/each}}`,
  ]);

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, [
    'key07',
    'key08',
    'key09',
    'key10',
    'key11',
    'key12',
    'key13',
    'key14',
    'key15',
    'key16',
    'key17',
    'key18',
  ]);
});
