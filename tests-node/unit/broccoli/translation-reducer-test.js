'use strict';

let mocha = require('mocha');
let expect = require('chai').expect;

let subject = require('../../../lib/broccoli/translation-reducer');

describe('translation-reducer', function() {
  it('logs missing translations', function() {
    const logs = [];
    const reducer = new subject('src');

    reducer._log = msg => logs.push(msg);

    reducer.findMissingTranslations({
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
    });

    expect(logs).to.deep.equal([
      '"foo" was not found in "it"',
      '"bar" was not found in "en", "fr", "it"',
      '"nested.translation.key" was not found in "en", "fr", "it"',
      '"io" was not found in "de", "it"',
      '"baz" was not found in "de", "en", "it"',
      '"nested.translation.lock" was not found in "de", "en", "it"'
    ]);
  });
});
