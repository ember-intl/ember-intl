/**
 * Flattens the `messages` object and calls `fn` with a key describing
 * the path to the message and the message itself.
 */
function forEachMessage(messages, fn, prefix) {
  prefix = prefix || '';

  for (let key in messages) {
    if (Object.prototype.hasOwnProperty.call(messages, key)) {
      let escapedKey = key.replace(/\./g, '\\.');
      let value = messages[key];
      if (typeof value === 'object') {
        forEachMessage(value, fn, `${prefix}${escapedKey}.`);
      } else {
        fn(`${prefix}${escapedKey}`, value);
      }
    }
  }
}

module.exports = forEachMessage;
