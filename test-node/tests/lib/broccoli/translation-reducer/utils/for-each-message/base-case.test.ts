// @ts-expect-error: Could not find a declaration file
import forEachMessage from 'ember-intl/lib/broccoli/translation-reducer/utils/for-each-message.js';

import { assert, test } from '../../../../../helpers/index.js';

test('lib | broccoli | translation-reducer | utils | for-each-message > base case', function () {
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

  const keys: string[] = [];
  const values: string[] = [];

  forEachMessage(translations, (key: string, value: string) => {
    keys.push(key);
    values.push(value);
  });

  assert.deepStrictEqual(keys, [
    'some-key',
    'some\\.key',
    'some.deeply-nested.key',
    'key1',
  ]);

  assert.deepStrictEqual(values, [
    'some value for some-key',
    'some value for some.key',
    'some value for some.deeply-nested.key',
    'some value for key1',
  ]);
});
