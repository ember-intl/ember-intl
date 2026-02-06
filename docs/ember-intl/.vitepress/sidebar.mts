import type { DefaultTheme } from 'vitepress/theme';

export const sidebar: DefaultTheme.Sidebar = [
  {
    collapsed: true,
    items: [
      {
        link: '/docs/quickstart',
        text: 'Quickstart (Apps)',
      },
      {
        link: '/docs/quickstart-addons',
        text: 'Quickstart (Addons)',
      },
    ],
    text: 'Getting Started',
  },
  {
    collapsed: false,
    items: [
      {
        link: '/docs/helpers/introduction',
        text: 'Introduction',
      },
      {
        link: '/docs/helpers/format-date',
        text: '{{format-date}}',
      },
      {
        link: '/docs/helpers/format-date-range',
        text: '{{format-date-range}}',
      },
      {
        link: '/docs/helpers/format-list',
        text: '{{format-list}}',
      },
      {
        link: '/docs/helpers/format-message',
        text: '{{format-message}}',
      },
      {
        link: '/docs/helpers/format-number',
        text: '{{format-number}}',
      },
      {
        link: '/docs/helpers/format-relative-time',
        text: '{{format-relative-time}}',
      },
      {
        link: '/docs/helpers/format-time',
        text: '{{format-time}}',
      },
      {
        link: '/docs/helpers/t',
        text: '{{t}}',
      },
      {
        link: '/docs/helpers/t-key',
        text: '{{t-key}}',
      },
      {
        link: '/docs/helpers/template-tag',
        text: '&lt;template&gt; tag',
      },
    ],
    text: 'Helpers',
  },
  {
    collapsed: false,
    items: [
      {
        link: '/docs/services/introduction',
        text: 'Introduction',
      },
      {
        link: '/docs/services/intl-part-1',
        text: 'intl (Part 1)',
      },
      {
        link: '/docs/services/intl-part-2',
        text: 'intl (Part 2)',
      },
    ],
    text: 'Services',
  },
  {
    collapsed: true,
    items: [
      {
        link: '/docs/test-helpers/introduction',
        text: 'Introduction',
      },
      {
        link: '/docs/test-helpers/add-translations',
        text: 'addTranslations()',
      },
      {
        link: '/docs/test-helpers/set-locale',
        text: 'setLocale()',
      },
      {
        link: '/docs/test-helpers/setup-intl',
        text: 'setupIntl()',
      },
      {
        link: '/docs/test-helpers/t',
        text: 't()',
      },
    ],
    text: 'Test Helpers',
  },
  {
    collapsed: true,
    items: [
      {
        link: '/docs/advanced/auto-generating-keys',
        text: 'Auto-generating keys',
      },
      {
        link: '/docs/advanced/build-options',
        text: 'Build options',
      },
      {
        link: '/docs/advanced/lazy-loading-translations',
        text: 'Lazy-loading translations',
      },
      {
        link: '/docs/advanced/organizing-translations',
        text: 'Organizing translations',
      },
      {
        link: '/docs/advanced/polyfills',
        text: 'Polyfills',
      },
    ],
    text: 'Advanced',
  },
  {
    collapsed: true,
    items: [
      {
        link: '/docs/migration/v8',
        text: 'From 7.0 to 8.0',
      },
      {
        link: '/docs/migration/v7',
        text: 'From 6.1 to 7.0',
      },
      {
        link: '/docs/migration/v6',
        text: 'From 5.0 to 6.0',
      },
      {
        link: '/docs/migration/v5',
        text: 'From 4.0 to 5.0',
      },
      {
        link: '/docs/migration/v4',
        text: 'From 3.0 to 4.0',
      },
      {
        link: '/docs/migration/v3',
        text: 'From 2.0 to 3.0',
      },
      {
        link: '/docs/migration/v2',
        text: 'Documentation for 2.x',
      },
    ],
    text: 'Migration',
  },
];
