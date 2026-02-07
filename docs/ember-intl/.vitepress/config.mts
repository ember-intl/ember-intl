import { defineConfig } from 'vitepress';

import { sidebar } from './sidebar.mts';

export default defineConfig({
  base: '/ember-intl/',
  cleanUrls: true,
  description: 'Internationalization for Ember projects',
  markdown: {
    anchor: {
      level: [2, 3],
    },
    // https://github.com/vuejs/vitepress/discussions/3724
    config(md) {
      const defaultCodeInline = md.renderer.rules.code_inline!;

      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        tokens[idx]?.attrSet('v-pre', '');

        return defaultCodeInline(tokens, idx, options, env, self);
      };
    },
    lineNumbers: true,
    theme: {
      light: 'github-light-default',
      dark: 'github-dark-default',
    },
  },
  srcDir: 'src',
  themeConfig: {
    editLink: {
      pattern:
        'https://github.com/ember-intl/ember-intl/edit/main/docs/ember-intl/src/:path',
      text: 'Edit this page on GitHub',
    },
    nav: [
      {
        link: '/docs',
        text: 'Overview',
      },
      {
        items: [
          {
            link: 'https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl/CHANGELOG.md',
            text: 'ember-intl',
          },
          {
            link: 'https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-lint/CHANGELOG.md',
            text: '@ember-intl/lint',
          },
          {
            link: 'https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-v1-compat/CHANGELOG.md',
            text: '@ember-intl/v1-compat',
          },
          {
            link: 'https://github.com/ember-intl/ember-intl/blob/main/packages/ember-intl-vite/CHANGELOG.md',
            text: '@ember-intl/vite',
          },
        ],
        text: 'Changelogs',
      },
    ],
    outline: {
      level: [2, 3],
    },
    search: {
      provider: 'local',
    },
    sidebar,
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/ember-intl/ember-intl',
      },
    ],
  },
  title: 'ember-intl',
  vite: {
    plugins: [],
  },
});
