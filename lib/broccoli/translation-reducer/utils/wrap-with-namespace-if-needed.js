/* eslint-env node */

'use strict';

const path = require('path');
const enums = require('../../enums');

/**
 * Wraps the root object with a namespace if the file is under subdirectories
 *
 * If a file is under "translations/foo/bar/en-us.json" and we have the "baz" key in that file
 * we will need to access to the translation using the "foo.bar.baz" key instead of "baz".
 *
 * @method wrapWithNamespaceIfNeeded
 * @param {Object} object
 * @param {String} filepath
 * @param {String} inputPath
 * @param {String[]} addonNames Names of the addons with translations
 * @return {Object} Returns the input object
 * @private
 */
function wrapWithNamespaceIfNeeded(object, filepath, inputPath, addonNames) {
  let dirname = path.dirname(filepath).replace(inputPath, '');

  if (dirname) {
    let prefix = path.sep;

    for (let addon of addonNames) {
      let addonPrefix = `${path.sep}${enums.addonNamespace}${path.sep}${addon}`;

      if (dirname.startsWith(addonPrefix)) {
        prefix = addonPrefix;
        break;
      }
    }

    const dirnameParts = dirname
      .replace(prefix, '')
      .split(path.sep)
      .filter(part => Boolean(part))
      .reverse();

    if (dirnameParts.length > 0) {
      for (const pathPart of dirnameParts) {
        object = {
          [pathPart.replace(/ /g, '_')]: object
        };
      }
    }
  }

  return object;
}

module.exports = wrapWithNamespaceIfNeeded;
