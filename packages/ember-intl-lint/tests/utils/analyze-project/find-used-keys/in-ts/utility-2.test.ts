import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > utility (2)', function () {
  const file = normalizeFile([
    `import { action } from '@ember/object';`,
    `import type Owner from '@ember/owner';`,
    `import { setOwner } from '@ember/owner';`,
    `import { type Registry as Services, service } from '@ember/service';`,
    `import { tKey } from 'ember-intl';`,
    ``,
    `interface MyUtilityArgs {`,
    `  someCondition: boolean;`,
    `}`,
    ``,
    `export class MyUtility {`,
    `  @service declare intl: Services['intl'];`,
    ``,
    `  private declare args: MyUtilityArgs;`,
    ``,
    `  constructor(owner: Owner, args: MyUtilityArgs) {`,
    `    setOwner(this, owner);`,
    ``,
    `    this.args = args;`,
    `  }`,
    ` `,
    `  get getter01(): string {`,
    `    return this.intl.t('key01');`,
    `  }`,
    ` `,
    `  get getter02(): string {`,
    `    return this.args.someCondition ? 'key02' : 'key03';`,
    `  }`,
    ` `,
    `  get getter03(): string {`,
    `    return this.args.someCondition ? tKey('key04') : tKey('key05');`,
    `  }`,
    ``,
    `  @action callback01(): string {`,
    `    return this.args.someCondition ? this.intl.t('key06') : this.intl.t('key07');`,
    `  }`,
    ``,
    `  @action callback02(): string {`,
    `    return this.intl.t(this.getter02);`,
    `  }`,
    ``,
    `  @action callback03(): string {`,
    `    return this.intl.t(this.getter03);`,
    `  }`,
    `}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, ['key01', 'key04', 'key05', 'key06', 'key07']);
});
