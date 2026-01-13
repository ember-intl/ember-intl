import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/find-icu-arguments.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';

test('utils | lint-rules | no-inconsistent-messages > some keys are missing (1)', function () {
  const project = normalizeProject({
    availableKeys: new Map([
      [
        'key01',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments('Hallo!'),
              message: 'Hallo!',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments('Hello!'),
              message: 'Hello!',
            },
          ],
        ]),
      ],
      [
        'key02',
        new Map([
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments('Hello, {name}!'),
              message: 'Hello, {name}!',
            },
          ],
        ]),
      ],
    ]),
    translationFiles: new Map([
      [
        'translations/de-de.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'de-de',
          translationsDir: 'translations',
        },
      ],
      [
        'translations/en-us.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'en-us',
          translationsDir: 'translations',
        },
      ],
      [
        'translations/es-es.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'es-es',
          translationsDir: 'translations',
        },
      ],
      [
        'node_modules/my-v1-addon/translations/de-de.json',
        {
          format: 'json',
          isInternal: false,
          locale: 'de-de',
          translationsDir: 'translations',
        },
      ],
      [
        'node_modules/my-v1-addon/translations/en-us.json',
        {
          format: 'json',
          isInternal: false,
          locale: 'en-us',
          translationsDir: 'translations',
        },
      ],
      [
        'node_modules/my-v2-addon/translations/de-de.json',
        {
          format: 'json',
          isInternal: false,
          locale: 'de-de',
          translationsDir: 'translations',
        },
      ],
      [
        'node_modules/my-v2-addon/translations/en-us.json',
        {
          format: 'json',
          isInternal: false,
          locale: 'en-us',
          translationsDir: 'translations',
        },
      ],
    ]),
    usedKeys: new Map(),
  });

  const lintErrors = noInconsistentMessages(project);

  assert.deepStrictEqual(lintErrors, ['key01', 'key02']);
});
