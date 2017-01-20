/* jshint node: true */

'use strict';

/**
* Copyright 2015, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

let CachingWriter = require('broccoli-caching-writer');
let stringify = require('json-stable-stringify');
let mkdirp = require('mkdirp');
let extend = require('extend');
let yaml = require('js-yaml');
let path = require('path');
let fs = require('fs');

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
  }

  readDirectory(inputPath, listFiles) {
    let plugin = this;

    // sorted so that any translation path starts with `__addon__`
    // move to the head of the array.  this ensures the application's translations
    // take presidence over addon translations.
    let sortedPaths = listFiles.sort(function(a, b) {
      if (path.relative(inputPath, a).indexOf('__addon__') === 0) {
        return -1;
      }

      return 1;
    });

    return sortedPaths.reduce(function(translations, translationPath) {
      if (fs.statSync(translationPath).isDirectory()) {
        return translations;
      }

      let translation = readAsObject(translationPath);

      if (!translation) {
        plugin._log('cannot read path "' + translationPath + '"');
        return translations;
      }

      let basename = path.basename(translationPath).split('.')[0];
      let keyedTranslation = {};
      keyedTranslation[plugin.normalizeLocale(basename)] = translation;

      return extend(true, translations, keyedTranslation);
    }, Object.create(null));
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
    let inputPath = this.inputPaths[0];
    let outputPath = this.outputPath + '/' + this.options.outputPath;
    let translations = this.readDirectory(inputPath, this.listFiles());

    mkdirp.sync(outputPath);

    for (let key in translations) {
      fs.writeFileSync(outputPath + '/' + this.filename(key), this.wrapEntry(translations[key]), {
        encoding: 'utf8'
      });
    }
  }
}

module.exports = TranslationReducer;
