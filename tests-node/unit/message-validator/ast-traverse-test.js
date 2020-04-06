'use strict';

const { expect } = require('chai');
const messageParser = require('intl-messageformat-parser');
const traverse = require('../../../lib/message-validator/ast-traverse');

describe('traverse', function () {
  it('hello world!', function () {
    let ast = messageParser.parse(`hello world!`);
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 1,
      argumentElement: 0,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      poundElement: 0,
    });
  });

  it('hello {name}!', function () {
    let ast = messageParser.parse(`hello {name}!`);
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 2,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      poundElement: 0,
    });
  });

  it('{product} will cost {price, number, USD} if ordered by {deadline, date, time}', function () {
    let ast = messageParser.parse(`{product} will cost {price, number, USD} if ordered by {deadline, date, time}`);
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 2,
      argumentElement: 1,
      numberFormat: 1,
      dateFormat: 1,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 0,
      poundElement: 0,
    });
  });

  it('{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.', function () {
    let ast = messageParser.parse(
      `{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {takenDate, date, long}.`
    );
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 6,
      argumentElement: 1,
      numberFormat: 0,
      dateFormat: 1,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      poundElement: 1,
    });
  });

  it('{ gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs} }', function () {
    let ast = messageParser.parse(
      `{ gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs} }`
    );
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 3,
      argumentElement: 0,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 0,
      selectFormat: 1,
      poundElement: 0,
    });
  });

  it('{ trainers, plural, offset:1 ... }', function () {
    let ast = messageParser.parse(
      `{ trainers, plural, offset:1
        =0 {The gym is empty}
        =1 {You are alone here}
        one {You and # trainer}
        other {You and # trainers}
      }`
    );
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 6,
      argumentElement: 0,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      poundElement: 2,
    });
  });

  it(`It's my cat's {year, selectordinal, ... }`, function () {
    let ast = messageParser.parse(
      `It's my cat's {year, selectordinal,
        one {#st}
        two {#nd}
        few {#rd}
        other {#th}
    } birthday!`
    );
    let result = count(ast);

    expect(result).to.deep.equal({
      literalElement: 6,
      argumentElement: 0,
      numberFormat: 0,
      dateFormat: 0,
      timeFormat: 0,
      pluralFormat: 1,
      selectFormat: 0,
      poundElement: 4,
    });
  });
});

function count(ast) {
  let result = {
    literalElement: 0,
    argumentElement: 0,
    numberFormat: 0,
    dateFormat: 0,
    timeFormat: 0,
    pluralFormat: 0,
    selectFormat: 0,
    poundElement: 0,
  };

  traverse(ast, {
    [messageParser.TYPE.pound]() {
      result.poundElement++;
    },
    [messageParser.TYPE.literal]() {
      result.literalElement++;
    },
    [messageParser.TYPE.argument]() {
      result.argumentElement++;
    },
    [messageParser.TYPE.number]() {
      result.numberFormat++;
    },
    [messageParser.TYPE.date]() {
      result.dateFormat++;
    },
    [messageParser.TYPE.time]() {
      result.timeFormat++;
    },
    [messageParser.TYPE.plural]() {
      result.pluralFormat++;
    },
    [messageParser.TYPE.select]() {
      result.selectFormat++;
    },
  });

  return result;
}
