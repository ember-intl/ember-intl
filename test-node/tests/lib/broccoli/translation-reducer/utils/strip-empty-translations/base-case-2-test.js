import { expect } from 'chai';
import stripEmptyTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/strip-empty-translations.js';

describe('lib | broccoli | translation-reducer | utils | strip-empty-translations', function () {
  it('base case (2)', function () {
    const output = stripEmptyTranslations({
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    });

    expect(output).to.deep.equal({
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    });
  });
});
