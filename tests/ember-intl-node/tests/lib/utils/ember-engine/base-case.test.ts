import { assert, test } from '@codemod-utils/tests';
import findEngine from '@ember-intl/v1-compat/lib/utils/ember-engine.js';

test('lib | utils | ember-engine | base case', function () {
  const addon = {
    pkg: null,
  };

  const output = findEngine(addon);

  assert.deepStrictEqual(output, undefined);
});
