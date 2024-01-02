// @ts-expect-error: Could not find a declaration file
import findMissingICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | find-missing-icu-arguments > some ICU arguments are missing', function () {
  const allIcuArguments = {
    'some-key': ['timestamp', 'name', 'numPhotos'],
  };

  const icuArguments = {
    de: {
      'some-key': ['name', 'timestamp'],
    },
    en: {
      'some-key': ['name'],
    },
  };

  const locales = ['de', 'en'];

  const output = findMissingICUArguments(
    'some-key',
    allIcuArguments,
    locales,
    icuArguments,
  );

  assert.deepStrictEqual(output, [
    ['de', ['numPhotos']],
    ['en', ['timestamp', 'numPhotos']],
  ]);
});
