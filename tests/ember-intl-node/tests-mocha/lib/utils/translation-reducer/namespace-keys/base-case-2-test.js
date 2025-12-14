import namespaceKeys from '@ember-intl/v1-compat/lib/utils/translation-reducer/namespace-keys.js';
import { expect } from 'chai';

describe('lib | utils | translation-reducer | namespace-keys | base case (2)', function () {
  it('base case (2)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    };

    const output = namespaceKeys(translations, {
      addonNames: [],
      filePath: `${inputPath}/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    });
  });
});
