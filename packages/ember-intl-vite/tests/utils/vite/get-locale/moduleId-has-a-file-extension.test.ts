import { assert, test } from '@codemod-utils/tests';

import { getLocale, resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | get-locale > moduleId is valid', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de.js');
  resolveModuleId('virtual:ember-intl/translations/en-us.js');
  resolveModuleId('virtual:ember-intl/translations/es.ts');

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/de-de.js'),
    'de-de.js',
  );

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/en-us.js'),
    'en-us.js',
  );

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/es.ts'),
    'es.ts',
  );
});
