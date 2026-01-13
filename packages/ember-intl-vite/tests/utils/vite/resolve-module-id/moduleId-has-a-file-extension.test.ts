import { assert, test } from '@codemod-utils/tests';

import { resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | resolve-module-id > moduleId has a file extension', function () {
  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/de-de.js'),
    '\0virtual:ember-intl/translations/de-de.js',
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/en-us.js'),
    '\0virtual:ember-intl/translations/en-us.js',
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/es.ts'),
    '\0virtual:ember-intl/translations/es.ts',
  );
});
