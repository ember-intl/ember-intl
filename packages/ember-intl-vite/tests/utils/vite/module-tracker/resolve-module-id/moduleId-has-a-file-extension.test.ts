import { assert, test } from '@codemod-utils/tests';

import { ModuleTracker } from '../../../../../src/utils/vite.js';

test('utils | vite | module-tracker | resolve-module-id > moduleId has a file extension', function () {
  const moduleTracker = new ModuleTracker();

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/de-de.js'),
    '\0virtual:ember-intl/translations/de-de.js',
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/en-us.js'),
    '\0virtual:ember-intl/translations/en-us.js',
  );

  assert.strictEqual(
    moduleTracker.resolveModuleId('virtual:ember-intl/translations/es.ts'),
    '\0virtual:ember-intl/translations/es.ts',
  );
});
