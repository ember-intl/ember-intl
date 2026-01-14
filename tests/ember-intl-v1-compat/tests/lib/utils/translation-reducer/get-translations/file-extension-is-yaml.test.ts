import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import getTranslations from '@ember-intl/v1-compat/lib/utils/translation-reducer/get-translations.js';

test('lib | utils | translation-reducer | get-translations > file extension is .yaml', function () {
  const inputProject = {
    translations: {
      'de-de.yaml': normalizeFile([
        `nested:`,
        `  key: "Hallo {name}!"`,
        `no-arguments: Hallo Welt!`,
      ]),
      'en-us.yaml': normalizeFile([
        `nested:`,
        `  key: "Hello {name}!"`,
        `no-arguments: Hello world!`,
      ]),
      'es.yaml': ``,
    },
  };

  const projectRoot = 'tmp/my-app';
  const inputPath = join(projectRoot, 'translations');

  loadFixture(inputProject, { projectRoot });

  let output = getTranslations(join(inputPath, 'en-us.yaml'));

  assert.deepStrictEqual(output, {
    nested: {
      key: 'Hello {name}!',
    },
    'no-arguments': 'Hello world!',
  });

  output = getTranslations(join(inputPath, 'es.yaml'));

  assert.deepStrictEqual(output, {});
});
