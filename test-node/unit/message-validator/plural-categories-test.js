import { expect } from 'chai';
import pluralCategories from 'ember-intl/lib/message-validator/plural-categories.js';

describe('pluralCategories', function () {
  const expectations = {
    ar: ['zero', 'one', 'two', 'few', 'many', 'other'],
    as: ['one', 'other'],
    be: ['one', 'few', 'many', 'other'],
    de: ['one', 'other'],
    en: ['one', 'other'],
    hsb: ['one', 'two', 'few', 'other'],
    vi: ['other'],
  };

  Object.keys(expectations).forEach((language) => {
    let expected = expectations[language];

    it(`"${language}" equals: ${JSON.stringify(expected)}`, function () {
      expect(pluralCategories[language]).to.deep.equal(expected);
    });
  });
});
