import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import TranslationReducer from 'ember-intl/lib/broccoli/translation-reducer/index.js';

describe('lib | broccoli | translation-reducer | index | excludeLocales', function () {
  it('includes only the specified locales', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        excludeLocales: ['en-us'],
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
        excludeLocales: ['de-DE', 'en-US'],
      });

      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-US.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(output.read()).to.deep.equal({});
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });

  it('supercedes includeLocales', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        excludeLocales: ['en-us'],
        includeLocales: ['de-de', 'en-us'],
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
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });
});
