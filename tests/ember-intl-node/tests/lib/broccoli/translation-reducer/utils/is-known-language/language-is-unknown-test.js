import isKnownLanguage from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/utils/is-known-language.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | utils | is-known-language', function () {
  it('language is unknown', function () {
    expect(isKnownLanguage()).to.equal(false);
    expect(isKnownLanguage('')).to.equal(false);
    expect(isKnownLanguage('UNKNOWN_LANGUAGE')).to.equal(false);
  });
});
