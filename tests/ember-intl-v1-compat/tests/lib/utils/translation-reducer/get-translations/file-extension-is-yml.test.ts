import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import getTranslations from '@ember-intl/v1-compat/lib/utils/translation-reducer/get-translations.js';

test('lib | utils | translation-reducer | get-translations > file extension is .yml', function () {
  const inputProject = {
    translations: {
      'de-de.yml': normalizeFile([
        `nested:`,
        `  key: "Hallo {name}!"`,
        `no-arguments: Hallo Welt!`,
      ]),
      'en-us.yml': normalizeFile([
        `nested:`,
        `  key: "Hello {name}!"`,
        `no-arguments: Hello world!`,
      ]),
      'es.yml': ``,
    },
  };

  const projectRoot = 'tmp/my-app';
  const inputPath = join(projectRoot, 'translations');

  loadFixture(inputProject, { projectRoot });

  let output = getTranslations(join(inputPath, 'de-de.yml'));

  assert.deepStrictEqual(output, {
    nested: {
      key: 'Hallo {name}!',
    },
    'no-arguments': 'Hallo Welt!',
  });

  output = getTranslations(join(inputPath, 'es.yml'));

  assert.deepStrictEqual(output, {});
});
