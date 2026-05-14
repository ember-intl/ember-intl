import { assert, test } from '@codemod-utils/tests';

import { SOURCE } from '../../../src/utils/ember.js';

test('utils | ember > it exists', function () {
  assert.deepStrictEqual(SOURCE, {
    node: undefined,
    'v1-addon': 'addon',
    'v1-app': 'app',
    'v2-addon': 'src',
    'v2-app': 'app',
  });
});
