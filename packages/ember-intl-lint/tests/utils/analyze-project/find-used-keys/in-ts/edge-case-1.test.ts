import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-ts > edge case (1)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    `import { tKey } from 'ember-intl';`,
    ``,
    `export default class Hello extends Component {`,
    `  get getter01(): string {`,
    `    return t('key01');`,
    `  }`,
    ``,
    `  get getter02(): string {`,
    `    return intl.t('key02');`,
    `  }`,
    ``,
    `  get getter03(): string {`,
    `    return this.intl.t('key03');`,
    `  }`,
    ``,
    `  get getter04(): string {`,
    `    const { intl } = this;`,
    `    return intl.t('key04');`,
    `  }`,
    ``,
    `  get getter05(): string {`,
    `    const intl = { t: () => {} };`,
    `    return intl.t('key05');`,
    `  }`,
    ``,
    `  get getter06(): string {`,
    `    return t(tKey('key06'));`,
    `  }`,
    ``,
    `  get getter07(): string {`,
    `    return intl.t(tKey('key07'));`,
    `  }`,
    ``,
    `  get getter08(): string {`,
    `    return this.intl.t(tKey('key08'));`,
    `  }`,
    ``,
    `  get getter09(): string {`,
    `    const { intl } = this;`,
    `    return intl.t(tKey('key09'));`,
    `  }`,
    ``,
    `  get getter10(): string {`,
    `    const intl = { t: () => {} };`,
    `    return intl.t(tKey('key10'));`,
    `  }`,
    `}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: true,
  });

  assert.deepStrictEqual(keys, ['key06', 'key07', 'key08', 'key09', 'key10']);
});
