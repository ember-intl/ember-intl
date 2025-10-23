import namespaceKeys from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/utils/namespace-keys.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | utils | namespace-keys', function () {
  it('without a namespaced addon name (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    let output = namespaceKeys(translations, {
      addonNames: ['my-addon'],
      filePath: `${inputPath}/my-addon/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      'my-addon': {},
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
          hello: {},
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
        'my-addon': {},
      },
    });
  });
});
