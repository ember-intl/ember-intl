/* jshint node: true */

'use strict';

var fs = require('fs');
var path = require('path');

var dataPath = path.join(require.resolve('formatjs-extract-cldr-data'), '..', 'data', 'main');

var availableLocales = fs.readdirSync(dataPath).map(function(localeFile) {
  return localeFile.toLowerCase();
});

module.exports = function(locale) {
  return availableLocales.indexOf(locale.toLowerCase()) > -1
}
