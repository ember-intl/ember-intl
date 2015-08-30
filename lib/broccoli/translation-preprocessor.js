/* jshint node: true */

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

'use strict';

var CachingWriter = require('broccoli-caching-writer');
var walkSync    = require('walk-sync');
var yaml      = require('js-yaml');
var mkdirp    = require('mkdirp');
var extend    = require('extend');
var chalk     = require('chalk');
var glob      = require('glob');
var path      = require('path');
var fs      = require('fs');

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
function propKeys(object) {
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

function readAsObject(filepath) {
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
}

function missedKeys(target, defaultTranslationKeys, locale) {
  var targetProps = propKeys(target);

  defaultTranslationKeys.forEach(function (property) {
    if (targetProps.indexOf(property) === -1) {
      console.log(chalk.yellow('ember-intl: \'' + property + '\' missing from ' + locale));
    }
  });
}

function exporter(obj) {
  return 'export default ' + JSON.stringify(obj) + ';';
}

function TranslationPreprocessor(inputTrees, options) {
  if (!(this instanceof TranslationPreprocessor)) {
    return new TranslationPreprocessor(inputTrees, options);
  }

  if (!Array.isArray(inputTrees)) {
    inputTrees = [inputTrees];
  }

  CachingWriter.call(this, inputTrees, options);

  this.options = options;
  this.outputPath = options.destDir;
}

TranslationPreprocessor.prototype = Object.create(CachingWriter.prototype);
TranslationPreprocessor.prototype.constructor = TranslationPreprocessor;

TranslationPreprocessor.prototype.updateCache = function updateCache(includePaths, destDir) {
  if (!this.options.defaultLocale) {
    return;
  }

  var includePath = includePaths[0];

  var defaultTranslationPath = glob.sync(path.join(includePath, this.options.defaultLocale) + '\.@(json|yaml|yml)', {
    nosort: true,
    silent: true
  })[0];

  if (!defaultTranslationPath) {
    console.log(chalk.yellow('ember-intl: "' + this.options.defaultLocale + '" default locale missing `translations` folder'));
    return;
  }

  var defaultTranslation = readAsObject(defaultTranslationPath);
  var defaultTranslationKeys = propKeys(defaultTranslation);
  var translation;

  var outputPath = path.join(destDir, this.options.outputPath);
  mkdirp.sync(outputPath);

  walkSync(includePath).forEach(function (file) {
    translation = readAsObject(path.join(includePath, file));
    missedKeys(translation, defaultTranslationKeys, file.split('.')[0]);
    translation = extend(true, {}, defaultTranslation, translation);
    fs.writeFileSync(
      path.join(outputPath, file.replace(path.extname(file), '.js')),
      exporter(translation), { encoding: 'utf8' }
    );
  }, this);
};

module.exports = TranslationPreprocessor;
