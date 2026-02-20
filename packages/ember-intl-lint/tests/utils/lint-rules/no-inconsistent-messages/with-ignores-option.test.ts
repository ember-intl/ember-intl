import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-inconsistent-messages > with ignores option', function () {
  const translations = new Map([
    [
      'de-de',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/de-de.json',
            message: '{name}',
          },
        ],
        [
          'key02',
          {
            filePath: 'translations/de-de.json',
            message: 'Es ist jetzt {timestamp, time, short}.',
          },
        ],
        [
          'key03',
          {
            filePath: 'translations/de-de.json',
            message:
              'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {percentage}% davon sind neu.',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/de-de.json',
            message:
              '<a href="{url}" rel="noopener noreferrer" target="_blank">AGB</a>',
          },
        ],
      ]),
    ],
    [
      'en-us',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/en-us.json',
            message: 'name',
          },
        ],
        [
          'key02',
          {
            filePath: 'translations/en-us.json',
            message: 'It is now {timestamp, date, short}',
          },
        ],
        [
          'key03',
          {
            filePath: 'translations/en-us.json',
            message:
              'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}. {proportion, number, ::percent} of them are new.',
          },
        ],
        [
          'key04',
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
        'translations/de-de.json',
        {
          isInternal: true,
          locale: 'de-de',
          translationsDir: 'translations',
        },
      ],
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

  const lintErrors = noInconsistentMessages(
    project,
    {
      ignores: ['key02', 'key04'],
    },
    options,
  );

  assert.deepStrictEqual(lintErrors, [
    'key01 (inconsistent arguments: de-de, en-us)',
    'key03 (inconsistent arguments: de-de, en-us)',
  ]);
});
