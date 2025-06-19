'use strict';

const path = require('path');
const LangConvert = require('./lib/lang-convert');
const { addPlugin, hasPlugin } = require('ember-cli-babel-plugin-helpers');
const defaults = require('./lib/babel/defaults');

const { join } = path;

module.exports = {
	name: require('./package').name,

	isDevelopingAddon() {
		return true;
	},

	treeForTranslations() {
		if (!this.shouldTranspile()) {
			return;
		}

		const appPrefix = join(this.project.configPath(), '../..');

		return new LangConvert(join(appPrefix, 'locale'));
	},

	included(...args) {
		this._super.included.apply(this, ...args);

		if (!this.shouldTranspile()) {
			this.ui.writeLine('Do not transpile i18n with ember-formatjs');
			return;
		}

		this.ui.writeLine('Transpile i18n with ember-formatjs');

		this._setupBabel();
	},

	_setupBabel() {
		const pluginPath = require.resolve('./babel-plugin');
		const config = this.addonOptions();
		const app = this._findHost();

		if (!hasPlugin(app, pluginPath)) {
			addPlugin(app, [pluginPath, config, 'ember-intl/ember-formatjs']);
		}
	},

	setupPreprocessorRegistry(type, registry) {
		if (type !== 'parent' || !this.shouldTranspile()) {
			return;
		}
		const options = this.addonOptions();
		const plugin = this._buildPlugin(options);

		plugin.parallelBabel = {
			requireFile: __filename,
			buildUsing: '_buildPlugin',
			params: options,
		};
		registry.add('htmlbars-ast-plugin', plugin);
	},

	_buildPlugin(options) {
		return {
			name: 'ember-intl/template-plugin',
			ext: 'hbs',
			plugin: require('./template-plugin')(options),
			baseDir: () => {
				return path.resolve('./');
			},
		};
	},

	shouldTranspile() {
		return true;
	},

	addonOptions(app) {
		app = app || this._findHost();
		const addonOptions = (app.options ?? {})['ember-formatjs'] || {};

		return Object.assign({}, defaults, addonOptions);
	},
};
