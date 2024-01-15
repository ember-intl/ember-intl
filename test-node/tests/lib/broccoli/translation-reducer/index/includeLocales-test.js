import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

describe('lib | broccoli | translation-reducer | index | includeLocales', function () {
  it('includes only the specified locales', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        includeLocales: ['en-us'],
      });

      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(output.read()).to.deep.equal({
          'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });

  it('is case-insensitive', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        includeLocales: ['de-DE', 'en-US'],
      });

      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-US.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
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
});
