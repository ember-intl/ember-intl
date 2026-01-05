import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-v1-addon/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v1-addon.js';

test('index > my-v1-addon', async function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [
      {
        details:
          '  - Found in translations/routes/index/de-de.yml, translations/routes/index/en-us.yml',
        key: 'routes.index.key-to-overwrite',
      },
    ],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [],
    'no-missing-keys': [],
    'no-unused-keys': [
      {
        details:
          '  - Found in translations/routes/index/de-de.yml, translations/routes/index/en-us.yml',
        key: 'routes.index.key-to-overwrite',
      },
    ],
  });

  assertFixture(outputProject, codemodOptions);
});
