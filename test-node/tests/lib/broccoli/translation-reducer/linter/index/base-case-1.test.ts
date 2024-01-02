// @ts-expect-error: Could not find a declaration file
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | index > base case (1)', function () {
  const linter = new Linter({
    requiresTranslation() {
      return true;
    },
  });

  const output = linter.lint({
    de: {},
    en: {},
  });

  assert.deepStrictEqual(output, {
    icuMismatch: [],
    missingTranslations: [],
  });
});
