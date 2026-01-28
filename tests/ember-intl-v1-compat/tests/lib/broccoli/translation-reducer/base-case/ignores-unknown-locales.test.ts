import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

import { buildTranslationsDir } from '../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | base case > ignores unknown locales', async function () {
  const inputProject = {
    'UNKNOWN_LANGUAGE.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
    'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
  };

  const projectRoot = 'tmp/broccoli_merge_trees';
  const inputPath = join(projectRoot);

  loadFixture(inputProject, { projectRoot });

  const logs: string[] = [];

  const outputNode = new TranslationReducer(inputPath, {
    log: (message: string) => {
      logs.push(message);
    },
  });

  const translationsDir = await buildTranslationsDir(outputNode);

  assert.deepStrictEqual(translationsDir, {
    'en-us.json': `{"nested":{"key":"Hello {name}!"},"no-arguments":"Hello world!"}`,
    'unknown-language.json':
      '{"nested":{"key":"Hallo {name}!"},"no-arguments":"Hallo Welt!"}',
  });

  assert.deepStrictEqual(logs, []);
});
