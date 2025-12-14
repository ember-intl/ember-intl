import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

import { buildTranslationsDir } from '../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | fallbackLocale > does not overwrite user-provided translations', async function () {
  const inputProject = {
    'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
    'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
  };

  const projectRoot = 'tmp/broccoli_merge_trees';
  const inputPath = join(projectRoot);

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer(inputPath, {
    fallbackLocale: 'en-us',
  });

  const translationsDir = await buildTranslationsDir(outputNode);

  assert.deepStrictEqual(translationsDir, {
    'de-de.json': `{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}`,
    'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
  });
});
