import forEachMessage from '@ember-intl/v1-compat/lib/broccoli/translation-reducer/utils/for-each-message.js';
import { expect } from 'chai';

describe('lib | broccoli | translation-reducer | utils | for-each-message', function () {
  it('base case', function () {
    const translations = {
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    };

    const keys = [];
    const values = [];

    forEachMessage(translations, (key, value) => {
      keys.push(key);
      values.push(value);
    });

    expect(keys).to.deep.equal([
      'some-key',
      'some\\.key',
      'some.deeply-nested.key',
      'key1',
    ]);

    expect(values).to.deep.equal([
      'some value for some-key',
      'some value for some.key',
      'some value for some.deeply-nested.key',
      'some value for key1',
    ]);
  });
});
