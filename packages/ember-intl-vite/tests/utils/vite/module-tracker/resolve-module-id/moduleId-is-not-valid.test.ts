import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | resolve-module-id > moduleId is not valid', function () {
  const moduleTracker = new ModuleTracker();

  assert.strictEqual(moduleTracker.resolveModuleId(''), undefined);

  assert.strictEqual(
    moduleTracker.resolveModuleId('ember-intl/translations/en-us'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/'),
    undefined,
  );
});
