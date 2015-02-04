'use strict';

module.exports = function (grunt) {
		grunt.initConfig({
				clean: {
						dist: 'packaging/dist/'
				},

				extract_cldr_data: {
						options: {
								fields : ['second', 'minute', 'hour', 'day', 'month', 'year'],
								plurals: true
						},

						src_en: {
								dest: 'packaging/dist/locale-data/en.js',

								options: {
										locales: ['en'],

										wrapEntry: function (entry) {
												return 'export default ' + entry + ';';
										}
								}
						},

						lib_all: {
								dest: 'packaging/dist/locale-data/complete.js',

								options: {
										prelude: [
												'// GENERATED FILE',
												'var EmberIntl = require("ember-intl");\n\n'
										].join('\n'),

										wrapEntry: function (entry) {
												return 'EmberIntl.__addLocaleData(' + entry + ');';
										}
								}
						},

						dist_all: {
								dest: 'packaging/dist/locale-data/locales/',
								prelude: [
										'// GENERATED FILE',
										'var EmberIntl = require("ember-intl");\n\n'
								].join('\n'),
								options: {
										wrapEntry: function (entry) {
												return 'EmberIntl.__addLocaleData(' + entry + ');';
										}
								}
						}
				}
		});

		grunt.loadNpmTasks('grunt-contrib-clean');
		grunt.loadNpmTasks('grunt-extract-cldr-data');

		grunt.registerTask('cldr', ['extract_cldr_data']);

		grunt.registerTask('default', [
				'clean',
				'cldr'
		]);
};
