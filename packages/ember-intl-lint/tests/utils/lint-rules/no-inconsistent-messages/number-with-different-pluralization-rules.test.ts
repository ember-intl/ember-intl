import { assert, test } from '@codemod-utils/tests';

import { findAvailableKeys } from '../../../../src/steps/analyze-project/index.js';
import { noInconsistentMessages } from '../../../../src/utils/lint-rules/index.js';
import { normalizeProject } from '../../../helpers/index.js';
import { options } from '../../../helpers/shared-test-setups/my-v2-app.js';

test('utils | lint-rules | no-inconsistent-messages > number with different pluralization rules', function () {
  const translations = new Map([
    [
      'en-us',
      new Map([
        [
          'num-days-1',
          {
            filePath: 'translations/en-us.json',
            message: '{count, plural, one {# day} other {# days}}',
          },
        ],
        [
          'num-days-2',
          {
            filePath: 'translations/en-us.json',
            // `zero` is not a valid category for `en`
            message:
              '{count, plural, zero {0 days} one {# day} other {# days}}',
          },
        ],
        [
          'num-days-3',
          {
            filePath: 'translations/en-us.json',
            message: '{count, plural, =0 {0 days} =1 {# day} other {# days}}',
          },
        ],
        [
          'invite-users',
          {
            filePath: 'translations/en-us.json',
            message: 'Invite user{count, plural, one {} other {s}}',
          },
        ],
      ]),
    ],
    [
      'ja',
      new Map([
        [
          'num-days-1',
          {
            filePath: 'translations/ja.json',
            message: '{count, plural, other {#日}}',
          },
        ],
        [
          'num-days-2',
          {
            filePath: 'translations/ja.json',
            message: '{count, plural, other {#日}}',
          },
        ],
        [
          'num-days-3',
          {
            filePath: 'translations/ja.json',
            message: '{count, plural, =1 {一日} other {#日}}',
          },
        ],
        [
          'invite-users',
          {
            filePath: 'translations/ja.json',
            message: 'ユーザー{count, plural, other {}}を招待',
          },
        ],
      ]),
    ],
    [
      'pt',
      new Map([
        [
          'num-days-1',
          {
            filePath: 'translations/pt.json',
            message: '{count, plural, one {# dia} other {# dias}}',
          },
        ],
        [
          'num-days-2',
          {
            filePath: 'translations/pt.json',
            message: '{count, plural, one {# dia} other {# dias}}',
          },
        ],
        [
          'num-days-3',
          {
            filePath: 'translations/pt.json',
            message: '{count, plural, one {# dia} other {# dias}}',
          },
        ],
        [
          'invite-users',
          {
            filePath: 'translations/pt.json',
            // Not translated yet
            message: 'Invite user{count, plural, one {} other {s}}',
          },
        ],
      ]),
    ],
    [
      'zh',
      new Map([
        [
          'num-days-1',
          {
            filePath: 'translations/zh.json',
            message: '{count, plural, other {#天}}',
          },
        ],
        [
          'num-days-2',
          {
            filePath: 'translations/zh.json',
            message: '{count, plural, other {#天}}',
          },
        ],
        [
          'num-days-3',
          {
            filePath: 'translations/zh.json',
            message: '{count, plural, =1 {一天} other {#天}}',
          },
        ],
        [
          'invite-users',
          {
            filePath: 'translations/zh.json',
            message: '邀请用户{count, plural, other {}}',
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
          format: 'json',
          isInternal: true,
          locale: 'en-us',
          translationsDir: 'translations',
        },
      ],
      [
        'translations/ja.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'ja',
          translationsDir: 'translations',
        },
      ],
      [
        'translations/pt.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'pt',
          translationsDir: 'translations',
        },
      ],
      [
        'translations/zh.json',
        {
          format: 'json',
          isInternal: true,
          locale: 'zh',
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
