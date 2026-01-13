import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | resolve-module-id > moduleId is valid', function () {
  const moduleTracker = new ModuleTracker();

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de'),
    '\0virtual:ember-intl/translations/de-de',
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us'),
    '\0virtual:ember-intl/translations/en-us',
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/es'),
    '\0virtual:ember-intl/translations/es',
  );
});
