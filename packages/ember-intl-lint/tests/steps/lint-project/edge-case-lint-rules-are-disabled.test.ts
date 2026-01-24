import { assert, loadFixture, test } from '@codemod-utils/tests';

import { lintProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app/index.js';
import { normalizeProject } from '../../helpers/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | lint-project > edge-case (lint rules are disabled)', function () {
  const options = {
    config: {
      addonPaths: [],
      buildOptions: {
        fallbackLocale: undefined,
        inputPath: 'translations',
        wrapTranslationsWithNamespace: false,
      },
      lintRules: {
        'no-inconsistent-messages': false,
        'no-missing-keys': false,
        'no-unused-keys': false,
      },
    },
    fix: false,
    projectRoot: 'tmp/my-v2-app',
    src: 'app' as const,
  };

  loadFixture(inputProject, codemodOptions);

  const project = normalizeProject({
    availableKeys: new Map(),
    translationFiles: new Map(),
    usedKeys: new Set(),
  });

  const lintResults = lintProject(project, options);

  assert.deepStrictEqual(lintResults, {});
});
