import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/find-icu-arguments.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-project | no-inconsistent-messages > all ICU arguments match', function () {
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
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments('Hallo, {name}!'),
              message: 'Hallo, {name}!',
            },
          ],
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
      [
        'key03',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                'Es ist jetzt {timestamp, time, short}.',
              ),
              message: 'Es ist jetzt {timestamp, time, short}.',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments(
                'It is now {timestamp, time, short}',
              ),
              message: 'It is now {timestamp, time, short}',
            },
          ],
        ]),
      ],
      [
        'key04',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                'Es ist jetzt {timestamp, time, short}.',
              ),
              message: 'Es ist jetzt {timestamp, time, short}.',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments(
                'It is now {timestamp, time, long}',
              ),
              message: 'It is now {timestamp, time, long}',
            },
          ],
        ]),
      ],
      [
        'key05',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {proportion, number, ::percent} davon sind neu.',
              ),
              message:
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {proportion, number, ::percent} davon sind neu.',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments(
                'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}. {proportion, number, ::percent} of them are new.',
              ),
              message:
                'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}. {proportion, number, ::percent} of them are new.',
            },
          ],
        ]),
      ],
      [
        'key06',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                '<a href="https://my-domain.de/agb/" rel="noopener noreferrer" target="_blank">AGB</a>',
              ),
              message:
                '<a href="https://my-domain.de/agb/" rel="noopener noreferrer" target="_blank">AGB</a>',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments(
                '<a class="link" href="https://my-domain.com/terms" target="_blank">Terms and Conditions</a>',
              ),
              message:
                '<a class="link" href="https://my-domain.com/terms" target="_blank">Terms and Conditions</a>',
            },
          ],
        ]),
      ],
      [
        'key07',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                '<a href="{url}" rel="noopener noreferrer" target="_blank" class="{class}">AGB</a>',
              ),
              message:
                '<a href="{url}" rel="noopener noreferrer" target="_blank" class="{class}">AGB</a>',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
              icuArguments: findIcuArguments(
                '<a class="{class}" href="{url}" target="_blank">Terms and Conditions</a>',
              ),
              message:
                '<a class="{class}" href="{url}" target="_blank">Terms and Conditions</a>',
            },
          ],
        ]),
      ],
    ]),
    translationFiles: stubTranslationFiles(),
    usedKeys: new Map(),
  });

  const keys = noInconsistentMessages(project);

  assert.deepStrictEqual(keys, []);
});
