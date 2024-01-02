// @ts-expect-error: Could not find a declaration file
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | index > we can ignore missing translations', function () {
  const linter = new Linter({
    requiresTranslation(key: string, locale: string) {
      if (key === 'key-with-time') {
        return false;
      }

      if (locale === 'es') {
        return false;
      }

      return true;
    },
  });

  const output = linter.lint({
    de: {
      'key-with-argument': 'Hallo {name}!',
      nested: {
        key: 'Hallo {name}!',
      },
    },
    en: {
      'key-with-argument': 'Hello {name}!',
    },
    es: {
      'key-with-time': 'Es ist jetzt {timestamp, time, short}.',
    },
  });

  assert.deepStrictEqual(output, {
    icuMismatch: [],
    missingTranslations: [['nested.key', ['en']]],
  });
});
