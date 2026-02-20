const { dirname, normalize, sep } = require('node:path');

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
  let prefix = sep;

  for (const addon of normalizedAddonNames) {
    const addonPrefix = `${sep}__ember-intl-addon__${sep}${addon}`;

    if (`${folderPath}${sep}`.startsWith(`${addonPrefix}${sep}`)) {
      prefix = addonPrefix;
      break;
    }
  }

  const folderNames = folderPath
    .replace(prefix, '')
    .split(sep)
    .filter(Boolean)
    .reverse();

  if (folderNames.length > 0) {
    for (const folderName of folderNames) {
      translations = {
        [folderName.replaceAll(' ', '_')]: translations,
      };
    }
  }

  return translations;
}

module.exports = namespaceKeys;
