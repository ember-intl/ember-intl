// @ts-expect-error: Could not find a declaration file
import blueprint from 'ember-intl/blueprints/translation/index.js';

import { assert, test } from '../../helpers/index.js';

test('blueprints | translation > beforeInstall (locale is valid)', function () {
  const output = blueprint.beforeInstall({
    entity: {
      name: 'de-de',
    },
  });

  assert.strictEqual(output, undefined);
});
