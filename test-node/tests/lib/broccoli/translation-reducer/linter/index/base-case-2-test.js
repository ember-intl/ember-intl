import { expect } from 'chai';
import Linter from 'ember-intl/lib/broccoli/translation-reducer/linter/index.js';

describe('lib | broccoli | translation-reducer | linter | index', function () {
  it('base case (2)', function () {
    const linter = new Linter({
      requiresTranslation() {
        return true;
      },
    });

    const output = linter.lint({
      de: {
        'many-arguments': 'Es ist jetzt {timestamp, time, short}. Na, {name}!',
        'nested-arguments': `{count, plural,
          one {Ein Fehler hat die Speicherung von {modelName} verhindert}
          other {# Fehler hat verhindert, dass {modelName} gespeichert wurden}
        }`,
        nested: {
          key: 'Hallo {name}!',
        },
        'no-arguments': 'Hallo Welt!',
      },
      en: {
        'many-arguments': 'Hello {name}! It is now {timestamp, time, short}.',
        'nested-arguments': `{count, plural,
          one {There is 1 error. Could not save {modelName}.}
          other {There are # errors. Could not save {modelName}.}
        }`,
        nested: {
          key: 'Hello {name}!',
        },
        'no-arguments': 'Hello world!',
      },
    });

    expect(output).to.deep.equal({
      icuMismatch: [],
      missingTranslations: [],
    });
  });
});
