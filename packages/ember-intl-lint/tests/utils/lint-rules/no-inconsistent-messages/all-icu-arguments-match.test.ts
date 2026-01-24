import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-rules | no-inconsistent-messages > all ICU arguments match', function () {
  const translations = new Map([
    [
      'de-de',
      new Map([
        [
          'key01',
          {
            filePath: 'translations/de-de.json',
            message: 'Hallo!',
          },
        ],
        [
          'key02',
          {
            filePath: 'translations/de-de.json',
            message: 'Hallo, {name}!',
          },
        ],
        [
          'key03',
          {
            filePath: 'translations/de-de.json',
            message: 'Es ist jetzt {timestamp, time, short}.',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/de-de.json',
            message: 'Es ist jetzt {timestamp, time, short}.',
          },
        ],
        [
          'key05',
          {
            filePath: 'translations/de-de.json',
            message:
              'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {proportion, number, ::percent} davon sind neu.',
          },
        ],
        [
          'key06',
          {
            filePath: 'translations/de-de.json',
            message:
              '<a href="https://my-domain.de/agb/" rel="noopener noreferrer" target="_blank">AGB</a>',
          },
        ],
        [
          'key07',
          {
            filePath: 'translations/de-de.json',
            message:
              '<a href="{url}" rel="noopener noreferrer" target="_blank" class="{class}">AGB</a>',
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
            message: 'Hello!',
          },
        ],
        [
          'key02',
          {
            filePath: 'translations/de-de.json',
            message: 'Hello, {name}!',
          },
        ],
        [
          'key03',
          {
            filePath: 'translations/de-de.json',
            message: 'It is now {timestamp, time, short}',
          },
        ],
        [
          'key04',
          {
            filePath: 'translations/de-de.json',
            message: 'It is now {timestamp, time, long}',
          },
        ],
        [
          'key05',
          {
            filePath: 'translations/de-de.json',
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
            filePath: 'translations/de-de.json',
            message:
              '<a class="{class}" href="{url}" target="_blank">Terms and Conditions</a>',
          },
        ],
      ]),
    ],
  ]);

  const project = normalizeProject({
    availableKeys: findAvailableKeys(translations),
    translationFiles: stubTranslationFiles(),
    translations,
    usedKeys: new Set(),
  });

  const lintErrors = noInconsistentMessages(project);

  assert.deepStrictEqual(lintErrors, []);
});
