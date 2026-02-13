type TranslationKey = string;

type TranslationMessage = string;

export type TranslationJson = {
  [key: TranslationKey]: TranslationJson | TranslationMessage;
};

/**
 * @private
 */
export function flattenKeys(object: TranslationJson): TranslationJson {
  const result: TranslationJson = {};

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }

    const value = object[key];

    // If `value` is not `null`
    if (value && typeof value === 'object') {
      const hash = flattenKeys(value);

      for (const suffix in hash) {
        const translation = hash[suffix];

        if (typeof translation !== 'undefined') {
          result[`${key}.${suffix}`] = translation;
        }
      }
    } else {
      if (typeof value !== 'undefined') {
        result[key] = value;
      }
    }
  }

  return result;
}
