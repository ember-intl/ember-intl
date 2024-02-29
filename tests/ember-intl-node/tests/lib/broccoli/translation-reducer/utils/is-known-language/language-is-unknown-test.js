import { expect } from 'chai';
import isKnownLanguage from 'ember-intl/lib/broccoli/translation-reducer/utils/is-known-language.js';

describe('lib | broccoli | translation-reducer | utils | is-known-language', function () {
  it('language is unknown', function () {
    expect(isKnownLanguage()).to.equal(false);
    expect(isKnownLanguage('')).to.equal(false);
    expect(isKnownLanguage('UNKNOWN_LANGUAGE')).to.equal(false);
  });
});
