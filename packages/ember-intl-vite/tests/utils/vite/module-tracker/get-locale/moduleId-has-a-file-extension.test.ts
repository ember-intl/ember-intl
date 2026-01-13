import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | get-locale > moduleId is valid', function () {
  const moduleTracker = new ModuleTracker();

  moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de.js');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us.js');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/es.ts');

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/de-de.js'),
    'de-de.js',
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/en-us.js'),
    'en-us.js',
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/es.ts'),
    'es.ts',
  );
});
