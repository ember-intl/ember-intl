import namespaceKeys from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/utils/namespace-keys.js';
import { expect } from 'chai';

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
