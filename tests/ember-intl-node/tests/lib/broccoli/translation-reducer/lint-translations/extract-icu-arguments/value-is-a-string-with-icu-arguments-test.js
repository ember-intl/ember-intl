import { expect } from 'chai';
import extractIcuArguments from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | lint-translations | extract-icu-arguments', function () {
  it('value is a string with ICU arguments', function () {
    // Type: argument
    let output = extractIcuArguments('Hello {name}!');

    expect(output).to.deep.equal(['name']);

    // Type: date
    output = extractIcuArguments('It is now {timestamp, date, long}.');

    expect(output).to.deep.equal(['timestamp']);

    // Type: plural
    output = extractIcuArguments(
      'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.',
    );

    expect(output).to.deep.equal(['numPhotos']);

    // Type: select
    output = extractIcuArguments(
      '{gender, select, female {She is} male {He is} other {They are}} cool.}',
    );

    expect(output).to.deep.equal(['gender']);

    // Type: time
    output = extractIcuArguments('It is now {timestamp, time, short}.');

    expect(output).to.deep.equal(['timestamp']);
  });
});
