// @ts-expect-error: Could not find a declaration file
import findMissingICUArguments from 'ember-intl/lib/broccoli/translation-reducer/linter/find-missing-icu-arguments.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | find-missing-icu-arguments > there are no ICU arguments', function () {
  const allIcuArguments = {
    'some-key': [],
  };

  const icuArguments = {
    de: {
      'some-key': [],
    },
    en: {
      'some-key': [],
    },
  };

  const locales = ['de', 'en'];

  const output = findMissingICUArguments(
    'some-key',
    allIcuArguments,
    locales,
    icuArguments,
  );

  assert.deepStrictEqual(output, []);
});
