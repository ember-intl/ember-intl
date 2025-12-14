import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';
import { createBuilder, createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | outputPath', function () {
  it('writes to outputPath', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        outputPath: 'custom/output/path',
      });

      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const output = createBuilder(subject);

      try {
        await output.build();

        expect(output.read()).to.deep.equal({
          custom: {
            output: {
              path: {
                'de-de.json': `{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}`,
                'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
              },
            },
          },
        });
      } finally {
        await output.dispose();
      }
    } finally {
      await input.dispose();
    }
  });
});
