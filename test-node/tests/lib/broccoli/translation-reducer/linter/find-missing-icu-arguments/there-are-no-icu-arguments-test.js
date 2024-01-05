import { expect } from 'chai';
import findMissingICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments.js';

describe('lib | broccoli | translation-reducer | linter | find-missing-icu-arguments', function () {
  it('there are no ICU arguments', function () {
    const allIcuArguments = {
      'some-key': [],
    };

    const icuArguments = {
      de: {
        'some-key': [],
      },
      en: {
        'some-key': [],
      },
    };

    const locales = ['de', 'en'];

    const output = findMissingICUArguments(
      'some-key',
      allIcuArguments,
      locales,
      icuArguments,
    );

    expect(output).to.deep.equal([]);
  });
});
