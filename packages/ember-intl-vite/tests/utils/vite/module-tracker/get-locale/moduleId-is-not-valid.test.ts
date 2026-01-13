import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | get-locale > moduleId is not valid', function () {
  const moduleTracker = new ModuleTracker();

  moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us');
  moduleTracker.resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(moduleTracker.getLocale('\0'), undefined);

  assert.strictEqual(
    moduleTracker.getLocale('\0ember-intl/translations/en-us'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('virtual:ember-intl/translations/de-de'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('virtual:ember-intl/translations/en-us'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/en'),
    undefined,
  );

  assert.strictEqual(
    moduleTracker.getLocale('\0virtual:ember-intl/translations/es-es'),
    undefined,
  );
});
