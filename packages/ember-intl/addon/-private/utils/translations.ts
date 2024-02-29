type NestedStructure<T = string> = {
  [Key in string | number]?: T | NestedStructure<T>;
};

export type Translations = NestedStructure<string | number>;

/**
 * @private
 * @hide
 */
export function flattenKeys<T>(object: NestedStructure<T>): Record<string, T> {
  const result = {} as Record<string, T>;

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
