import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/v7-v2-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/v7-v2-app.js';

test('index > v7-v2-app', async function () {
  loadFixture(inputProject, codemodOptions);

  const todos = await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  assert.deepEqual(todos, [
    "The codemod added `@ember-intl/lint` to `package.json`. If the script `lint:intl` doesn't pass, then run `lint:intl:fix` to create `ember-intl.config.mjs`.",
    'The codemod added `@ember-intl/vite` to `package.json`. In `app/routes/application.{js,ts}`, import translations from virtual modules. Then, pass them to the `intl` service by calling `addTranslations`. In `tsconfig.json`, add `@ember-intl/vite/virtual` to `compilerOptions.types`. In `vite.config.{mjs,mts}`, add `loadTranslations` to the list of plugins.',
  ]);
});
