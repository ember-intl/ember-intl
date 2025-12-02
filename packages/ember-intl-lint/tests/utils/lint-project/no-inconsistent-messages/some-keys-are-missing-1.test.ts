import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { findIcuArguments } from '../../../../src/utils/icu-message/find-icu-arguments.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-project/index.js';

test('utils | lint-project | no-inconsistent-messages > some keys are missing (1)', function () {
  const project: Project = {
    availableKeys: new Map([
      [
        'key01',
        new Map([
          [
            'translations/de-de.json',
            {
              icuArguments: findIcuArguments('Hallo!'),
              message: 'Hallo!',
            },
          ],
          [
            'translations/en-us.json',
            {
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
            'translations/en-us.json',
            {
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
        },
      ],
      [
        'translations/en-us.json',
        {
          format: 'json',
          isInternal: true,
        },
      ],
      [
        'translations/es-es.json',
        {
          format: 'json',
          isInternal: true,
        },
      ],
      [
        'node_modules/my-v1-addon/translations/de-de.json',
        {
          format: 'json',
          isInternal: false,
        },
      ],
      [
        'node_modules/my-v1-addon/translations/en-us.json',
        {
          format: 'json',
          isInternal: false,
        },
      ],
      [
        'node_modules/my-v2-addon/translations/de-de.json',
        {
          format: 'json',
          isInternal: false,
        },
      ],
      [
        'node_modules/my-v2-addon/translations/en-us.json',
        {
          format: 'json',
          isInternal: false,
        },
      ],
    ]),
    usedKeys: new Map(),
  };

  const keys = noInconsistentMessages(project);

  assert.deepStrictEqual(keys, [
    'key01\n  - Found in translations/de-de.json, translations/en-us.json',
    'key02\n  - Found in translations/en-us.json',
  ]);
});
