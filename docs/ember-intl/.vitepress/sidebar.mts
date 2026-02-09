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
        text: 'formatDate',
      },
      {
        link: '/docs/helpers/format-date-range',
        text: 'formatDateRange',
      },
      {
        link: '/docs/helpers/format-list',
        text: 'formatList',
      },
      {
        link: '/docs/helpers/format-message',
        text: 'formatMessage',
      },
      {
        link: '/docs/helpers/format-number',
        text: 'formatNumber',
      },
      {
        link: '/docs/helpers/format-relative-time',
        text: 'formatRelativeTime',
      },
      {
        link: '/docs/helpers/format-time',
        text: 'formatTime',
      },
      {
        link: '/docs/helpers/t',
        text: 't',
      },
      {
        link: '/docs/helpers/t-key',
        text: 'tKey',
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
        text: 'From v7 to v8',
      },
      {
        link: '/docs/migration/v7',
        text: 'From v6 to v7',
      },
      {
        link: '/docs/migration/v6',
        text: 'From v5 to v6',
      },
      {
        link: '/docs/migration/v5',
        text: 'From v4 to v5',
      },
      {
        link: '/docs/migration/v4',
        text: 'From v3 to v4',
      },
      {
        link: '/docs/migration/v3',
        text: 'From v2 to v3',
      },
      {
        link: '/docs/migration/past-documentations',
        text: 'Past documentations',
      },
    ],
    text: 'Migration',
  },
];
