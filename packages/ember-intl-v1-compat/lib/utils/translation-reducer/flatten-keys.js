function traverse(json, data) {
  for (const key in json) {
    if (!Object.hasOwn(json, key)) {
      continue;
    }

    const value = json[key];

    if (typeof value === 'object') {
      traverse(value, {
        callback: data.callback,
        prefix: `${data.prefix}${key}.`,
      });

      continue;
    }

    data.callback(`${data.prefix}${key}`, value);
  }
}

function flattenKeys(json) {
  const translationJson = {};

  traverse(json, {
    callback(key, message) {
      translationJson[key] = message;
    },
    prefix: '',
  });

  return translationJson;
}

module.exports = flattenKeys;
