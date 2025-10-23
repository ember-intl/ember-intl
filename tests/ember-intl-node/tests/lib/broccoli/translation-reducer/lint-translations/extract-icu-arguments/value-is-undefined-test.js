import { expect } from 'chai';
import extractIcuArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | lint-translations | extract-icu-arguments', function () {
  it('value is undefined', function () {
    expect(() => {
      extractIcuArguments();
    }).to.throw(
      `An error occurred while extracting ICU arguments for 'undefined' (Cannot read properties of undefined (reading 'length'))`,
    );
  });
});
