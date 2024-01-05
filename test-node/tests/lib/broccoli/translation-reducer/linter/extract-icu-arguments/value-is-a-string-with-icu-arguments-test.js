import { expect } from 'chai';
import extractICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/extract-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | extract-icu-arguments', function () {
  it('value is a string with ICU arguments', function () {
    // Type: argument
    let output = extractICUArguments('Hello {name}!');

    expect(output).to.deep.equal(['name']);

    // Type: date
    output = extractICUArguments('It is now {timestamp, date, long}.');

    expect(output).to.deep.equal(['timestamp']);

    // Type: plural
    output = extractICUArguments(
      'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.',
    );

    expect(output).to.deep.equal(['numPhotos']);

    // Type: select
    output = extractICUArguments(
      '{gender, select, female {She is} male {He is} other {They are}} cool.}',
    );

    expect(output).to.deep.equal(['gender']);

    // Type: time
    output = extractICUArguments('It is now {timestamp, time, short}.');

    expect(output).to.deep.equal(['timestamp']);
  });
});
