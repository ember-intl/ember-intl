import { expect } from 'chai';
import stripEmptyTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/strip-empty-translations.js';

describe('lib | broccoli | translation-reducer | utils | strip-empty-translations', function () {
  it('some translations are null', function () {
    const output = stripEmptyTranslations({
      'some-key': null,
      'some.key': null,
      some: {
        'deeply-nested': {
          key: null,
        },
      },
      key1: null,
    });

    expect(output).to.deep.equal({
      some: {},
    });
  });
});
