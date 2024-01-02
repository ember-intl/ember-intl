// @ts-expect-error: Could not find a declaration file
import isKnownLanguage from 'ember-intl/lib/broccoli/translation-reducer/utils/is-known-language.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | utils | is-known-language > language is known', function () {
  assert.strictEqual(isKnownLanguage('de'), true);
  assert.strictEqual(isKnownLanguage('en'), true);
  assert.strictEqual(isKnownLanguage('es'), true);
});
