import ordinalCategories from '@ember-intl/v1-compat/lib/message-validator/ordinal-categories.js';
import { expect } from 'chai';

describe('ordinalCategories', function () {
  const expectations = {
    ar: ['other'],
    as: ['one', 'two', 'few', 'many', 'other'],
    be: ['few', 'other'],
    de: ['other'],
    en: ['one', 'two', 'few', 'other'],
    hsb: ['other'],
    vi: ['one', 'other'],
  };

  Object.keys(expectations).forEach((language) => {
    const expected = expectations[language];

    it(`"${language}" equals: ${JSON.stringify(expected)}`, function () {
      expect(ordinalCategories[language]).to.deep.equal(expected);
    });
  });
});
