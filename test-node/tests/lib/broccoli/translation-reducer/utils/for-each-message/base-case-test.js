import { expect } from 'chai';
import forEachMessage from 'ember-intl/lib/broccoli/translation-reducer/utils/for-each-message.js';

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
