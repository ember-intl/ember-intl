import { assert, test } from '@codemod-utils/tests';

import { findIcuArguments } from '../../../../src/utils/icu-message/find-icu-arguments.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/normalize-project.js';
import { stubTranslationFiles } from '../../../helpers/stub-translation-files.js';

test('utils | lint-project | no-inconsistent-messages > with ignores option', function () {
  const project = normalizeProject({
    availableKeys: new Map([
      [
        'key01',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments('{name}'),
              message: '{name}',
            },
          ],
          [
            'en-us',
            {
              filePath: 'translations/en-us.json',
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
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {percentage}% davon sind neu.',
              ),
              message:
                'Du hast {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}. {percentage}% davon sind neu.',
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
        'key04',
        new Map([
          [
            'de-de',
            {
              filePath: 'translations/de-de.json',
              icuArguments: findIcuArguments(
                '<a href="{url}" rel="noopener noreferrer" target="_blank">AGB</a>',
              ),
              message:
                '<a href="{url}" rel="noopener noreferrer" target="_blank">AGB</a>',
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

  const failed = noInconsistentMessages(project, {
    ignores: ['key02', 'key04'],
  });
  const keys = failed.map(({ key }) => key);

  assert.deepStrictEqual(keys, ['key01', 'key03']);
});
