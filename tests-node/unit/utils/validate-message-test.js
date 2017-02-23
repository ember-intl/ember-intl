/* jshint node: true */
/* globals describe, it */

'use strict';

let expect = require('chai').expect;

let validateMessage = require('../../../lib/utils/validate-message');

describe('validateMessage', function() {
  let valid = [
    'hello world',
    `hello world!`,
    `hello {name}!`,
    `{product} will cost {price, number, USD} if ordered by {deadline, date, time}`,
    `{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.`,
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
  ];

  valid.forEach(message => {
    it(`passes for "${message}"`, function() {
      expect(() => validateMessage(message)).to.not.throw(Error);
    });
  });

  let invalidSyntax = [
    'hello {world!',
    `{product} will cost {price, number, USD} if ordered by {deadline, date, time, foo}`,
    `{name} took {numPhotos, plural, # photos} on {takenDate, date, long}.`
  ];

  invalidSyntax.forEach(message => {
    it(`throws SyntaxError for "${message}"`, function() {
      expect(() => validateMessage(message)).to.throw('SyntaxError');
    });
  });
});
