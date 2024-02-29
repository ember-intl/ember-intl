import { expect } from 'chai';
import wrapWithNamespaceIfNeeded from 'ember-intl/lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed.js';

describe('lib | broccoli | translation-reducer | utils | wrap-with-namespace-if-needed', function () {
  it('base case (1)', function () {
    const inputPath = '/tmp/broccoli_debug-output_path-l4iBcmcT';
    const translations = {};

    const filePath = `${inputPath}/en-us.json`;
    const addonNames = [];

    const output = wrapWithNamespaceIfNeeded(
      translations,
      filePath,
      inputPath,
      addonNames,
    );

    expect(output).to.deep.equal({});
  });
});
