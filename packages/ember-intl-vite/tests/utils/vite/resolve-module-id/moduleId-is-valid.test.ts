import { assert, test } from '@codemod-utils/tests';

import { resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | resolve-module-id > moduleId is valid', function () {
  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/de-de'),
    '\0virtual:ember-intl/translations/de-de',
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/en-us'),
    '\0virtual:ember-intl/translations/en-us',
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/es'),
    '\0virtual:ember-intl/translations/es',
  );
});
