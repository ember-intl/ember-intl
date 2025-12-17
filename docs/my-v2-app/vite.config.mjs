import { loadTranslations } from '@ember-intl/vite';
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    loadTranslations({
      addonPaths: ['node_modules/my-v1-addon', 'node_modules/my-v2-addon'],
    }),
  ],
});
