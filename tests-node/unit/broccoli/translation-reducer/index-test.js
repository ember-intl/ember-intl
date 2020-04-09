'use strict';

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { createBuilder, createTempDir } = require('broccoli-test-helper');
const TranslationReducer = require('../../../../lib/broccoli/translation-reducer');

const { expect } = chai;

chai.use(chaiAsPromised);

function build(output, callback) {
  return new Promise((resolve) => resolve(output.build()))
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
      const subject = new TranslationReducer(this.input.path(), {
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
      const subject = new TranslationReducer(this.input.path());

      return build(createBuilder(subject), (fs) => {
        expect(fs).to.deep.equal({});
      });
    });
  });

  describe('fallbackLocale', function () {
    it('should emit missing translations', function () {
      const subject = new TranslationReducer(this.input.path(), {
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
      const subject = new TranslationReducer(this.input.path(), {
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
      const subject = new TranslationReducer(this.input.path(), {
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
      const subject = new TranslationReducer(this.input.path(), {
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
          date: '{datetime, date}',
          time: '{datetime, time, short}',
          deep: { nested: { ok: 'Response was ok {reason}' } },
        },
        en: {
          foo: 'Hello {whos}',
          sameArgumentDifferentContent: 'You have {numPhotos, plural, =0 {foo} =1 {bar} other {# baz}}',
          missingArg: 'You have photos',
          date: '{datetime, date, long}',
          time: '{datetime, time, short}',
          select: '{gender, select, male {He avoids bugs} female {She avoids bugs} other {They avoid bugs}}',
          deep: { nested: { ok: 'Response was ok {reason}, {code}' } },
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

    it('_handleMissingTranslations logs translation if verbose', function () {
      const logs = [];
      const subject = new TranslationReducer(this.input.path(), {
        verbose: true,
      });

      subject._log = (msg) => logs.push(msg);
      subject.handleLintResult(subject.linter.lint(this.fixture));

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
      const logs = [];
      const subject = new TranslationReducer(this.input.path(), {
        errorOnMissingTranslations: true,
      });

      subject._log = (msg) => logs.push(msg);

      expect(() => subject.handleLintResult(subject.linter.lint(this.fixture))).throws(`Missing translations:
- "foo" was not found in "it"
- "bar" was not found in "en", "fr", "it"
- "nested.translation.key" was not found in "en", "fr", "it"
- "io" was not found in "de", "it"
- "baz" was not found in "de", "en", "it"
- "nested.translation.lock" was not found in "de", "en", "it"`);
    });

    it('handleLintResult throws if errorOnNamedArgumentMismatch is set', function () {
      const logs = [];
      const subject = new TranslationReducer(this.input.path(), {
        errorOnNamedArgumentMismatch: true,
      });

      subject._log = (msg) => logs.push(msg);

      expect(() => subject.handleLintResult(subject.linter.lint(this.icuFixture))).throws(`ICU arguments mismatch:
- "foo" ICU argument missing: "de": "whos", "en": "who"
- "missingArg" ICU argument missing: "en": "numPhotos"
- "deep.nested.ok" ICU argument missing: "de": "code"`);
    });

    describe('mergeTranslations', function () {
      const testDirectory = path.join(__dirname, '../../../fixtures/strip-nested-nulls');
      const listFiles = ['de-de.yml', 'en-us.yml'].map((file) => path.join(testDirectory, file));

      it('strips empty translations if enabled', function () {
        const subject = new TranslationReducer(this.input, { stripEmptyTranslations: true });
        const translations = subject.mergeTranslations(listFiles);

        expect(translations).to.deep.equal({
          'de-de': { sample_translation: { translation_1: 'Lorem ipsum' } },
          'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } },
        });
      });

      it("doesn't strip empty translations by default", function () {
        const subject = new TranslationReducer(this.input.path());

        const translations = subject.mergeTranslations(listFiles);

        expect(translations).to.deep.equal({
          'de-de': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: null } },
          'en-us': { sample_translation: { translation_1: 'Lorem ipsum', translation_2: 'dolor sit amet' } },
        });
      });
    });
  });
});
