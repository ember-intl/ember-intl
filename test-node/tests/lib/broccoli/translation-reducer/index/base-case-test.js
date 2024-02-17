import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

describe('lib | broccoli | translation-reducer | index | base case', function () {
  it('works', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path());

      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(output.read()).to.deep.equal({
          'de-de.json': `{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}`,
          'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });

  it('warns an unknown locale, if verbose is true', async function () {
    const input = await createTempDir();

    try {
      const logs = [];

      const subject = new TranslationReducer(input.path(), {
        log: (message) => {
          logs.push(message);
        },
        verbose: true,
      });

      input.write({
        'UNKNOWN_LANGUAGE.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(logs).to.deep.equal([
          'unknown-language: Unable to detect language data for "unknown". Language code is either unknown or invalid.',
        ]);
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });
});
