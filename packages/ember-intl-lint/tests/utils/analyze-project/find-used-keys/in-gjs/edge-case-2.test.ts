import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gjs > component (4)', function () {
  const file = normalizeFile([
    `import { service } from '@ember/service';`,
    `import Component from '@glimmer/component';`,
    `import { t as s, tKey as t } from 'ember-intl';`,
    ``,
    `export default class Hello extends Component {`,
    `  @service('intl') x;`,
    ``,
    `  <template>`,
    `    {{s "key01"}}`,
    `    {{t "key02"}}`,
    ``,
    `    {{if this.someCondition (s "key03") (s "key04")}}`,
    `    {{s (if this.someCondition "key05" "key06")}}`,
    `    {{s (if this.someCondition (t "key07") (t "key08"))}}`,
    ``,
    `    {{this.x.t "key09"}}`,
    `    {{if this.someCondition (this.x.t "key10") (this.x.t "key11")}}`,
    `    {{this.x.t (if this.someCondition "key12" "key13")}}`,
    `    {{this.x.t (if this.someCondition (t "key14") (t "key15"))}}`,
    `  </template>`,
    `}`,
    ``,
  ]);

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
