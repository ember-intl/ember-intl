import { expect } from 'chai';
import wrapWithNamespaceIfNeeded from 'ember-intl/lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed.js';

describe('lib | broccoli | translation-reducer | utils | wrap-with-namespace-if-needed', function () {
  it('without a namespaced addon name (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    let filePath = `${inputPath}/my-addon/en-us.json`;
    let addonNames = ['my-addon'];

    let output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({
      'my-addon': {},
    });

    // Check nested translations
    filePath = `${inputPath}/my-addon/components/hello/en-us.json`;
    addonNames = ['my-addon'];

    output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({
      'my-addon': {
        components: {
          hello: {},
        },
      },
    });

    // Check scoped packages
    filePath = `${inputPath}/@my-org/my-addon/en-us.json`;
    addonNames = ['@my-org/my-addon'];

    output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({
      '@my-org': {
        'my-addon': {},
      },
    });
  });
});
