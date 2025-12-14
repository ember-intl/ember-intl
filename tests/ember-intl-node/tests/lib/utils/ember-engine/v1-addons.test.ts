import { assert, test } from '@codemod-utils/tests';
import findEngine from '@ember-intl/v1-compat/lib/utils/ember-engine.js';

test('lib | utils | ember-engine | v1 addons', function () {
  const addon = {
    pkg: {
      name: 'my-v1-addon',
      keywords: ['ember-addon'],
    },
  };

  const output = findEngine(addon);

  assert.deepStrictEqual(output, undefined);
});
