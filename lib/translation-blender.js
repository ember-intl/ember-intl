/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var walkSync      = require('walk-sync');
var yaml          = require('js-yaml');
var mkdirp        = require('mkdirp');
var extend        = require('extend');
var chalk         = require('chalk');
var glob          = require('glob');
var path          = require('path');
var fs            = require('fs');

var log = console.log;

/**
* Turns an object into a single dimensional array of strings
*
* propKeys({ a: true, b: { c: true }}) => ["a", "b.c"]
*
* NOTE" Period within a key are escaped.
* ie, `propKeys({ 'a.a': true, b: { c: true }})` => `["a\.a", "b.c"]`
*
* @method propKeys
* @param {Object} object
* @return {Array} Returns array of strings
* @private
*/
function propKeys (object) {
    var result = [];
    var escaped;

    for (var key in object) {
        escaped = key.replace(/\./g, '\\.');

        if (object.hasOwnProperty(key)) {
            if (typeof object[key] === 'object') {
                result = result.concat(propKeys(object[key]).map(function (_key) {
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

TranslationBlender.prototype.readAsObject = function (filepath) {
    var data = fs.readFileSync(filepath);
    var ext = path.extname(filepath);

    switch (ext) {
        case '.json':
            return JSON.parse(data);
        case '.yaml':
        case '.yml':
            return yaml.load(data, 'utf8');
    }

    throw new Error('Unable to parse ' + filepath);
};

TranslationBlender.prototype.report = function (target, defaultTranslationKeys, locale) {
    var targetProps = propKeys(target);

    defaultTranslationKeys.forEach(function (property) {
        if (targetProps.indexOf(property) === -1) {
            log(chalk.yellow('[ember-intl] "' + property + '" missing from ' + locale));
        }
    });
};

TranslationBlender.prototype.exportWrap = function (json) {
    return 'export default ' + JSON.stringify(json) + ';';
};

TranslationBlender.prototype.updateCache = function (includePaths, destDir) {
    if (!this.options.defaultLocale) {
        return;
    }

    var includePath = includePaths[0];

    var defaultTranslationPath = glob.sync(path.join(includePath, this.options.defaultLocale) + '\.@(json|yaml|yml)', {
        nocase: true,
        nosort: true,
        silent: true
    })[0];

    if (!defaultTranslationPath) {
        log(chalk.yellow('[ember-intl] "' + this.options.defaultLocale + '" default locale missing `translations` folder'));
        return;
    }

    var defaultTranslation = this.readAsObject(defaultTranslationPath);
    var defaultTranslationKeys = propKeys(defaultTranslation);
    var translation;

    var outputPath = path.join(destDir, this.options.outputPath);
    mkdirp.sync(outputPath);

    walkSync(includePath).forEach(function (file) {
        translation = this.readAsObject(path.join(includePath, file));
        this.report(translation, defaultTranslationKeys, file.split('.')[0]);
        translation = extend(true, {}, defaultTranslation, translation);
        fs.writeFileSync(
          path.join(outputPath, file.replace(path.extname(file), '.js')),
          this.exportWrap(translation), { encoding: 'utf8' }
        );
    }, this);
};

module.exports = TranslationBlender;
