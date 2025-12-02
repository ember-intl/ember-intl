import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/index.js';
import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';

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

  it('combines the output into a single translation.js file when specified', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        mergeTranslationFiles: true,
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
          'translations.js':
            'export default [["de-de",{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}],["en-us",{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}]]',
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });

  it('ignores unknown locales', async function () {
    const input = await createTempDir();

    try {
      const logs = [];

      const subject = new TranslationReducer(input.path(), {
        log: (message) => {
          logs.push(message);
        },
      });

      input.write({
        'UNKNOWN_LANGUAGE.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(logs).to.deep.equal([]);
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });
});
