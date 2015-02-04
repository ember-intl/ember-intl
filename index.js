/* jshint node: true */

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var Filter     = require('broccoli-filter');
var Funnel     = require('broccoli-funnel');
var serialize  = require('serialize-javascript');
var path       = require('path');
var recast     = require('recast');
var extractor  = require('./lib/extract');

var types      = recast.types;
var builders   = types.builders

var messageFormatPath  = path.dirname(require.resolve('intl-messageformat'));
var relativeFormatPath = path.dirname(require.resolve('intl-relativeformat'));
var intlPath           = path.dirname(require.resolve('intl'));

function normalize (localeName) {
    return localeName.toLowerCase().replace('-', '_');
}

function extract (locale, settings) {
    var data = { locale: locale };

    if (settings.plurals) {
        var pluralRuleFunction = extractor.pluralRuleFunction(normalize(locale));

        if (pluralRuleFunction) {
            data.pluralRuleFunction = pluralRuleFunction;
        } else {
            return null;
        }
    }

    if (settings.fields) {
        var fields = extractor.fields(normalize(locale), settings.fields);
        if (fields && Object.keys(fields).length) {
            data.fields = fields;
        } else {
            return null;
        }
    }

    return data;
}

function LocaleReplacer (inputTree) {
    if (!(this instanceof LocaleReplacer)) {
        return new LocaleReplacer(inputTree);
    }

    Filter.call(this, inputTree);
    this.extensions = ['js'];
}

LocaleReplacer.prototype = Object.create(Filter.prototype);
LocaleReplacer.prototype.constructor = LocaleReplacer;

LocaleReplacer.prototype.processString = function (inputString) {
    var ast     = recast.parse(inputString);
    var locales = [];

    ast.program.body.filter(function (item) {
        return item.type === 'ExportDeclaration';
    }).forEach(function (item) {
        item.declaration.properties.forEach(function (property) {
            if (property.key.name.toLowerCase() === 'locale') {
                locales.push({
                    name: property.value.value,
                    properties: item.declaration.properties
                });
            }
        });
    });

    locales.forEach(function (locale) {
        var cldr = extract(locale.name, {
            plurals: true,
            fields:  ['year', 'month', 'day', 'hour', 'minute', 'second']
        });

        // assigning to a variable since it's an unassigned POJO
        // which recast/esprima cannot tolerate
        var fieldsAst = recast.parse('var fields = ' + serialize(cldr.fields));
        var pluralAst = recast.parse('var pluralRuleFunction = ' + serialize(cldr.pluralRuleFunction));
        var fields    = fieldsAst.program.body[0].declarations[0].init;
        var plural    = pluralAst.program.body[0].declarations[0].init;

        locale.properties.push(builders.property("init", builders.identifier("fields"), fields));
        locale.properties.push(builders.property("init", builders.identifier("pluralRuleFunction"), plural));
    }, this);

    return recast.print(ast).code;
}

module.exports = {
    name: 'ember-intl',

    included: function (app) {
        this.app = app;
        app.import('vendor/messageformat/intl-messageformat.js');
        app.import('vendor/relativeformat/intl-relativeformat.js');
    },

    treeForApp: function (sourceTree) {
        var localeSource = sourceTree;

        var trees = [];

        if (sourceTree) {
            trees.push(sourceTree);

            var localeTree = new Funnel(sourceTree, {
                srcDir:  'locales',
                destDir: 'locales'
            });

            if (localeTree) {
                trees.push(LocaleReplacer(localeTree));
            }
        }

        return this.mergeTrees(trees, { overwrite: true });
    },

    treeForVendor: function (tree) {
        var trees = [];

        if (tree) {
            trees.push(tree);
        }

        trees.push(this.pickFiles(this.treeGenerator(messageFormatPath), {
            srcDir:  '/dist',
            destDir: 'messageformat'
        }));

        trees.push(this.pickFiles(this.treeGenerator(relativeFormatPath), {
            srcDir:  '/dist',
            destDir: 'relativeformat'
        }));

        return this.mergeTrees(trees);
    },

    treeForPublic: function (tree) {
        var app    = this.app;
        var config = this.project.config(app.env);
        var trees  = [tree];

        trees.push(this.pickFiles(intlPath, {
            srcDir:  '/',
            files:   ['Intl.complete.js', 'Intl.js', 'Intl.min.js'],
            destDir: '/assets/intl/polyfill/'
        }));

        // only use these when using Intl.js, should not be used
        // with the native Intl API
        trees.push(this.pickFiles(intlPath + '/locale-data/jsonp', {
            srcDir:  '/',
            files:   ['*.js'],
            destDir: '/assets/intl/polyfill/locales/'
        }));

        return this.mergeTrees(trees, { overwrite: true });
    }
};
