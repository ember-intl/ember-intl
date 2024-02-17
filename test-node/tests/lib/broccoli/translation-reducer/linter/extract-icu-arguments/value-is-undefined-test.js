import { expect } from 'chai';
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | extract-icu-arguments', function () {
  it('value is undefined', function () {
    expect(() => {
      extractICUArguments();
    }).to.throw(
      `An error occurred (Cannot read properties of undefined (reading 'length')) when extracting ICU arguments for 'undefined'`,
    );
  });
});
