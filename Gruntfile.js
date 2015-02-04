'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
				broccoli: {
						packaging: {
								config: './packaging/Brocfile.js',
								dest: 'dist'
						}
				},

        clean: {
            dist: 'packaging/dist/'
        },

        extract_cldr_data: {
            options: {
                fields : ['second', 'minute', 'hour', 'day', 'month', 'year'],
                plurals: true
            },

            lib_all: {
                dest: 'dist/locale-data/complete.js',

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
                dest: 'dist/locale-data/locales/',
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

		grunt.loadNpmTasks('grunt-broccoli');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-extract-cldr-data');

    grunt.registerTask('cldr', ['extract_cldr_data']);

    grunt.registerTask('default', [
        'clean',
				'broccoli:packaging:build',
        'cldr'
    ]);
};
