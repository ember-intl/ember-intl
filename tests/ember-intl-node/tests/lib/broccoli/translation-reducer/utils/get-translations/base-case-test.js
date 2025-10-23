import { join } from 'node:path';

import { createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';
import getTranslations from 'ember-intl/lib/broccoli/translation-reducer/utils/get-translations.js';

describe('lib | broccoli | translation-reducer | utils | get-translations', function () {
  it('file extension is json', async function () {
    const input = await createTempDir();

    try {
      input.write({
        'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
        'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      });

      const translations = getTranslations(join(input.path(), 'de-de.json'));

      expect(translations).to.deep.equal({
        nested: {
          key: 'Hallo {name}!',
        },
        'no-arguments': 'Hallo Welt!',
      });
    } finally {
      await input.dispose();
    }
  });

  it('file extension is yaml', async function () {
    const input = await createTempDir();

    try {
      input.write({
        'de-de.yaml': [
          `nested:`,
          `  key: "Hallo {name}!"`,
          `no-arguments: Hallo Welt!`,
        ].join('\n'),
        'en-us.yaml': [
          `nested:`,
          `  key: "Hello {name}!"`,
          `no-arguments: Hello world!`,
        ].join('\n'),
      });

      const translations = getTranslations(join(input.path(), 'en-us.yaml'));

      expect(translations).to.deep.equal({
        nested: {
          key: 'Hello {name}!',
        },
        'no-arguments': 'Hello world!',
      });
    } finally {
      await input.dispose();
    }
  });

  it('file extension is yml', async function () {
    const input = await createTempDir();

    try {
      input.write({
        'de-de.yml': [
          `nested:`,
          `  key: "Hallo {name}!"`,
          `no-arguments: Hallo Welt!`,
        ].join('\n'),
        'en-us.yml': [
          `nested:`,
          `  key: "Hello {name}!"`,
          `no-arguments: Hello world!`,
        ].join('\n'),
      });

      const translations = getTranslations(join(input.path(), 'de-de.yml'));

      expect(translations).to.deep.equal({
        nested: {
          key: 'Hallo {name}!',
        },
        'no-arguments': 'Hallo Welt!',
      });
    } finally {
      await input.dispose();
    }
  });
});
