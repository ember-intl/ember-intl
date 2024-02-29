import { createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

const fixtureWithMissingArguments = {
  de: {
    'key-with-argument': 'Hallo {Name}!',
    'key-with-date': 'Es ist jetzt {time, date, long}.',
    'key-with-plural':
      'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
    'key-with-select':
      '{gender, select, male {Er ist} female {Sie ist} other {Dey ist}} cool.}',
    'key-with-time': 'Es ist jetzt {timestamp, time, short}.',
    nested: {
      key: 'Hallo {name}!',
    },
    'no-arguments': 'Hallo Welt!',
  },
  en: {
    'key-with-argument': 'Hello {name}!',
    'key-with-date': 'It is now {timestamp, date, long}.',
    'key-with-plural': 'You have many photos.',
    'key-with-select':
      '{gender, select, female {She is} male {He is} other {They are}} cool.}',
    'key-with-time': 'It is now {timestamp, time, long}.',
    nested: {
      key: 'Hello {Name}!',
    },
    'no-arguments': 'Hello world!',
  },
};

const fixtureWithMissingTranslations = {
  de: {
    'some.key': 'some value for some.key',
    some: {
      'deeply-nested': {
        key: 'some value for some.deeply-nested.key',
      },
    },
    key1: 'some value for key1',
  },
  en: {
    'some-key': 'some value for some-key',
    'some.key': 'some value for some.key',
    some: {
      'deeply-nested': {
        key: 'some value for some.deeply-nested.key',
      },
    },
  },
  fr: {
    'some.key': 'some value for some.key',
    key1: 'some value for key1',
  },
  it: {},
};

describe('lib | broccoli | translation-reducer | index | handleLintResult', function () {
  it('warns, if verbose is true', async function () {
    const input = await createTempDir();

    try {
      const logs = [];

      const subject = new TranslationReducer(input.path(), {
        log: (message) => {
          logs.push(message);
        },
        verbose: true,
      });

      const lintResults = subject.linter.lint(fixtureWithMissingTranslations);

      subject.handleLintResult(lintResults);

      expect(logs).to.deep.equal([
        '"some\\.key" was not found in "it"',
        '"some.deeply-nested.key" was not found in "fr", "it"',
        '"key1" was not found in "en", "it"',
        '"some-key" was not found in "de", "fr", "it"',
      ]);
    } finally {
      await input.dispose();
    }
  });

  it('errors, if errorOnMissingTranslations is true', async function () {
    const input = await createTempDir();

    try {
      const logs = [];

      const subject = new TranslationReducer(input.path(), {
        errorOnMissingTranslations: true,
        log: (message) => {
          logs.push(message);
        },
      });

      try {
        const lintResults = subject.linter.lint(fixtureWithMissingTranslations);

        subject.handleLintResult(lintResults);
      } catch (error) {
        expect(error.message).to.equal(
          [
            'Missing translations:',
            '- "some\\.key" was not found in "it"',
            '- "some.deeply-nested.key" was not found in "fr", "it"',
            '- "key1" was not found in "en", "it"',
            '- "some-key" was not found in "de", "fr", "it"',
          ].join('\n'),
        );

        expect(logs).to.deep.equal([]);
      }
    } finally {
      await input.dispose();
    }
  });

  it('errors, if errorOnNamedArgumentMismatch is true', async function () {
    const input = await createTempDir();

    try {
      const logs = [];

      const subject = new TranslationReducer(input.path(), {
        errorOnNamedArgumentMismatch: true,
        log: (message) => {
          logs.push(message);
        },
      });

      try {
        const lintResults = subject.linter.lint(fixtureWithMissingArguments);

        subject.handleLintResult(lintResults);
      } catch (error) {
        expect(error.message).to.equal(
          [
            'ICU arguments mismatch:',
            '- "key-with-argument" ICU argument mismatch: "de": "name", "en": "Name"',
            '- "key-with-date" ICU argument mismatch: "de": "timestamp", "en": "time"',
            '- "key-with-plural" ICU argument mismatch: "en": "numPhotos"',
            '- "nested.key" ICU argument mismatch: "de": "Name", "en": "name"',
          ].join('\n'),
        );

        expect(logs).to.deep.equal([]);
      }
    } finally {
      await input.dispose();
    }
  });
});
