// @ts-expect-error: Could not find a declaration file
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | find-missing-translations > key is an empty string', function () {
  const localeKeys = [
    ['de', ['some-key']],
    ['en', ['some-key']],
  ];

  const output = findMissingTranslations('', localeKeys);

  assert.deepStrictEqual(output, ['de', 'en']);
});
