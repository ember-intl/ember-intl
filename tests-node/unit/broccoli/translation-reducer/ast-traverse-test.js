'use strict';

let expect = require('chai').expect;
let messageParser = require('@ember-intl/intl-messageformat-parser');

let traverse = require('../../../../lib/broccoli/translation-reducer/utils/ast-traverse');

describe('traverse', function() {
  it('hello world!', function() {
    let ast = messageParser.parse(`hello world!`);

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 1,
      messageTextElement: 1,
      argumentElement: 0,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      optionalFormatPattern: 0
    });
  });

  it('hello {name}!', function() {
    let ast = messageParser.parse(`hello {name}!`);

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 1,
      messageTextElement: 2,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      optionalFormatPattern: 0
    });
  });

  it('{product} will cost {price, number, USD} if ordered by {deadline, date, time}', function() {
    let ast = messageParser.parse(`{product} will cost {price, number, USD} if ordered by {deadline, date, time}`);

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 1,
      messageTextElement: 2,
      argumentElement: 3,
      numberFormat: 1,
      dateFormat: 1,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      optionalFormatPattern: 0
    });
  });

  it('{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.', function() {
    let ast = messageParser.parse(
      `{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.`
    );

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 4,
      messageTextElement: 6,
      argumentElement: 3,
      numberFormat: 0,
      dateFormat: 1,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      optionalFormatPattern: 3
    });
  });

  it('{ gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs} }', function() {
    let ast = messageParser.parse(
      `{ gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs} }`
    );

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 4,
      messageTextElement: 3,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 1,
      optionalFormatPattern: 3
    });
  });

  it('{ trainers, plural, offset:1 ... }', function() {
    let ast = messageParser.parse(
      `{ trainers, plural, offset:1
        =0 {The gym is empty}
        =1 {You are alone here}
        one {You and # trainer}
        other {You and # trainers}
      }`
    );

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 5,
      messageTextElement: 4,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      optionalFormatPattern: 4
    });
  });

  it(`It's my cat's {year, selectordinal, ... }`, function() {
    let ast = messageParser.parse(
      `It's my cat's {year, selectordinal,
        one {#st}
        two {#nd}
        few {#rd}
        other {#th}
    } birthday!`
    );

    expect(count(ast)).to.deep.equal({
      messageFormatPattern: 5,
      messageTextElement: 6,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      optionalFormatPattern: 4
    });
  });
});

function count(ast) {
  let result = {
    messageFormatPattern: 0,
    messageTextElement: 0,
    argumentElement: 0,
    numberFormat: 0,
    dateFormat: 0,
    timeFormat: 0,
    pluralFormat: 0,
    selectFormat: 0,
    optionalFormatPattern: 0
  };

  traverse(ast, {
    messageFormatPattern() {
      result.messageFormatPattern++;
    },
    messageTextElement() {
      result.messageTextElement++;
    },
    argumentElement() {
      result.argumentElement++;
    },
    numberFormat() {
      result.numberFormat++;
    },
    dateFormat() {
      result.dateFormat++;
    },
    timeFormat() {
      result.timeFormat++;
    },
    pluralFormat() {
      result.pluralFormat++;
    },
    selectFormat() {
      result.selectFormat++;
    },
    optionalFormatPattern() {
      result.optionalFormatPattern++;
    }
  });

  return result;
}
