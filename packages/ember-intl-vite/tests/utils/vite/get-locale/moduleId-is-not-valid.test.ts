import { assert, test } from '@codemod-utils/tests';

import { getLocale, resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | get-locale > moduleId is not valid', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de');
  resolveModuleId('virtual:ember-intl/translations/en-us');
  resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(getLocale('\0'), undefined);

  assert.strictEqual(getLocale('\0ember-intl/translations/en-us'), undefined);

  assert.strictEqual(getLocale('\0virtual:ember-intl/translations'), undefined);

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/'),
    undefined,
  );

  assert.strictEqual(
    getLocale('virtual:ember-intl/translations/de-de'),
    undefined,
  );

  assert.strictEqual(
    getLocale('virtual:ember-intl/translations/en-us'),
    undefined,
  );

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/en'),
    undefined,
  );

  assert.strictEqual(
    getLocale('\0virtual:ember-intl/translations/es-es'),
    undefined,
  );
});
