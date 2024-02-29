import { expect } from 'chai';
import wrapWithNamespaceIfNeeded from 'ember-intl/lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed.js';

describe('lib | broccoli | translation-reducer | utils | wrap-with-namespace-if-needed', function () {
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

    const filePath = `${inputPath}/en-us.json`;
    const addonNames = [];

    const output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

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
