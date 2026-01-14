import { join } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';
import getTranslations from '@ember-intl/v1-compat/lib/utils/translation-reducer/get-translations.js';

test('lib | utils | translation-reducer | get-translations > file extension is .json', function () {
  const inputProject = {
    translations: {
      'de-de.json': `{ "nested": { "key": "Hallo {name}!" }, "no-arguments": "Hallo Welt!" }`,
      'en-us.json': `{ "nested": { "key": "Hello {name}!" }, "no-arguments": "Hello world!" }`,
      'es.json': ``,
    },
  };

  const projectRoot = 'tmp/my-app';
  const inputPath = join(projectRoot, 'translations');

  loadFixture(inputProject, { projectRoot });

  let output = getTranslations(join(inputPath, 'de-de.json'));

  assert.deepStrictEqual(output, {
    nested: {
      key: 'Hallo {name}!',
    },
    'no-arguments': 'Hallo Welt!',
  });

  output = getTranslations(join(inputPath, 'es.json'));

  assert.deepStrictEqual(output, {});
});
