'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            broccoli: {
              command: 'broccoli build ./dist'
            }
        },

        clean: {
            dist: 'dist/',
            tmp: 'tmp/'
        },

        extract_cldr_data: {
            options: {
                relativeFields: true,
                pluralRules: true
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

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-extract-cldr-data');

    grunt.registerTask('cldr', ['extract_cldr_data']);

    grunt.registerTask('default', [
        'clean',
        'shell:broccoli',
        'cldr'
    ]);
};
