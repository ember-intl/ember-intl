import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';

test('steps | analyze-project > base case', function () {
  const inputProject = {};
  const projectRoot = 'tmp/my-v2-app';

  loadFixture(inputProject, { projectRoot });

  const options = {
    config: {
      addonPaths: [],
      buildOptions: {
        fallbackLocale: undefined,
        inputPath: 'translations',
        wrapTranslationsWithNamespace: false,
      },
    },
    projectRoot: 'tmp/my-v2-app',
  };

  const { translations } = analyzeProject(options);

  assert.deepStrictEqual(translations, new Map());
});
