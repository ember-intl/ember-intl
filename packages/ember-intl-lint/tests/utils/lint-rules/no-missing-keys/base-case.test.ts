import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import type { Project } from '../../../../src/types/index.js';
import { noMissingKeys } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-missing-keys > base case', function () {
  const translations: Project['translations'] = new Map();

  const project = normalizeProject({
    availableKeys: findAvailableKeys(translations),
    translationFiles: new Map(),
    translations,
    usedKeys: new Set(),
  });

  const lintErrors = noMissingKeys(project, {}, options);

  assert.deepStrictEqual(lintErrors, []);
});
