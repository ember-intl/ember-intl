import { assert, test } from '@codemod-utils/tests';

import { getLocale, resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | get-locale > moduleId is valid', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de');
  resolveModuleId('virtual:ember-intl/translations/en-us');
  resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/de-de'),
    'de-de',
  );

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/en-us'),
    'en-us',
  );

  assert.strictEqual(getLocale('\0virtual:ember-intl/translations/es'), 'es');
});
