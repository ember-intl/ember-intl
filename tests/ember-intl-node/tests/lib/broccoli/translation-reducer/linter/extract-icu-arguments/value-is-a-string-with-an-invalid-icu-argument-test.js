import { expect } from 'chai';
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | extract-icu-arguments', function () {
  it('value is a string with an invalid ICU argument', function () {
    expect(() => {
      extractICUArguments('It is now {timestamp, unknownType, short}.');
    }).to.throw(
      `An error occurred (INVALID_ARGUMENT_TYPE) when extracting ICU arguments for 'It is now {timestamp, unknownType, short}.`,
    );
  });
});
