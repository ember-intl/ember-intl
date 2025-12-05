import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > utility (2)', function () {
  const file = normalizeFile([
    `import { action } from '@ember/object';`,
    `import { setOwner } from '@ember/owner';`,
    `import { service } from '@ember/service';`,
    `import { tKey } from 'ember-intl';`,
    ``,
    `export class MyUtility {`,
    `  @service intl;`,
    ``,
    `  constructor(owner, args) {`,
    `    setOwner(this, owner);`,
    ``,
    `    this.args = args;`,
    `  }`,
    ` `,
    `  get getter01() {`,
    `    return this.intl.t('key01');`,
    `  }`,
    ` `,
    `  get getter02() {`,
    `    return this.args.someCondition ? 'key02' : 'key03';`,
    `  }`,
    ` `,
    `  get getter03() {`,
    `    return this.args.someCondition ? tKey('key04') : tKey('key05');`,
    `  }`,
    ``,
    `  @action callback01() {`,
    `    return this.args.someCondition ? this.intl.t('key06') : this.intl.t('key07');`,
    `  }`,
    ``,
    `  @action callback02() {`,
    `    return this.intl.t(this.getter02);`,
    `  }`,
    ``,
    `  @action callback03() {`,
    `    return this.intl.t(this.getter03);`,
    `  }`,
    `}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, ['key01', 'key04', 'key05', 'key06', 'key07']);
});
