/* eslint-env node */

'use strict';

const path = require('path');

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
  filepath = path.dirname(filepath);
  filepath = filepath.replace(inputPath, "");

  if (filepath) {
    let prefix = "/";

    for (let addon of addonNames) {
      addon = "/" + addon + "/";

      if (filepath.startsWith(addon)) {
        prefix = addon;
        break;
      }
    }

    filepath = filepath.replace(prefix, "");
    const filepathParts = filepath.split(path.sep).reverse();

    if (filepathParts.length > 0) {
      for (const pathPart of filepathParts) {
        object = {
          [pathPart]: object
        };
      }
    }
  }

  return object;
}

module.exports = wrapWithNamespaceIfNeeded;
