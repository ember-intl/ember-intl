import { expect } from 'chai';
import lintTranslations from 'ember-intl/lib/broccoli/translation-reducer/lint-translations/index.js';

describe('lib | broccoli | translation-reducer | lint-translations | index', function () {
  it('base case (1)', function () {
    const output = lintTranslations({
      de: {},
      en: {},
    });

    expect(output).to.deep.equal({
      icuMismatch: [],
      missingTranslations: [],
    });
  });
});
