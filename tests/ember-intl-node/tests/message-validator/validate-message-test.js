import { expect } from 'chai';
import validateMessage from 'ember-intl/lib/message-validator/validate-message.js';

describe('validateMessage', function () {
  let valid = [
    'hello world',
    `hello world!`,
    `hello {name}!`,
    `{product} will cost {price, number, USD} if ordered by {deadline, date, time}`,
    `{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.`,
    `{name} took {numPhotos, plural, =0 {no photos} one {one photo} other {# photos}} on {takenDate, date, long}.`,
    `{ gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs} }`,
    `{ trainers, plural, offset:1
        =0 {The gym is empty}
        =1 {You are alone here}
        one {You and # trainer}
        other {You and # trainers}
      }`,
    `It's my cat's {year, selectordinal,
        one {#st}
        two {#nd}
        few {#rd}
        other {#th}
    } birthday!`,
    '<a href="{href}">Click Here {text}</a>',
    `'<'a href="{href}"'>'Click Here {text}'<'/a'>'`,
    `'<a href="{href}">'Click Here {text}'</a>'`, // ! `{href}` will _not_ be treated as a variable
  ];

  valid.forEach((message) => {
    it(`passes for "${message}"`, function () {
      expect(() => validateMessage(message, 'en-us')).to.not.throw(Error);
    });
  });

  let invalidSyntax = [
    'hello {world!',
    `{name} took {numPhotos, plural, # photos} on {takenDate, date, long}.`,
  ];

  invalidSyntax.forEach((message) => {
    it(`throws SyntaxError for "${message}"`, function () {
      try {
        validateMessage(message);
      } catch (e) {
        /* SyntaxError is subclassed within with peg, so we cannot assert err.constructor === SyntaxError */
        expect(e.toString()).to.include('SyntaxError');

        return;
      }

      expect(false).to.be.true; /* should never be reached */
    });
  });

  let unknownCategory = [
    {
      locale: 'en-us',
      message: `{name} took {numPhotos, plural, zero {no photos} one {one photo} other {# photos}} on {takenDate, date, long}.`,
      error: 'Unknown plural category: zero',
    },
    {
      locale: 'de-de',
      message: `{name} took {numPhotos, plural, null {no photos} eins {one photo} other {# photos}} on {takenDate, date, long}.`,
      error: 'Unknown plural categories: null, eins',
    },
    {
      locale: 'en-us',
      message: `It's my cat's {year, selectordinal,
        one {#st}
        two {#nd}
        many {#rd}
        other {#th}
    } birthday!`,
      error: 'Unknown ordinal category: many',
    },
    {
      locale: 'de-de',
      message: `It's my cat's {year, selectordinal,
        one {#st}
        two {#nd}
        many {#rd}
        other {#th}
    } birthday!`,
      error: 'Unknown ordinal categories: one, two, many',
    },
  ];

  unknownCategory.forEach((item) => {
    it(`throws unknown category error for "${item.message}" with locale "${item.locale}"`, function () {
      expect(() => validateMessage(item.message, item.locale)).to.throw(
        item.error,
      );
    });
  });

  let missingOther = [
    `{ gender, select, male {He avoids bugs} female {She avoids bugs} }`,
    `{name} took {numPhotos, plural, null {no photos} eins {one photo} andere {# photos}} on {takenDate, date, long}.`,
  ];

  missingOther.forEach((message) => {
    it(`throws missing other error for "${message}"`, function () {
      expect(() => validateMessage(message, 'en-us')).to.throw(
        'MISSING_OTHER_CLAUSE',
      );
    });
  });
});
