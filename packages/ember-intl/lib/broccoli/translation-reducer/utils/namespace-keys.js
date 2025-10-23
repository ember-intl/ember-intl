const { dirname, normalize, sep: separator } = require('node:path');

/**
 * Wraps the root object with a namespace.
 *
 * If the file `translations/foo/bar/en-us.json` has a `baz` key,
 * then `translationObject` will have `foo.bar.baz` instead.
 */
function namespaceKeys(translations, data) {
  const { addonNames, filePath, inputPath } = data;

  const normalizedFilePath = normalize(filePath);
  const normalizedInputPath = normalize(inputPath);

  const folderPath = dirname(normalizedFilePath).replace(
    normalizedInputPath,
    '',
  );

  if (!folderPath) {
    return translations;
  }

  const normalizedAddonNames = addonNames.map(normalize);
  let prefix = separator;

  for (const addon of normalizedAddonNames) {
    const addonPrefix = `${separator}__ember-intl-addon__${separator}${addon}`;

    if (`${folderPath}${separator}`.startsWith(`${addonPrefix}${separator}`)) {
      prefix = addonPrefix;
      break;
    }
  }

  const folderNames = folderPath
    .replace(prefix, '')
    .split(separator)
    .filter(Boolean)
    .reverse();

  if (folderNames.length > 0) {
    for (const folderName of folderNames) {
      translations = {
        [folderName.replace(/ /g, '_')]: translations,
      };
    }
  }

  return translations;
}

module.exports = namespaceKeys;
