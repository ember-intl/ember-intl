import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v7-v1-addon/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v7-v1-addon.js';

test('index > v7-v1-addon', async function () {
  loadFixture(inputProject, codemodOptions);

  const todos = await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  assert.deepEqual(todos, [
    "The codemod added `@ember-intl/lint` to `package.json`. If the script `lint:intl` doesn't pass, then run `lint:intl:fix` to create `ember-intl.config.mjs`.",
    'The codemod moved `app/formats.js` to `app/ember-intl.js`. Import `formats` from `app/ember-intl.js`. Then, pass it to the `intl` service by calling `setFormats`.',
  ]);
});
