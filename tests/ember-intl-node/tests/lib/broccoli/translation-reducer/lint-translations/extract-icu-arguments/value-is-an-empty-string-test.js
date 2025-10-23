import { expect } from 'chai';
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | lint-translations | extract-icu-arguments', function () {
  it('value is an empty string', function () {
    const output = extractICUArguments('');

    expect(output).to.deep.equal([]);
  });
});
