import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

import { i18n } from 'ember-formatjs/vite';

export default defineConfig({
	plugins: [
		// Default
		classicEmberSupport(),
		ember(),
		babel({
			babelHelpers: 'runtime',
			extensions,
		}),

		i18n(),
	],
});
