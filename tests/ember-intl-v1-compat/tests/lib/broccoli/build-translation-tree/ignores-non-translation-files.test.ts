import { assert, loadFixture, test } from '@codemod-utils/tests';
import buildTranslationTree from '@ember-intl/v1-compat/lib/broccoli/build-translation-tree.js';

import { buildTranslationsDir } from '../../../helpers/index.js';

test('lib | broccoli | build-translation-tree > ignores non-translation files in the project translations folder', async function () {
  // Reproduces https://github.com/ember-intl/ember-intl/issues/2153
  //
  // An empty `.gitkeep` (used to keep an empty translations folder in git)
  // must not be treated as a translation file. Otherwise it ends up in the
  // merged tree, the reducer derives an empty locale from its filename, and
  // the inlined `translations.js` array contains a `["", {}]` entry — which
  // makes @formatjs/intl throw INVALID_CONFIG at runtime.
  const inputProject = {
    translations: {
      '.gitkeep': '',
      'en-us.json': `{ "no-arguments": "Hello world!" }`,
    },
  };

  const projectRoot = 'tmp/broccoli_merge_trees';

  loadFixture(inputProject, { projectRoot });

  const project = {
    addons: [],
    root: projectRoot,
  };

  const [outputNode] = buildTranslationTree(project, 'translations', () => {});

  const translationsDir = await buildTranslationsDir(outputNode);

  assert.deepStrictEqual(translationsDir, {
    'en-us.json': `{ "no-arguments": "Hello world!" }`,
  });
});
