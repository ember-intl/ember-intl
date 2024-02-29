const { dirname, normalize, sep: separator } = require('node:path');
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
  const normalizedFilePath = normalize(filepath);
  const normalizedInputPath = normalize(inputPath);
  const normalizedAddonNames = addonNames.map(normalize);

  let directory = dirname(normalizedFilePath).replace(normalizedInputPath, '');

  if (directory) {
    let prefix = separator;

    for (let addon of normalizedAddonNames) {
      let addonPrefix = `${separator}${enums.addonNamespace}${separator}${addon}`;

      if (`${directory}${separator}`.startsWith(`${addonPrefix}${separator}`)) {
        prefix = addonPrefix;
        break;
      }
    }

    const dirnameParts = directory
      .replace(prefix, '')
      .split(separator)
      .filter(Boolean)
      .reverse();

    if (dirnameParts.length > 0) {
      for (const pathPart of dirnameParts) {
        object = {
          [pathPart.replace(/ /g, '_')]: object,
        };
      }
    }
  }

  return object;
}

module.exports = wrapWithNamespaceIfNeeded;
