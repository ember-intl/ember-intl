import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { normalizeProject } from '../../helpers/index.js';

test('steps | analyze-project > base case', function () {
  const inputProject = {};

  const codemodOptions = {
    fix: false,
    projectRoot: 'tmp/my-v2-app',
  };

  const options = {
    config: {
      addonPaths: [],
      buildOptions: {
        fallbackLocale: undefined,
        inputPath: 'translations',
        wrapTranslationsWithNamespace: false,
      },
      lintRules: {
        'no-inconsistent-messages': true,
        'no-missing-keys': true,
        'no-unused-keys': true,
      },
    },
    fix: false,
    projectRoot: 'tmp/my-v2-app',
    src: 'app' as const,
  };

  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map(),
      translationFiles: new Map(),
      translations: new Map(),
      usedKeys: new Set(),
    }),
  );
});
