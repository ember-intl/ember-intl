'use strict';

const expect = require('chai').expect;
const path = require('path');

const subject = require('../../../lib/broccoli/translation-reducer');

describe('translation-reducer', function() {
  beforeEach(function() {
    this.icuFixture = {
      de: {
        foo: 'Hallo {who}',
        sameArgumentDifferentContent: 'You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}',
        missingArg: 'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
        deep: { nested: { ok: 'ok {reason}' } }
      },
      en: {
        foo: 'Hello {whos}',
        sameArgumentDifferentContent: 'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
        missingArg: 'You have photos'
      }
    };

    this.fixture = {
      de: {
        foo: 'FOO',
        bar: 'BAR',
        nested: {
          translation: {
            key: 'key'
          }
        }
      },
      en: {
        foo: 'foo',
        io: 'io',
        nested: {}
      },
      fr: {
        foo: 'foo',
        baz: 'baz',
        io: 'io',
        nested: {
          translation: {
            lock: 'lock'
          }
        }
      },
      it: {}
    };
  });

  it('lintTranslations returns list of missing translations', function() {
    const reducer = new subject('src');
    const { missingTranslations: missing } = reducer.lintTranslations(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'fr', 'it']],
      ['io', ['de', 'it']],
      ['baz', ['de', 'en', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']]
    ]);
  });

  it('lintTranslations returns list of icu argument mismatch', function() {
    const reducer = new subject('src');
    const { icuMismatch } = reducer.lintTranslations(this.icuFixture);

    expect(icuMismatch).to.deep.equal([
      ['foo', [['de', ['whos']], ['en', ['who']]]],
      ['missingArg', [['en', ['numPhotos']]]],
      ['deep.nested.ok', [['en', ['reason']]]]
    ]);
  });

  it('_handleMissingTranslations logs translation if verbose', function() {
    const logs = [];
    const reducer = new subject('src');
    reducer.options.verbose = true;

    reducer._log = msg => logs.push(msg);

    reducer.handleLintResult(reducer.lintTranslations(this.fixture));

    expect(logs).to.satisfy(string =>
      [
        '"foo" was not found in "it"',
        '"bar" was not found in "en", "fr", "it"',
        '"nested.translation.key" was not found in "en", "fr", "it"',
        '"io" was not found in "de", "it"',
        '"baz" was not found in "de", "en", "it"',
        '"nested.translation.lock" was not found in "de", "en", "it"'
      ].every(bit => string.includes(bit))
    );
  });

  it('handleLintResult throws if errorOnMissingTranslations is set', function() {
    const logs = [];
    const reducer = new subject('src');
    reducer.options.errorOnMissingTranslations = true;

    reducer._log = msg => logs.push(msg);

    expect(() => reducer.handleLintResult(reducer.lintTranslations(this.fixture))).throws(`Missing translations:
- "foo" was not found in "it"
- "bar" was not found in "en", "fr", "it"
- "nested.translation.key" was not found in "en", "fr", "it"
- "io" was not found in "de", "it"
- "baz" was not found in "de", "en", "it"
- "nested.translation.lock" was not found in "de", "en", "it"`);
  });

  it('handleLintResult throws if errorOnNamedArgumentMismatch is set', function() {
    const logs = [];
    const reducer = new subject('src');
    reducer.options.errorOnNamedArgumentMismatch = true;

    reducer._log = msg => logs.push(msg);

    expect(() => reducer.handleLintResult(reducer.lintTranslations(this.icuFixture))).throws(`ICU arguments mismatch:
- "foo" ICU argument missing: "de": "whos", "en": "who"
- "missingArg" ICU argument missing: "en": "numPhotos"
- "deep.nested.ok" ICU argument missing: "en": "reason"`);
  });

  it('requiresTranslation allows to ignore missing translations', function() {
    const reducer = new subject('src');
    reducer.options.requiresTranslation = (key, locale) =>
      !((key === 'nested.translation.key' && locale === 'fr') || key === 'baz');

    const { missingTranslations: missing } = reducer.lintTranslations(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'it']],
      ['io', ['de', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']]
    ]);
  });

  describe('readDirectory', function() {
    const testDirectory = path.join(__dirname, '../../fixtures/strip-nested-nulls');
    const listFiles = ['de-de.yml', 'en-us.yml'].map(file => path.join(testDirectory, file));

    it('strips empty translations if enabled', function() {
      const reducer = new subject('src', { stripEmptyTranslations: true });
      const translations = reducer.readDirectory(testDirectory, listFiles);

      expect(translations).to.deep.equal({
        'de-de': { sample_translation: { translation_1: 'Lorem ipsum' } },
        'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } }
      });
    });

    it("doesn't strip empty translations by default", function() {
      const reducer = new subject('src');

      const translations = reducer.readDirectory(testDirectory, listFiles);

      expect(translations).to.deep.equal({
        'de-de': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: null } },
        'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } }
      });
    });
  });
});
