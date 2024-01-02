// @ts-expect-error: Could not find a declaration file
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | find-missing-translations > all locales have the key', function () {
  const localeKeys = [
    ['de', ['some-key']],
    ['en', ['some-key']],
  ];

  const output = findMissingTranslations('some-key', localeKeys);

  assert.deepStrictEqual(output, []);
});
