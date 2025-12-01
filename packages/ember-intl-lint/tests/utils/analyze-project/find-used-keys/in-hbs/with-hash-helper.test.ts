import { assert, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > with hash helper', function () {
  const file = [
    `{{#let (hash key1="key01" key2="key02") as |object|}}`,
    `  {{object.key1}}`,
    `  {{object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1="key03" key2="key04") as |object|}}`,
    `  {{t object.key1}}`,
    `  {{t object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1="key05" key2="key06") as |object|}}`,
    `  {{t (t-key object.key1)}}`,
    `  {{t (t-key object.key2)}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t "key07") key2=(t "key08")) as |object|}}`,
    `  {{object.key1}}`,
    `  {{object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t "key09") key2=(t "key10")) as |object|}}`,
    `  {{t object.key1}}`,
    `  {{t object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t "key11") key2=(t "key12")) as |object|}}`,
    `  {{t (t-key object.key1)}}`,
    `  {{t (t-key object.key2)}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t-key "key13") key2=(t-key "key14")) as |object|}}`,
    `  {{object.key1}}`,
    `  {{object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t-key "key15") key2=(t-key "key16")) as |object|}}`,
    `  {{t object.key1}}`,
    `  {{t object.key2}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1=(t-key "key17") key2=(t-key "key18")) as |object|}}`,
    `  {{t (t-key object.key1)}}`,
    `  {{t (t-key object.key2)}}`,
    `{{/let}}`,
  ].join('\n');

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
