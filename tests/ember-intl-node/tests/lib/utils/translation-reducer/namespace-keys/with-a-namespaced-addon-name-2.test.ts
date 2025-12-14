import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import namespaceKeys from '@ember-intl/v1-compat/lib/utils/translation-reducer/namespace-keys.js';

test('lib | utils | translation-reducer | namespace-keys > with a namespaced addon name (2)', function () {
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
    filePath: join(inputPath, '__ember-intl-addon__/my-addon/en-us.json'),
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

  // Check nested translations
  output = namespaceKeys(translations, {
    addonNames: ['my-addon'],
    filePath: join(
      inputPath,
      '__ember-intl-addon__/my-addon/components/hello/en-us.json',
    ),
    inputPath,
  });

  assert.deepStrictEqual(output, {
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
  });

  // Check scoped packages
  output = namespaceKeys(translations, {
    addonNames: ['@my-org/my-addon'],
    filePath: join(
      inputPath,
      '__ember-intl-addon__/@my-org/my-addon/en-us.json',
    ),
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
