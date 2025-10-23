import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/index.js';
import { createTempDir } from 'broccoli-test-helper';
import { expect } from 'chai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fixtureDir = join(
  __dirname,
  '../../../../fixtures/broccoli/translation-reducer/index',
);

describe('lib | broccoli | translation-reducer | index | mergeTranslations', function () {
  it('handles nested translations (wrapTranslationsWithNamespace is false in app, translations from app)', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        addonsWithTranslations: [],
      });

      let translations = subject.mergeTranslations([
        join(fixtureDir, 'my-app/components/hello/en-us.yaml'),
        join(fixtureDir, 'my-app/components/en-us.yaml'),
        join(fixtureDir, 'my-app/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          foo: 'bar',
          message: 'Hello, {name}!',
          title: 'Homepage',
        },
      });

      // Check order dependency
      translations = subject.mergeTranslations([
        join(fixtureDir, 'my-app/en-us.yaml'),
        join(fixtureDir, 'my-app/components/en-us.yaml'),
        join(fixtureDir, 'my-app/components/hello/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          foo: 'bar',
          message: 'Hello, {name}!',
          title: '<Hello> component',
        },
      });
    } finally {
      await input.dispose();
    }
  });

  it('handles nested translations (wrapTranslationsWithNamespace is true in app, translations from app)', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        addonsWithTranslations: [],
        wrapTranslationsWithNamespace: true,
      });

      subject.inputPaths = [`${fixtureDir}/my-app`];

      const translations = subject.mergeTranslations([
        join(fixtureDir, 'my-app/components/hello/en-us.yaml'),
        join(fixtureDir, 'my-app/components/en-us.yaml'),
        join(fixtureDir, 'my-app/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          components: {
            foo: 'bar',
            hello: {
              message: 'Hello, {name}!',
              title: '<Hello> component',
            },
            title: 'Components',
          },
          title: 'Homepage',
        },
      });
    } finally {
      await input.dispose();
    }
  });

  it('handles nested translations (wrapTranslationsWithNamespace is false in app, translations from addon)', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        addonsWithTranslations: ['my-v1-addon'],
      });

      subject.inputPaths = [fixtureDir];

      let translations = subject.mergeTranslations([
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/hello/en-us.yaml',
        ),
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/en-us.yaml',
        ),
        join(fixtureDir, '__ember-intl-addon__/my-v1-addon/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          foo: 'bar',
          message: 'Hello, {name}!',
          title: 'Homepage',
        },
      });

      // Check order dependency
      translations = subject.mergeTranslations([
        join(fixtureDir, '__ember-intl-addon__/my-v1-addon/en-us.yaml'),
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/en-us.yaml',
        ),
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/hello/en-us.yaml',
        ),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          foo: 'bar',
          message: 'Hello, {name}!',
          title: '<Hello> component',
        },
      });
    } finally {
      await input.dispose();
    }
  });

  it('handles nested translations (wrapTranslationsWithNamespace is true in app, translations from addon)', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path(), {
        addonsWithTranslations: ['my-v1-addon'],
        wrapTranslationsWithNamespace: true,
      });

      subject.inputPaths = [fixtureDir];

      const translations = subject.mergeTranslations([
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/hello/en-us.yaml',
        ),
        join(
          fixtureDir,
          '__ember-intl-addon__/my-v1-addon/components/en-us.yaml',
        ),
        join(fixtureDir, '__ember-intl-addon__/my-v1-addon/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'en-us': {
          components: {
            foo: 'bar',
            hello: {
              message: 'Hello, {name}!',
              title: '<Hello> component',
            },
            title: 'Components',
          },
          title: 'Homepage',
        },
      });
    } finally {
      await input.dispose();
    }
  });

  it('does not remove empty translations', async function () {
    const input = await createTempDir();

    try {
      const subject = new TranslationReducer(input.path());

      const translations = subject.mergeTranslations([
        join(fixtureDir, 'strip-empty-translations/de-de.yaml'),
        join(fixtureDir, 'strip-empty-translations/en-us.yaml'),
      ]);

      expect(translations).to.deep.equal({
        'de-de': {
          sample_translation: {
            translation_1: 'Lorem ipsum',
            translation_2: '',
            translation_3: null,
          },
        },
        'en-us': {
          sample_translation: {
            translation_1: 'Lorem ipsum',
            translation_2: 'dolor sit amet',
          },
        },
      });
    } finally {
      await input.dispose();
    }
  });
});
