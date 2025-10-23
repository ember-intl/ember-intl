/**
 * Flattens the `messages` object and calls `callback` with a key describing
 * the path to the message and the message itself.
 */
function forEachMessage(translations, callback, prefix) {
  prefix = prefix ?? '';

  for (const key in translations) {
    if (Object.hasOwn(translations, key)) {
      const escapedKey = key.replace(/\./g, '\\.');
      const value = translations[key];

      if (typeof value === 'object') {
        forEachMessage(value, callback, `${prefix}${escapedKey}.`);
        continue;
      }

      callback(`${prefix}${escapedKey}`, value);
    }
  }
}

module.exports = forEachMessage;
