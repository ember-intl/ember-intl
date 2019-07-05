/* eslint-env node */
'use strict';

let expect = require('chai').expect;

let ordinalCategories = require('../../../../lib/broccoli/translation-reducer/utils/ordinal-categories');

describe('ordinalCategories', function() {
  let expectations = {
    ar: ['other'],
    as: ['one', 'two', 'few', 'many', 'other'],
    be: ['few', 'other'],
    de: ['other'],
    en: ['one', 'two', 'few', 'other'],
    hsb: ['other'],
    vi: ['one', 'other']
  };

  Object.keys(expectations).forEach(language => {
    let expected = expectations[language];

    it(`"${language}" equals: ${JSON.stringify(expected)}`, function() {
      expect(ordinalCategories[language]).to.deep.equal(expected);
    });
  });
});
