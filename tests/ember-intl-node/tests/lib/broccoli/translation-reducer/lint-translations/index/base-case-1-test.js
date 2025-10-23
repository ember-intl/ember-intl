import lintTranslations from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/lint-translations/index.js';
import { expect } from 'chai';

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
