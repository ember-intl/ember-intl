import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import getTranslations from '@ember-intl/v1-compat/lib/utils/translation-reducer/get-translations.js';

test('lib | utils | translation-reducer | get-translations > yaml file is empty', function () {
  const inputProject = {
    translations: {
      'de-de.yaml': normalizeFile([
        `# components.component-from-app:`,
        `#   message: Dies ist eine Komponente aus der App."`,
      ]),
      'en-us.yaml': normalizeFile([
        `# components.component-from-app:`,
        `#   message: This is a component from the app.`,
      ]),
      'es.yaml': ``,
    },
  };

  const projectRoot = 'tmp/my-app';
  const translationsDir = join(projectRoot, 'translations');

  loadFixture(inputProject, { projectRoot });

  let output = getTranslations(join(translationsDir, 'en-us.yaml'));

  assert.deepStrictEqual(output, {});

  output = getTranslations(join(translationsDir, 'es.yaml'));

  assert.deepStrictEqual(output, {});
});
