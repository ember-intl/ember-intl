import { expect } from 'chai';
import wrapWithNamespaceIfNeeded from 'ember-intl/lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed.js';

describe('lib | broccoli | translation-reducer | utils | wrap-with-namespace-if-needed', function () {
  it('with a namespaced addon name (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    let filePath = `${inputPath}/__ember-intl-addon__/my-addon/en-us.json`;
    let addonNames = ['my-addon'];

    let output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({});

    // Check nested translations
    filePath = `${inputPath}/__ember-intl-addon__/my-addon/components/hello/en-us.json`;
    addonNames = ['my-addon'];

    output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({
      components: {
        hello: {},
      },
    });

    // Check scoped packages
    filePath = `${inputPath}/__ember-intl-addon__/@my-org/my-addon/en-us.json`;
    addonNames = ['@my-org/my-addon'];

    output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({});
  });
});
