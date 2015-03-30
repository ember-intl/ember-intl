/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var walkSync      = require('walk-sync');
var mkdirp        = require('mkdirp');
var extend        = require('extend');
var chalk         = require('chalk');
var path          = require('path');
var fs            = require('fs');

/**
* Turns an object into a single dimensional array of strings
*
* properties({ a: true, b: { c: true }}) => ["a", "b.c"]
* Period as a property name are escaped, ie:
* properties({ 'a.a': true, b: { c: true }}) => ["a\.a", "b.c"]
*
* @method properties
* @param {Object} object
* @return {Array} Returns array of strings
*/
function properties (object) {
    var result = [];
    var escaped;

    for (var key in object) {
        escaped = key.replace(/\./g, '\\.');

        if (object.hasOwnProperty(key)) {
            if (typeof object[key] === 'object') {
                result = result.concat(properties(object[key]).map(function (_key) {
                    return escaped + '.' + _key;
                }));
            } else {
                result.push(escaped);
            }
        }
    }

    return result;
}

function TranslationBlender (inputTrees, options) {
    if (!(this instanceof TranslationBlender)) {
        return new TranslationBlender(inputTrees, options);
    }

    if (!Array.isArray(inputTrees)) {
        inputTrees = [inputTrees];
    }

    CachingWriter.call(this, inputTrees, options);

    this.options = options;
    this.outputPath = options.destDir;
}

TranslationBlender.prototype = Object.create(CachingWriter.prototype);
TranslationBlender.prototype.constructor = TranslationBlender;

TranslationBlender.prototype.readAsObject = function (path) {
    return JSON.parse(fs.readFileSync(path));
};

TranslationBlender.prototype.report = function (target, base, locale) {
    var baseProps   = properties(base);
    var targetProps = properties(target);

    baseProps.forEach(function (property) {
        if (targetProps.indexOf(property) === -1) {
            console.log(chalk.yellow('[ember-intl] "' + property + '" missing from ' + locale));
        }
    });
}

TranslationBlender.prototype.exportWrap = function (json) {
    return "export default " + JSON.stringify(json) + ";";
};

TranslationBlender.prototype.updateCache = function (includePaths, destDir) {
    var baseLocale = this.options.defaultTranslation;

    if (!baseLocale) { return; }

    var translationsSrc = includePaths[0];
    var outputPath = path.join(destDir, this.options.outputPath);
    var base = this.readAsObject(path.join(translationsSrc, baseLocale + '.json'));
    var translation, filename;

    mkdirp.sync(outputPath);

    walkSync(translationsSrc).forEach(function (file) {
        translation = this.readAsObject(path.join(translationsSrc, file));
        this.report(translation, base, translation.locale);
        translation = extend(true, {}, base, translation);
        filename = path.join(outputPath, file.replace('.json', '.js'));
        fs.writeFileSync(filename, this.exportWrap(translation), { encoding: 'utf8' });
    }, this);
};

module.exports = TranslationBlender;
