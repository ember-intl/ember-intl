import { assert, test } from '@codemod-utils/tests';

import type { Project } from '../../../../src/types/index.js';
import { findIcuArguments } from '../../../../src/utils/icu-message/find-icu-arguments.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-project/index.js';
import { stubTranslationFiles } from '../../../helpers/stub-translation-files.js';

test('utils | lint-project | no-inconsistent-messages > some ICU arguments do not match (1)', function () {
  const project: Project = {
    availableKeys: new Map([
      [
        'key01',
        new Map([
          [
            'translations/de-de.json',
            {
              icuArguments: findIcuArguments('{name}'),
              message: '{name}',
            },
          ],
          [
            'translations/en-us.json',
            {
              icuArguments: findIcuArguments('name'),
              message: 'name',
            },
          ],
        ]),
      ],
      [
        'key02',
        new Map([
          [
            'translations/de-de.json',
            {
              icuArguments: findIcuArguments(
                'Es ist jetzt {timestamp, time, short}.',
              ),
              message: 'Es ist jetzt {timestamp, time, short}.',
            },
          ],
          [
            'translations/en-us.json',
            {
              icuArguments: findIcuArguments(
                'It is now {timestamp, date, short}',
              ),
              message: 'It is now {timestamp, date, short}',
            },
          ],
        ]),
      ],
      [
        'key03',
        new Map([
          [
            'translations/de-de.json',
            {
              icuArguments: findIcuArguments(
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {percentage}% davon sind neu.',
              ),
              message:
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {percentage}% davon sind neu.',
            },
          ],
          [
            'translations/en-us.json',
            {
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
        'key04',
        new Map([
          [
            'translations/de-de.json',
            {
              icuArguments: findIcuArguments(
                '<a href="{url}" rel="noopener noreferrer" target="_blank">AGB</a>',
              ),
              message:
                '<a href="{url}" rel="noopener noreferrer" target="_blank">AGB</a>',
            },
          ],
          [
            'translations/en-us.json',
            {
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
  };

  const keys = noInconsistentMessages(project);

  assert.deepStrictEqual(keys, [
    'key01\n  - Found in translations/de-de.json, translations/en-us.json',
    'key02\n  - Found in translations/de-de.json, translations/en-us.json',
    'key03\n  - Found in translations/de-de.json, translations/en-us.json',
    'key04\n  - Found in translations/de-de.json, translations/en-us.json',
  ]);
});
