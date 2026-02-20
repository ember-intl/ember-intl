import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../fixtures/my-v2-app-with-fallbacks/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-app-with-fallbacks.js';

test('index > my-v2-app-with-fallbacks', async function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [
      'routes.index.title (missing translation: en-us)',
    ],
    'no-missing-keys': [],
    'no-unused-keys': [
      'components.title',
      'components.translation-with-arguments.message',
      'components.translation-with-arguments.title',
      'routes.application.title',
      'routes.index.key-to-overwrite',
      'routes.index.title',
    ],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [
      'routes.index.title (missing translation: en-us)',
    ],
    'no-missing-keys': [],
    'no-unused-keys': [
      'components.title',
      'components.translation-with-arguments.message',
      'components.translation-with-arguments.title',
      'routes.application.title',
      'routes.index.key-to-overwrite',
      'routes.index.title',
    ],
  });

  assertFixture(outputProject, codemodOptions);
});
