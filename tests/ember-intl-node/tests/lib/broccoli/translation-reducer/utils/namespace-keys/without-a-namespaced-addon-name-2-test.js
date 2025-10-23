import { expect } from 'chai';
import namespaceKeys from 'ember-intl/lib/broccoli/translation-reducer/utils/namespace-keys.js';

describe('lib | broccoli | translation-reducer | utils | namespace-keys', function () {
  it('without a namespaced addon name (2)', function () {
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

    let output = namespaceKeys(translations, {
      addonNames: ['my-addon'],
      filePath: `${inputPath}/my-addon/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      'my-addon': {
        'some-key': 'some value for some-key',
        'some.key': 'some value for some.key',
        some: {
          'deeply-nested': {
            key: 'some value for some.deeply-nested.key',
          },
        },
        key1: 'some value for key1',
      },
    });

    // Check nested translations
    output = namespaceKeys(translations, {
      addonNames: ['my-addon'],
      filePath: `${inputPath}/my-addon/components/hello/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      'my-addon': {
        components: {
          hello: {
            'some-key': 'some value for some-key',
            'some.key': 'some value for some.key',
            some: {
              'deeply-nested': {
                key: 'some value for some.deeply-nested.key',
              },
            },
            key1: 'some value for key1',
          },
        },
      },
    });

    // Check scoped packages
    output = namespaceKeys(translations, {
      addonNames: ['@my-org/my-addon'],
      filePath: `${inputPath}/@my-org/my-addon/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      '@my-org': {
        'my-addon': {
          'some-key': 'some value for some-key',
          'some.key': 'some value for some.key',
          some: {
            'deeply-nested': {
              key: 'some value for some.deeply-nested.key',
            },
          },
          key1: 'some value for key1',
        },
      },
    });
  });
});
