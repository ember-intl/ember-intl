// @ts-expect-error: Could not find a declaration file
import blueprint from 'ember-intl/blueprints/translation/index.js';

import { assert, test } from '../../helpers/index.js';

test('blueprints | translation > beforeInstall (locale is not valid)', function () {
  assert.throws(
    () => {
      blueprint.beforeInstall({
        entity: {
          name: 'INVALID.LOCALE',
        },
      });
    },
    (error: Error) => {
      assert.strictEqual(
        error.message,
        '[ember-intl] invalid locale format: "INVALID.LOCALE"',
      );

      return true;
    },
  );
});
