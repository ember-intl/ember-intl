import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inJsTs } from '../../../../../src/utils/analyze-project/find-used-keys/index.js';

test('utils | analyze-project | find-used-keys | in-js > edge case (2)', function () {
  const file = normalizeFile([
    `import Component from '@glimmer/component';`,
    `import { tKey as t } from 'ember-intl';`,
    ``,
    `export default class Hello extends Component {`,
    `  get getter01() {`,
    `    return t('key01');`,
    `  }`,
    ``,
    `  get getter02() {`,
    `    return intl.t('key02');`,
    `  }`,
    ``,
    `  get getter03() {`,
    `    return this.intl.t('key03');`,
    `  }`,
    ``,
    `  get getter04() {`,
    `    const { intl } = this;`,
    `    return intl.t('key04');`,
    `  }`,
    ``,
    `  get getter05() {`,
    `    const intl = { t: () => {} };`,
    `    return intl.t('key05');`,
    `  }`,
    ``,
    `  get getter06() {`,
    `    return t(t('key06'));`,
    `  }`,
    ``,
    `  get getter07() {`,
    `    return intl.t(t('key07'));`,
    `  }`,
    ``,
    `  get getter08() {`,
    `    return this.intl.t(t('key08'));`,
    `  }`,
    ``,
    `  get getter09() {`,
    `    const { intl } = this;`,
    `    return intl.t(t('key09'));`,
    `  }`,
    ``,
    `  get getter10() {`,
    `    const intl = { t: () => {} };`,
    `    return intl.t(t('key10'));`,
    `  }`,
    `}`,
    ``,
  ]);

  const keys = inJsTs(file, {
    isTypeScript: false,
  });

  assert.deepStrictEqual(keys, [
    'key01',
    'key06',
    'key07',
    'key08',
    'key09',
    'key10',
  ]);
});
