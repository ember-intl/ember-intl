import { assert, test } from '@codemod-utils/tests';

import { inHbs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-hbs > with get helper', function () {
  const file = [
    `{{#let (hash key1="key01" key2="key02") as |object|}}`,
    `  {{get object "key1"}}`,
    `  {{get object "key2"}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1="key03" key2="key04") as |object|}}`,
    `  {{t (get object "key1")}}`,
    `  {{t (get object "key2")}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key1="key05" key2="key06") as |object|}}`,
    `  {{t (t-key (get object "key1"))}}`,
    `  {{t (t-key (get object "key2"))}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash value1="value07" value2="value08") as |object|}}`,
    `  {{get object (t "key07")}}`,
    `  {{get object (t "key08")}}`,
    `{{/let}}`,
    ``,
    `{{#let (hash key09="value09" key10="value10") as |object|}}`,
    `  {{get object (t-key "key09")}}`,
    `  {{get object (t-key "key10")}}`,
    `{{/let}}`,
  ].join('\n');

  const keys = inHbs(file);

  assert.deepStrictEqual(keys, ['key07', 'key08', 'key09', 'key10']);
});
