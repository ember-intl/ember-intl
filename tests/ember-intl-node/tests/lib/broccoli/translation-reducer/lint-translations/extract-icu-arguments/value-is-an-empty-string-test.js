import extractIcuArguments from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/lint-translations/extract-icu-arguments.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | lint-translations | extract-icu-arguments', function () {
  it('value is an empty string', function () {
    const output = extractIcuArguments('');

    expect(output).to.deep.equal([]);
  });
});
