import { expect } from 'chai';
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

describe('linting', function () {
  beforeEach(function () {
    this.linter = new Linter({
      requiresTranslation() {
        return true;
      },
    });

    this.icuFixture = {
      de: {
        greeting: 'Hallo {who}',
        sameArgumentDifferentContent:
          'You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}',
        missingArg:
          'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
        select:
          '{gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs}}',
        deep: {
          nested: {
            ok: 'Account created {reason}',
            missing: 'Account invalid {reason}, {code}',
          },
        },
      },
      en: {
        greeting: 'Hello {whos}',
        sameArgumentDifferentContent:
          'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
        missingArg: 'You have photos',
        select:
          '{gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs}}',
        deep: {
          nested: {
            ok: 'Account created {reason}',
            missing: 'Account invalid {reason}',
            keyOnlyInOneLanguage: 'Long live the {royalty}!',
          },
        },
      },
    };

    this.brokenIcuFixture = {
      en: {
        brokenSyntax:
          'You have {count, plural, =0 {one {cat} other {several cats}}.',
        validSyntax:
          'You have {count, plural, =0 {one cat} other {several cats}.}',
      },
    };

    this.fixture = {
      de: {
        foo: 'FOO',
        bar: 'BAR',
        nested: {
          translation: {
            key: 'key',
          },
        },
      },
      en: {
        foo: 'foo',
        io: 'io',
        nested: {},
      },
      fr: {
        foo: 'foo',
        baz: 'baz',
        io: 'io',
        nested: {
          translation: {
            lock: 'lock',
          },
        },
      },
      it: {},
    };
  });

  it('returns list of icu argument mismatch', function () {
    const { icuMismatch } = this.linter.lint(this.icuFixture);

    expect(icuMismatch).to.deep.equal([
      [
        'greeting',
        [
          ['de', ['whos']],
          ['en', ['who']],
        ],
      ],
      ['missingArg', [['en', ['numPhotos']]]],
      ['deep.nested.missing', [['en', ['code']]]],
    ]);
  });

  it('returns list of missing translations', function () {
    const { missingTranslations: missing } = this.linter.lint(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'fr', 'it']],
      ['io', ['de', 'it']],
      ['baz', ['de', 'en', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']],
    ]);
  });

  it('requiresTranslation allows to ignore missing translations', function () {
    this.linter = new Linter({
      requiresTranslation: (key, locale) =>
        !(
          (key === 'nested.translation.key' && locale === 'fr') ||
          key === 'baz'
        ),
    });

    let { missingTranslations: missing } = this.linter.lint(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'it']],
      ['io', ['de', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']],
    ]);
  });

  it('throws error for invalid ICU argument syntax', function () {
    // this might change slightly if the parser lib is updated, if so it's fine to adjust
    const expectedParserError = 'MALFORMED_ARGUMENT';
    const brokenString = this.brokenIcuFixture.en.brokenSyntax;

    expect(() => this.linter.lint(this.brokenIcuFixture)).throws(
      `An error occurred (${expectedParserError}) when extracting ICU arguments for '${brokenString}'`,
    );
  });

  it('ignores icu mismatch reporting for translations that do not exist', function () {
    const linter = new Linter({
      requiresTranslation(/* key, locale */) {
        return true;
      },
    });

    const results = linter.lint({
      en: { one: '{one}' }, // not reported, no match
      es: { missing: '{foo}' }, // not reported, no match
    });

    expect(results.icuMismatch).to.deep.equal([]);
    expect(results.missingTranslations).to.deep.equal([
      ['one', ['es']],
      ['missing', ['en']],
    ]);
  });

  it('detects mismatched arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{count}`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([['key', [['en', ['count']]]]]);
  });

  it('detects date arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{timestamp, date, long}`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([
      ['key', [['en', ['timestamp']]]],
    ]);
  });

  it('detects time arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{timestamp, time, short}`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([
      ['key', [['en', ['timestamp']]]],
    ]);
  });

  it('detects select arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs}}`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([['key', [['en', ['gender']]]]]);
  });

  it('detects plural arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([
      ['key', [['en', ['numPhotos']]]],
    ]);
  });

  it('detects arguments within plural arguments', function () {
    const results = this.linter.lint({
      de: {
        key: `{count, plural,
        one {Ein Fehler hat die Speicherung von {model} verhindert}
        other {# Fehler hat verhindert, dass {model} gespeichert wurden}
      }`,
      },
      en: {
        key: ``,
      },
    });

    expect(results.icuMismatch).to.deep.equal([
      ['key', [['en', ['count', 'model']]]],
    ]);
    expect(results.missingTranslations).to.deep.equal([]);
  });
});
