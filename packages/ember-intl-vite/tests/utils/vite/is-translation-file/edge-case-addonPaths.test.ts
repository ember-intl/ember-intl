import { join } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import {
  isTranslationFile,
  resolveModuleId,
} from '../../../../src/utils/vite.js';
import {
  options,
  projectRoot,
} from '../../../helpers/shared-test-setups/my-v2-app-with-addonPaths.js';

test('utils | vite | is-translation-file > edge case (addonPaths)', function () {
  resolveModuleId('virtual:ember-intl/translations/de-de');
  resolveModuleId('virtual:ember-intl/translations/en-us');
  resolveModuleId('virtual:ember-intl/translations/es');

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/de-de.yml'),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/en-us.yaml'),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(projectRoot, 'translations/components/es.json'),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(
        projectRoot,
        'node_modules/my-v1-addon/translations/routes/index/de-de.yml',
      ),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(
        projectRoot,
        'node_modules/my-v2-addon/translations/routes/index/en-us.yml',
      ),
      options,
    ),
    true,
  );

  assert.strictEqual(
    isTranslationFile(
      join(
        projectRoot,
        'node_modules/my-addon/translations/routes/index/de-de.yml',
      ),
      options,
    ),
    false,
  );

  assert.strictEqual(
    isTranslationFile(
      join(
        projectRoot,
        'node_modules/my-v2-addon/src/components/select-locale.gts',
      ),
      options,
    ),
    false,
  );
});
