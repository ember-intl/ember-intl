'use strict';

const path = require('path');
const Rsvp = require('rsvp');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { createBuilder, createTempDir } = require('broccoli-test-helper');
const TranslationReducer = require('../../../../lib/broccoli/translation-reducer');

const { expect } = chai;

chai.use(chaiAsPromised);

function build(output, callback) {
  return new Rsvp.Promise((resolve) => resolve(output.build()))
    .then(() => callback(output.read()))
    .finally(() => output.dispose());
}

describe('translation-reducer', function () {
  beforeEach(function () {
    return createTempDir().then((tempDir) => {
      this.input = tempDir;
    });
  });

  afterEach(function () {
    if (this.input) {
      return this.input.dispose();
    }
  });

  describe('core', function () {
    it('should write to outputPath', function () {
      let subject = new TranslationReducer(this.input.path(), {
        outputPath: 'custom/output/path',
      });

      this.input.write({
        'en-us.json': `{ "greet": "hi" }`,
      });

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({
          custom: {
            output: {
              path: {
                'en-us.json': `{"greet":"hi"}`,
              },
            },
          },
        });
      });
    });

    it('should handle empty input', function () {
      let subject = new TranslationReducer(this.input.path());

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({});
      });
    });
  });

  describe('fallbackLocale', function () {
    it('should emit missing translations', function () {
      let subject = new TranslationReducer(this.input.path(), {
        fallbackLocale: 'en-us',
        errorOnMissingTranslations: true,
      });

      this.input.write({
        'de-de.json': `{}`,
        'en-us.json': `{ "greet": "hello" }`,
      });

      return expect(build(createBuilder(subject))).to.eventually.rejectedWith(/"greet" was not found in "de-de"/);
    });

    it('should not not overwrite translations', function () {
      let subject = new TranslationReducer(this.input.path(), {
        fallbackLocale: 'en-us',
      });

      this.input.write({
        'de-de.json': `{ "greet": "hallo" }`,
        'en-us.json': `{ "greet": "hello" }`,
      });

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({
          'de-de.json': `{"greet":"hallo"}`,
          'en-us.json': `{"greet":"hello"}`,
        });
      });
    });

    it('should merge', function () {
      let subject = new TranslationReducer(this.input.path(), {
        fallbackLocale: 'en-us',
      });

      this.input.write({
        'de-de.json': `{}`,
        'en-us.json': `{ "greet": "hello" }`,
      });

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({
          'en-us.json': `{"greet":"hello"}`,
          'de-de.json': `{"greet":"hello"}`,
        });
      });
    });

    it('should deep merge', function () {
      let subject = new TranslationReducer(this.input.path(), {
        fallbackLocale: 'en-us',
      });

      this.input.write({
        'de-de.json': `{ "welcome": { "title": "welkom" } }`,
        'en-us.json': `{ "welcome": { "title": "welcome", "greet": "hello" } }`,
      });

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({
          'de-de.json': `{"welcome":{"greet":"hello","title":"welkom"}}`,
          'en-us.json': `{"welcome":{"greet":"hello","title":"welcome"}}`,
        });
      });
    });
  });

  describe('linting', function () {
    beforeEach(function () {
      this.icuFixture = {
        de: {
          foo: 'Hallo {who}',
          sameArgumentDifferentContent:
            'You have {numPhotos, plural, =0 {no photos.} =1 {one photo.} other {# photos.}}',
          missingArg: 'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
          deep: { nested: { ok: 'ok {reason}' } },
        },
        en: {
          foo: 'Hello {whos}',
          sameArgumentDifferentContent: 'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
          missingArg: 'You have photos',
        },
      };

      this.brokenIcuFixture = {
        en: {
          brokenSyntax: 'You have {count, plural, =0 {one {cat} other {several cats}}.',
          validSyntax: 'You have {count, plural, =0 {one cat} other {several cats}.}',
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

    it('lintTranslations returns list of missing translations', function () {
      let subject = new TranslationReducer(this.input.path());
      let { missingTranslations: missing } = subject.lintTranslations(this.fixture);

      expect(missing).to.deep.equal([
        ['foo', ['it']],
        ['bar', ['en', 'fr', 'it']],
        ['nested.translation.key', ['en', 'fr', 'it']],
        ['io', ['de', 'it']],
        ['baz', ['de', 'en', 'it']],
        ['nested.translation.lock', ['de', 'en', 'it']],
      ]);
    });

    it('lintTranslations throws error for invalid ICU argument syntax', function () {
      let subject = new TranslationReducer(this.input.path());

      // this might change slightly if the parser lib is updated, if so it's fine to adjust
      let expectedParserError = 'Expected "," or "}" but "c" found.';
      let brokenString = this.brokenIcuFixture.en.brokenSyntax;

      expect(() => subject.lintTranslations(this.brokenIcuFixture)).throws(
        `An error occured (${expectedParserError}) when extracting ICU arguments for '${brokenString}'`
      );
    });

    it('lintTranslations returns list of icu argument mismatch', function () {
      let subject = new TranslationReducer(this.input.path());
      let { icuMismatch } = subject.lintTranslations(this.icuFixture);

      expect(icuMismatch).to.deep.equal([
        [
          'foo',
          [
            ['de', ['whos']],
            ['en', ['who']],
          ],
        ],
        ['missingArg', [['en', ['numPhotos']]]],
        ['deep.nested.ok', [['en', ['reason']]]],
      ]);
    });

    it('lintTranslations returns list of icu argument mismatch without those that are required', function () {
      let subject = new TranslationReducer(this.input.path(), { fallbackLocale: 'en' });

      delete this.icuFixture['de'].foo;

      let { icuMismatch } = subject.lintTranslations(this.icuFixture);

      expect(icuMismatch).to.deep.equal([
        ['missingArg', [['en', ['numPhotos']]]],
        ['deep.nested.ok', [['en', ['reason']]]],
      ]);
    });

    it('_handleMissingTranslations logs translation if verbose', function () {
      let logs = [];
      let subject = new TranslationReducer(this.input.path());

      subject.options.verbose = true;
      subject._log = (msg) => logs.push(msg);
      subject.handleLintResult(subject.lintTranslations(this.fixture));

      expect(logs).to.satisfy((string) =>
        [
          '"foo" was not found in "it"',
          '"bar" was not found in "en", "fr", "it"',
          '"nested.translation.key" was not found in "en", "fr", "it"',
          '"io" was not found in "de", "it"',
          '"baz" was not found in "de", "en", "it"',
          '"nested.translation.lock" was not found in "de", "en", "it"',
        ].every((bit) => string.includes(bit))
      );
    });

    it('handleLintResult throws if errorOnMissingTranslations is set', function () {
      let logs = [];
      let subject = new TranslationReducer(this.input.path());

      subject.options.errorOnMissingTranslations = true;
      subject._log = (msg) => logs.push(msg);

      expect(() => subject.handleLintResult(subject.lintTranslations(this.fixture))).throws(`Missing translations:
- "foo" was not found in "it"
- "bar" was not found in "en", "fr", "it"
- "nested.translation.key" was not found in "en", "fr", "it"
- "io" was not found in "de", "it"
- "baz" was not found in "de", "en", "it"
- "nested.translation.lock" was not found in "de", "en", "it"`);
    });

    it('handleLintResult throws if errorOnNamedArgumentMismatch is set', function () {
      let logs = [];
      let subject = new TranslationReducer(this.input.path());

      subject.options.errorOnNamedArgumentMismatch = true;
      subject._log = (msg) => logs.push(msg);

      expect(() => subject.handleLintResult(subject.lintTranslations(this.icuFixture))).throws(`ICU arguments mismatch:
- "foo" ICU argument missing: "de": "whos", "en": "who"
- "missingArg" ICU argument missing: "en": "numPhotos"
- "deep.nested.ok" ICU argument missing: "en": "reason"`);
    });

    it('requiresTranslation allows to ignore missing translations', function () {
      let subject = new TranslationReducer(this.input.path());
      subject.options.requiresTranslation = (key, locale) =>
        !((key === 'nested.translation.key' && locale === 'fr') || key === 'baz');

      let { missingTranslations: missing } = subject.lintTranslations(this.fixture);

      expect(missing).to.deep.equal([
        ['foo', ['it']],
        ['bar', ['en', 'fr', 'it']],
        ['nested.translation.key', ['en', 'it']],
        ['io', ['de', 'it']],
        ['nested.translation.lock', ['de', 'en', 'it']],
      ]);
    });

    describe('reduce', function () {
      let testDirectory = path.join(__dirname, '../../../fixtures/strip-nested-nulls');
      let listFiles = ['de-de.yml', 'en-us.yml'].map((file) => path.join(testDirectory, file));

      it('strips empty translations if enabled', function () {
        let subject = new TranslationReducer(this.input, { stripEmptyTranslations: true });
        let translations = subject.reduce(listFiles);

        expect(translations).to.deep.equal({
          'de-de': { sample_translation: { translation_1: 'Lorem ipsum' } },
          'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } },
        });
      });

      it("doesn't strip empty translations by default", function () {
        let subject = new TranslationReducer(this.input.path());

        let translations = subject.reduce(listFiles);

        expect(translations).to.deep.equal({
          'de-de': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: null } },
          'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } },
        });
      });
    });
  });
});
