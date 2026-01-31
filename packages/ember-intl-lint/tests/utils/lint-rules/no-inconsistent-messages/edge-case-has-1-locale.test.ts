import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-inconsistent-messages > edge case (has 1 locale)', function () {
  const translations = new Map([
    [
      'en-us',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/en-us.json',
            message: 'Hello!',
          },
        ],
        [
          'key02',
          {
            filePath: 'translations/en-us.json',
            message: 'Hello, {name}!',
          },
        ],
        [
          'key03',
          {
            filePath: 'translations/en-us.json',
            message: 'It is now {timestamp, time, short}',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/en-us.json',
            message: 'It is now {timestamp, time, long}',
          },
        ],
        [
          'key05',
          {
            filePath: 'translations/en-us.json',
            message:
              'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}. {proportion, number, ::percent} of them are new.',
          },
        ],
        [
          'key06',
          {
            filePath: 'translations/en-us.json',
            message:
              '<a class="link" href="https://my-domain.com/terms" target="_blank">Terms and Conditions</a>',
          },
        ],
        [
          'key07',
          {
            filePath: 'translations/en-us.json',
            message:
              '<a class="{class}" href="{url}" target="_blank">Terms and Conditions</a>',
          },
        ],
      ]),
    ],
  ]);

  const project = normalizeProject({
    availableKeys: findAvailableKeys(translations),
    translationFiles: new Map([
      [
        'translations/en-us.json',
        {
          isInternal: true,
          locale: 'en-us',
          translationsDir: 'translations',
        },
      ],
    ]),
    translations,
    usedKeys: new Set(),
  });

  const lintErrors = noInconsistentMessages(project, {}, options);

  assert.deepStrictEqual(lintErrors, []);
});
