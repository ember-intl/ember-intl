import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | get-locale > moduleId is valid', function () {
  const moduleTracker = new ModuleTracker();

  moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/de-de'),
    'de-de',
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/en-us'),
    'en-us',
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/es'),
    'es',
  );
});
