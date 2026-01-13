import { assert, test } from '@codemod-utils/tests';

import { resolveModuleId } from '../../../../src/utils/vite.js';

test('utils | vite | resolve-module-id > moduleId is not valid', function () {
  assert.strictEqual(resolveModuleId(''), undefined);

  assert.strictEqual(
    resolveModuleId('ember-intl/translations/en-us'),
    undefined,
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations'),
    undefined,
  );

  assert.strictEqual(
    resolveModuleId('virtual:ember-intl/translations/'),
    undefined,
  );
});
