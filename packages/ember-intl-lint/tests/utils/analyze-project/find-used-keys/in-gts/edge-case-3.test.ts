import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inGjsGts } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-gts > edge case (3)', function () {
  const file = normalizeFile([
    `import {`,
    `  inject as service,`,
    `  type Registry as Services,`,
    `} from '@ember/service';`,
    `import Component from '@glimmer/component';`,
    ``,
    `interface HelloSignature {`,
    `  Args: {};`,
    `}`,
    ``,
    `export default class Hello extends Component<HelloSignature> {`,
    `  @service() declare intl: Services['intl'];`,
    ``,
    `  get getter01(): string {`,
    `    return this.intl.t('key01');`,
    `  }`,
    ``,
    `  get getter03(): string {`,
    `    return this.someCondition ? this.intl.t('key03') : this.intl.t('key04');`,
    `  }`,
    ``,
    `  <template></template>`,
    `}`,
    ``,
  ]);

  const keys = inGjsGts(file);

  assert.deepStrictEqual(keys, ['key01', 'key03', 'key04']);
});
