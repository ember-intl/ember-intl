import { assert, loadFixture, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

import { buildTranslationsDir } from '../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | base case > mergeTranslationFiles is true', async function () {
  const inputProject = {
    'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
    'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
  };

  const projectRoot = 'tmp/broccoli_merge_trees';

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer([projectRoot], {
    mergeTranslationFiles: true,
  });

  const translationsDir = await buildTranslationsDir(outputNode);

  assert.deepStrictEqual(translationsDir, {
    'de-de.json': `{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}`,
    'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
    'translations.js':
      'export default [["de-de",{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}],["en-us",{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}]]',
  });
});
