// @ts-expect-error: Could not find a declaration file
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | linter | index > we can match ICU arguments by name', function () {
  const linter = new Linter({
    requiresTranslation() {
      return true;
    },
  });

  const output = linter.lint({
    de: {
      'many-arguments': 'Es ist jetzt {time, time, short}. Na, {name}!',
      'nested-arguments': `{count, plural,
        one {Ein Fehler hat die Speicherung von {modelName} verhindert}
        other {# Fehler hat verhindert, dass {modelName} gespeichert wurden}
      }`,
      nested: {
        key: 'Hallo name!',
      },
    },
    en: {
      'many-arguments': 'Hello {name}! It is now {timestamp, time, short}.',
      'nested-arguments': `{count, plural,
        one {There is 1 error.}
        other {There are # errors.}
      }`,
      nested: {
        key: 'Hello {name}!',
      },
    },
    es: {
      'many-arguments': 'Hola {name}! Ahora son {timestamp, time, short}.',
      'nested-arguments': '',
      nested: {
        key: '¡Hola {Name}!',
      },
    },
  });

  assert.deepStrictEqual(output, {
    icuMismatch: [
      [
        'many-arguments',
        [
          ['de', ['timestamp']],
          ['en', ['time']],
          ['es', ['time']],
        ],
      ],
      [
        'nested-arguments',
        [
          ['en', ['modelName']],
          ['es', ['count', 'modelName']],
        ],
      ],
      [
        'nested.key',
        [
          ['de', ['name', 'Name']],
          ['en', ['Name']],
          ['es', ['name']],
        ],
      ],
    ],
    missingTranslations: [],
  });
});
