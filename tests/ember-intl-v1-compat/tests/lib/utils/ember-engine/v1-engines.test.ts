import { assert, test } from '@codemod-utils/tests';
import findEngine from '@ember-intl/v1-compat/lib/utils/ember-engine.js';

test('lib | utils | ember-engine | v1 engines', function () {
  const addon = {
    pkg: {
      name: 'my-v1-engine',
      keywords: ['ember-addon', 'ember-engine'],
    },
  };

  const output = findEngine(addon);

  assert.deepStrictEqual(output, {
    pkg: {
      name: 'my-v1-engine',
      keywords: ['ember-addon', 'ember-engine'],
    },
  });
});
