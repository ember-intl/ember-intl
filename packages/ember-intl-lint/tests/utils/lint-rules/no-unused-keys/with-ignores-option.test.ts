import { assert, test } from '@codemod-utils/tests';

import { noUnusedKeys } from '../../../../src/utils/lint-rules/index.js';
import {
  normalizeProject,
  stubMapping,
  stubTranslationFiles,
} from '../../../helpers/index.js';

test('utils | lint-rules | no-unused-keys > with ignores option', function () {
  const project = normalizeProject({
    availableKeys: new Map([
      [
        'key01',
        stubMapping({
          message: 'Hello!',
          translationFilePaths: ['translations/de-de.json'],
        }),
      ],
      [
        'key02',
        stubMapping({
          message: '{timestamp, date, long}',
          translationFilePaths: ['translations/en-us.json'],
        }),
      ],
      [
        'key06',
        stubMapping({
          message: 'It is now {timestamp, time, short}.',
          translationFilePaths: [
            'node_modules/my-v1-addon/translations/de-de.json',
          ],
        }),
      ],
      [
        'key07',
        stubMapping({
          message:
            '{isTaxed, select, yes {An additional {tax, number, percent} tax will be collected.} other {No taxes apply.}}',
          translationFilePaths: [
            'node_modules/my-v2-addon/translations/de-de.json',
            'node_modules/my-v2-addon/translations/en-us.json',
          ],
        }),
      ],
    ]),
    translationFiles: stubTranslationFiles(),
    usedKeys: new Set(['key03', 'key04', 'key05', 'key06']),
  });

  const lintErrors = noUnusedKeys(project, {
    ignores: ['key01', 'key03', 'key05', 'key07'],
  });

  assert.deepStrictEqual(lintErrors, ['key02']);
});
