import { expect } from 'chai';
import namespaceKeys from 'ember-intl/lib/broccoli/translation-reducer/utils/namespace-keys.js';

describe('lib | broccoli | translation-reducer | utils | namespace-keys', function () {
  it('base case (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    const output = namespaceKeys(translations, {
      addonNames: [],
      filePath: `${inputPath}/en-us.json`,
      inputPath,
    });

    expect(output).to.deep.equal({});
  });
});
