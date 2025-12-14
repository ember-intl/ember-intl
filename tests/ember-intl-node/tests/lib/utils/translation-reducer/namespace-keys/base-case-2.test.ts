import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import namespaceKeys from '@ember-intl/v1-compat/lib/utils/translation-reducer/namespace-keys.js';

test('lib | utils | translation-reducer | namespace-keys > base case (2)', function () {
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

  const inputProject = {
    translations,
  };

  const projectRoot = 'tmp/my-app';
  const inputPath = join(projectRoot, 'translations');

  loadFixture(inputProject, { projectRoot });

  const output = namespaceKeys(translations, {
    addonNames: [],
    filePath: join(projectRoot, 'translations/en-us.json'),
    inputPath,
  });

  assert.deepStrictEqual(output, {
    'some-key': 'some value for some-key',
    'some.key': 'some value for some.key',
    some: {
      'deeply-nested': {
        key: 'some value for some.deeply-nested.key',
      },
    },
    key1: 'some value for key1',
  });
});
