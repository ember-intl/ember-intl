import EmptyObject from 'ember-intl/-private/utils/empty-object';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export type NestedStructure<T = string> = {
  [Key in string | number]?: T | NestedStructure<T>;
};

/**
 * @private
 * @hide
 */
export default function flatten<T>(src: NestedStructure<T>): Record<string, T> {
  const result = new EmptyObject() as Record<string, T>;

  for (const key in src) {
    if (!hasOwnProperty.call(src, key)) {
      continue;
    }

    const value = src[key];

    if (typeof value === 'object' && value) {
      const hash = flatten(value);

      for (const suffix in hash) {
        result[`${key}.${suffix}`] = hash[suffix];
      }
    } else {
      result[key] = value!;
    }
  }

  return result;
}
