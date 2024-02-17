import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

describe('lib | broccoli | translation-reducer | index | fallbackLocale', function () {
  it('does not overwrite user-provided translations', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        fallbackLocale: 'en-us',
      });

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

  it('falls back on missing translations, if errorOnMissingTranslations is falsy', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        fallbackLocale: 'en-us',
      });

      input.write({
        'de-de.json': `{}`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(output.read()).to.deep.equal({
          'de-de.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
          'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });

  it('errors on missing translations, if errorOnMissingTranslations is true', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        errorOnMissingTranslations: true,
        fallbackLocale: 'en-us',
      });

      input.write({
        'de-de.json': `{}`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();
      } catch (error) {
        expect(error.message).to.match(
          /"nested\.key" was not found in "de-de"/,
        );

        expect(error.message).match(/"no-arguments" was not found in "de-de"/);
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });
});
