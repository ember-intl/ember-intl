import { expect } from 'chai';
import stripEmptyTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/strip-empty-translations.js';

describe('lib | broccoli | translation-reducer | utils | strip-empty-translations', function () {
  it('some translations are an empty string', function () {
    const output = stripEmptyTranslations({
      'some-key': '',
      'some.key': '',
      some: {
        'deeply-nested': {
          key: '',
        },
      },
      key1: '',
    });

    expect(output).to.deep.equal({
      some: {},
    });
  });
});
