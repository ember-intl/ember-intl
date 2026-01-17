import { assert, loadFixture, test } from '@codemod-utils/tests';

import { lintProject } from '../../../src/steps/index.js';
import { normalizeProject } from '../../helpers/index.js';

test('steps | lint-project > base case', function () {
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

  const project = normalizeProject({
    availableKeys: new Map(),
    locales: [],
    translationFiles: new Map(),
    usedKeys: new Map(),
  });

  const lintResults = lintProject(project, options);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });
});
