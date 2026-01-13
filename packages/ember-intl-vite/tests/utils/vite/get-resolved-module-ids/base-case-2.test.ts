import { assert, test } from '@codemod-utils/tests';

import {
  getResolvedModuleIds,
  resolveModuleId,
} from '../../../../src/utils/vite.js';

test('utils | vite | get-resolve-module-ids > base case (2)', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de');
  resolveModuleId('virtual:ember-intl/translations/en-us');
  resolveModuleId('virtual:ember-intl/translations/es');

  assert.deepStrictEqual(getResolvedModuleIds(), [
    '\0virtual:ember-intl/translations/de-de',
    '\0virtual:ember-intl/translations/en-us',
    '\0virtual:ember-intl/translations/es',
  ]);
});
