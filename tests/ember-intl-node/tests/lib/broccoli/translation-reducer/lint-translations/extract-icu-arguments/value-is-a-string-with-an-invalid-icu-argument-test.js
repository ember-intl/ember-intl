import { expect } from 'chai';
import extractIcuArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | lint-translations | extract-icu-arguments', function () {
  it('value is a string with an invalid ICU argument', function () {
    expect(() => {
      extractIcuArguments('It is now {timestamp, unknownType, short}.');
    }).to.throw(
      `An error occurred while extracting ICU arguments for 'It is now {timestamp, unknownType, short}.' (INVALID_ARGUMENT_TYPE)`,
    );
  });
});
