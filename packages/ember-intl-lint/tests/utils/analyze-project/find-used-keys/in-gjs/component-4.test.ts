import { assert, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gjs > component (4)', function () {
  const file = [
    `import { service } from '@ember/service';`,
    `import Component from '@glimmer/component';`,
    `import { t, tKey } from 'ember-intl';`,
    ``,
    `export default class Hello extends Component {`,
    `  @service intl;`,
    ``,
    `  <template>`,
    `    {{t "key01"}}`,
    `    {{tKey "key02"}}`,
    ``,
    `    {{if this.someCondition (t "key03") (t "key04")}}`,
    `    {{t (if this.someCondition "key05" "key06")}}`,
    `    {{t (if this.someCondition (tKey "key07") (tKey "key08"))}}`,
    ``,
    `    {{this.intl.t "key09"}}`,
    `    {{if this.someCondition (this.intl.t "key10") (this.intl.t "key11")}}`,
    `    {{this.intl.t (if this.someCondition "key12" "key13")}}`,
    `    {{this.intl.t (if this.someCondition (tKey "key14") (tKey "key15"))}}`,
    `  </template>`,
    `}`,
    ``,
  ].join('\n');

  const keys = inGjsGts(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, [
    'key01',
    'key02',
    'key03',
    'key04',
    'key05',
    'key06',
    'key07',
    'key08',
    'key09',
    'key10',
    'key11',
    'key12',
    'key13',
    'key14',
    'key15',
  ]);
});
