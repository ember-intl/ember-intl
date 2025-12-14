import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import namespaceKeys from '@ember-intl/v1-compat/lib/utils/translation-reducer/namespace-keys.js';

test('lib | utils | translation-reducer | namespace-keys > without a namespaced addon name (2)', function () {
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

  let output = namespaceKeys(translations, {
    addonNames: ['my-addon'],
    filePath: join(inputPath, 'my-addon/en-us.json'),
    inputPath,
  });

  assert.deepStrictEqual(output, {
    'my-addon': {
      'some-key': 'some value for some-key',
      'some.key': 'some value for some.key',
      some: {
        'deeply-nested': {
          key: 'some value for some.deeply-nested.key',
        },
      },
      key1: 'some value for key1',
    },
  });

  // Check nested translations
  output = namespaceKeys(translations, {
    addonNames: ['my-addon'],
    filePath: join(inputPath, 'my-addon/components/hello/en-us.json'),
    inputPath,
  });

  assert.deepStrictEqual(output, {
    'my-addon': {
      components: {
        hello: {
          'some-key': 'some value for some-key',
          'some.key': 'some value for some.key',
          some: {
            'deeply-nested': {
              key: 'some value for some.deeply-nested.key',
            },
          },
          key1: 'some value for key1',
        },
      },
    },
  });

  // Check scoped packages
  output = namespaceKeys(translations, {
    addonNames: ['@my-org/my-addon'],
    filePath: join(inputPath, '@my-org/my-addon/en-us.json'),
    inputPath,
  });

  assert.deepStrictEqual(output, {
    '@my-org': {
      'my-addon': {
        'some-key': 'some value for some-key',
        'some.key': 'some value for some.key',
        some: {
          'deeply-nested': {
            key: 'some value for some.deeply-nested.key',
          },
        },
        key1: 'some value for key1',
      },
    },
  });
});
