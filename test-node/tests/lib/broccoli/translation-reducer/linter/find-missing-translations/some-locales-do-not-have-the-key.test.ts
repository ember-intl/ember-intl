// @ts-expect-error: Could not find a declaration file
import findMissingTranslations from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-translations.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | find-missing-translations > some locales do not have the key', function () {
  const localeKeys = [
    ['de', ['some-key']],
    ['en', []],
  ];

  const output = findMissingTranslations('some-key', localeKeys);

  assert.deepStrictEqual(output, ['en']);
});
