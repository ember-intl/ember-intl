import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/index.js';
import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';

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

  it('falls back on missing translations', async function () {
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
});
