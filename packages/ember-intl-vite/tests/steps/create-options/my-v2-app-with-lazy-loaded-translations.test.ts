import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app-with-lazy-loaded-translations/index.js';
import {
  options,
  projectRoot,
} from '../../helpers/shared-test-setups/my-v2-app-with-lazy-loaded-translations.js';

test('steps | create-options > my-v2-app-with-lazy-loaded-translations', async function () {
  loadFixture(inputProject, { projectRoot });

  assert.deepStrictEqual(await createOptions(projectRoot), options);
});
