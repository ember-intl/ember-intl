import { assert, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > component (4)', function () {
  const file = [
    `import { type Registry as Services, service } from '@ember/service';`,
    `import Component from '@glimmer/component';`,
    `import { t as s, tKey as t } from 'ember-intl';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `export default class Hello extends Component<HelloSignature> {`,
    `  @service('intl') declare x: Services['intl'];`,
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
  ].join('\n');

  const keys = inGjsGts(file, {
    isTypeScript: true,
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
