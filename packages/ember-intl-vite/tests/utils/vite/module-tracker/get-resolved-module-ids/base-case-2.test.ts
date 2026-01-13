import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | get-resolve-module-ids > base case (2)', function () {
  const moduleTracker = new ModuleTracker();

  moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/es');

  assert.deepStrictEqual(moduleTracker.getResolvedModuleIds(), [
    '\0virtual:ember-intl/translations/de-de',
    '\0virtual:ember-intl/translations/en-us',
    '\0virtual:ember-intl/translations/es',
  ]);
});
