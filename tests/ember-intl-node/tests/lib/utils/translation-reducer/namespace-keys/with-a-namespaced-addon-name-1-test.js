import namespaceKeys from '@ember-intl/v1-compat/lib/utils/translation-reducer/namespace-keys.js';
import { expect } from 'chai';

describe('lib | utils | translation-reducer | namespace-keys | with a namespaced addon name (1)', function () {
  it('with a namespaced addon name (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    let output = namespaceKeys(translations, {
      addonNames: ['my-addon'],
      filePath: `${inputPath}/__ember-intl-addon__/my-addon/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({});

    // Check nested translations
    output = namespaceKeys(translations, {
      addonNames: ['my-addon'],
      filePath: `${inputPath}/__ember-intl-addon__/my-addon/components/hello/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({
      components: {
        hello: {},
      },
    });

    // Check scoped packages
    output = namespaceKeys(translations, {
      addonNames: ['@my-org/my-addon'],
      filePath: `${inputPath}/__ember-intl-addon__/@my-org/my-addon/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({});
  });
});
