import { join } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import {
  isTranslationFile,
  resolveModuleId,
} from '../../../../src/utils/vite.js';
import {
  options,
  projectRoot,
} from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | vite | is-translation-file > edge case (locale is new)', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de');
  resolveModuleId('virtual:ember-intl/translations/en-us');
  resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/de.yml'),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/en-gb.yaml'),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/es-es.json'),
      options,
    ),
    true,
  );
});
