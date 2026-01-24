import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { normalizeProject } from '../../helpers/index.js';

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

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      translationFiles: new Map(),
      translations: new Map(),
    }),
  );
});
