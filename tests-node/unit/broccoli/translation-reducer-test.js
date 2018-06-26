'use strict';

let mocha = require('mocha');
let expect = require('chai').expect;

let subject = require('../../../lib/broccoli/translation-reducer');

describe('translation-reducer', function() {
  beforeEach(function() {
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
  it('findMissingTranslations returns list of missing translations', function() {
    const reducer = new subject('src');
    const missing = reducer.findMissingTranslations(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'fr', 'it']],
      ['io', ['de', 'it']],
      ['baz', ['de', 'en', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']]
    ]);
  });

  it('_handleMissingTranslations logs translation if verbose', function() {
    const logs = [];
    const reducer = new subject('src');
    reducer.options.verbose = true;

    reducer._log = msg => logs.push(msg);

    reducer.handleMissingTranslations(reducer.findMissingTranslations(this.fixture));

    expect(logs).to.deep.equal([
      '"foo" was not found in "it"',
      '"bar" was not found in "en", "fr", "it"',
      '"nested.translation.key" was not found in "en", "fr", "it"',
      '"io" was not found in "de", "it"',
      '"baz" was not found in "de", "en", "it"',
      '"nested.translation.lock" was not found in "de", "en", "it"'
    ]);
  });

  it('handleMissingTranslations throws if throwMissingTranslations is set', function() {
    const logs = [];
    const reducer = new subject('src');
    reducer.options.throwMissingTranslations = true;

    reducer._log = msg => logs.push(msg);

    expect(() => reducer.handleMissingTranslations(reducer.findMissingTranslations(this.fixture)))
      .throws(`Missing translations:
- "foo" was not found in "it"
- "bar" was not found in "en", "fr", "it"
- "nested.translation.key" was not found in "en", "fr", "it"
- "io" was not found in "de", "it"
- "baz" was not found in "de", "en", "it"
- "nested.translation.lock" was not found in "de", "en", "it"`);
  });

  it('requiresTranslation allows to ignore missing translations', function() {
    const reducer = new subject('src');
    reducer.options.requiresTranslation = (key, locale) =>
      !((key === 'nested.translation.key' && locale === 'fr') || key === 'baz');

    const missing = reducer.findMissingTranslations(this.fixture);

    expect(missing).to.deep.equal([
      ['foo', ['it']],
      ['bar', ['en', 'fr', 'it']],
      ['nested.translation.key', ['en', 'it']],
      ['io', ['de', 'it']],
      ['nested.translation.lock', ['de', 'en', 'it']]
    ]);
  });
});
