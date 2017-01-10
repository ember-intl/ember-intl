/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

let CachingWriter = require('broccoli-caching-writer');
let stringify = require('json-stable-stringify');
let walkSync = require('walk-sync');
let mkdirp = require('mkdirp');
let extend = require('extend');
let yaml = require('js-yaml');
let chalk = require('chalk');
let glob = require('glob');
let path = require('path');
let fs = require('fs');

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
  let result = [];
  let escaped;

  for (let key in object) {
    escaped = key.replace(/\./g, '\\.');

    if (object.hasOwnProperty(key)) {
      if (typeof object[key] === 'object') {
        result = result.concat(propKeys(object[key]).map(function(_key) {
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
  let data = fs.readFileSync(filepath);
  let ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data, 'utf8');
  }
}

class TranslationReducer extends CachingWriter {
  constructor(inputNode, options) {
    if (!Array.isArray(inputNode)) {
      inputNode = [inputNode];
    }

    super(inputNode, {
      annotation: 'Translation Reducer'
    });

    this.options = Object.assign({
      log() {}
    }, options);
  }

  normalizeLocale(locale) {
    if (typeof locale === 'string') {
      return locale.toLowerCase();
    }

    return locale;
  }

  _log(msg) {
    if (this.options.log) {
      return this.options.log.apply(undefined, arguments);
    }

    console.log(msg);
  }

  findMissingKeys(target, defaultTranslationKeys, locale) {
    let targetProps = propKeys(target);

    defaultTranslationKeys.forEach(function(property) {
      if (targetProps.indexOf(property) === -1) {
        this._log(property + ' missing from ' + locale);
      }
    }, this);
  }

  readDirectory(inputPath) {
    let plugin = this;

    // sorted so that any translation path starts with `__addon__`
    // move to the head of the array.  this ensures the application's translations
    // take presidence over addon translations.
    let sortedPaths = walkSync(inputPath).sort(function(a, b) {
      if (a.indexOf('__addon__') === 0) {
        return -1;
      }

      return 1;
    });

    return sortedPaths.reduce(function(translations, file) {
      let fullPath = inputPath + '/' + file;

      if (fs.statSync(fullPath).isDirectory()) {
        return translations;
      }

      let translation = readAsObject(inputPath + '/' + file);

      if (!translation) {
        plugin._log('cannot read path "' + fullPath + '"');
        return translations;
      }

      let basename = path.basename(file).split('.')[0];
      let keyedTranslation = {};
      keyedTranslation[plugin.normalizeLocale(basename)] = translation;

      return extend(true, translations, keyedTranslation);
    }, {});
  }

  filename(key) {
    if (typeof this.options.filename === 'function') {
      return this.options.filename(key);
    }

    return key + '.json';
  }

  wrapEntry(obj) {
    if (typeof this.options.wrapEntry === 'function') {
      return this.options.wrapEntry(obj);
    }

    return stringify(obj);
  }

  build() {
    let plugin = this;
    let inputPath = this.inputPaths[0];
    let outputPath = this.outputPath + '/' + this.options.outputPath;
    let translations = this.readDirectory(inputPath);
    let defaultTranslationKeys, defaultTranslation, translation;

    mkdirp.sync(outputPath);

    if (this.options.baseLocale) {
      let defaultTranslationPath = glob.sync(inputPath + '/' + this.options.baseLocale + '\.@(json|yaml|yml)', {
        nosort: true,
        silent: true
      })[0];

      if (!defaultTranslationPath) {
        plugin._log(this.options.baseLocale + ' default locale missing `translations` folder');
        return;
      }

      defaultTranslation = translations[this.normalizeLocale(this.options.baseLocale)];
      defaultTranslationKeys = propKeys(defaultTranslation);
    }

    for (let key in translations) {
      if (translations.hasOwnProperty(key)) {
        translation = translations[key];

        if (this.options.baseLocale) {
          this.findMissingKeys(translation, defaultTranslationKeys, key);
        }

        translation = extend(true, {}, defaultTranslation, translation);

        fs.writeFileSync(outputPath + '/' + this.filename(key), this.wrapEntry(translation), { encoding: 'utf8' });
      }
    }
  }
}

module.exports = TranslationReducer;
